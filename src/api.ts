import axios, { type AxiosPromise } from 'axios';
import pkg from '../package.json';
import SessionSchema from './validation/Session.json';
import SellSchema from './validation/Sell.json';
import { v1 as buildUUID } from './uuid';
import { delay } from './helpers';
import {
  Session,
  Options,
  TaskResponce,
  TaskResultResponce,
  TaskResultStatus,
  RequestTypes,
  Sell,
  SellRequest,
  LegacyCallback,
} from './types';
import { legacyMapSell } from './mapping';

let ajv: any;

if (window.ajv7) {
  const Ajv = window.ajv7.default;

  ajv = new Ajv({
    allErrors: true,
    removeAdditional: true,
    useDefaults: true,
  });
}

const validateData = (schema: any, data: any) => {
  if (window.ajv7) {
    const validate = ajv.compile(schema);

    if (!validate(data)) {
      console.log(
        '%c[ATOL] [validation]',
        'color:red',
        ajv.errorsText(validate.errors),
      );
      throw new Error(ajv.errorsText(validate.errors));
    }
  }
};

export default (session: Session, options: Options) => {
  const {
    baseUrl,
    maxCalls,
    delayBetweenCalls,
    maxCodeLength,
    useMarkingCode,
    measurementUnit: _optionUnit,
  } = {
    baseUrl: 'http://127.0.0.1:16732',
    maxCalls: 7,
    delayBetweenCalls: 2000,
    useMarkingCode: true,
    measurementUnit: undefined,
    ...options,
  };

  const { operator, taxationType, meta, positionTax = 'none' } = session;

  console.log(
    `%c[ATOL] @bedunkevich/atol version: ${pkg.version}`,
    'color:green',
    { session },
    {
      baseUrl,
      maxCalls,
      delayBetweenCalls,
      maxCodeLength,
      operator,
      taxationType,
      meta,
      positionTax,
    },
  );

  const { username, password, json } = meta || {};

  const anyData = (() => {
    try {
      return json
        ? (JSON.parse(json) as Record<string, string | number>)
        : undefined;
    } catch {
      return undefined;
    }
  })();

  const measurementUnit = _optionUnit ?? anyData?.measurementUnit;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (username && password) {
    headers['Authorization'] = `Basic ${window.btoa(
      `${username}:${password}`,
    )}`;
  }

  console.log(
    `%c[ATOL] @bedunkevich/atol version: ${pkg.version}`,
    'color:green',
    { measurementUnit, headers },
  );

  const API = axios.create({
    baseURL: baseUrl,
    timeout: 20000,
    headers,
  });

  validateData(SessionSchema, session);

  const post = <T = unknown>(
    uuid: string,
    request: T,
  ): Promise<AxiosPromise<TaskResponce>> => {
    return API.post('/api/v2/requests', { uuid, request });
  };

  const get = (uuid: string): AxiosPromise<TaskResultResponce> => {
    return API.get(`/api/v2/requests/${uuid}`);
  };

  /*
   * Открытие смены
   */
  const openShift = async (): Promise<AxiosPromise<TaskResponce>> => {
    const uuid = buildUUID();
    console.log(`%c[ATOL] [openShift] ${uuid}`, 'color:green');
    try {
      const responce = await post(uuid, [
        {
          type: RequestTypes[RequestTypes.openShift],
          operator,
        },
      ]);
      console.log(`%c[ATOL] [openShift] SUCCESS`, 'color:green', responce.data);
      return responce;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          `%c[ATOL] [openShift] FAIL`,
          'color:red',
          error.response?.data,
        );
      }
      return error as any;
    }
  };

  /*
   * Закрытие смены
   */
  const closeShift = (): Promise<AxiosPromise<TaskResponce>> => {
    const uuid = buildUUID();
    return post(uuid, [
      {
        type: RequestTypes[RequestTypes.closeShift],
        operator,
      },
    ]);
  };

  /*
   * X-отчет
   */
  const reportX = (): Promise<AxiosPromise<TaskResponce>> => {
    const uuid = buildUUID();
    return post(uuid, [
      {
        type: RequestTypes[RequestTypes.reportX],
        operator,
      },
    ]);
  };

  /*
   * Внесение наличных
   */
  const cashIn = (cashSum: number): Promise<AxiosPromise<TaskResponce>> => {
    const uuid = buildUUID();
    return post(uuid, [
      {
        type: RequestTypes[RequestTypes.cashIn],
        operator,
        cashSum,
      },
    ]);
  };

  /*
   * Выплата наличных
   */
  const cashOut = (cashSum: number): Promise<AxiosPromise<TaskResponce>> => {
    const uuid = buildUUID();
    return post(uuid, [
      {
        type: RequestTypes[RequestTypes.cashOut],
        operator,
        cashSum,
      },
    ]);
  };

  /*
   * Чек прихода – продажа
   */
  const sell = (
    data: Sell,
    type: RequestTypes = RequestTypes.sell,
  ): Promise<AxiosPromise<TaskResponce>> => {
    const uuid = buildUUID();

    validateData(SellSchema, data);

    const task = {
      type: RequestTypes[type],
      taxationType,
      positionTax,
      operator,
      ...data,
    };
    console.log(`%c[ATOL] [SELL] [${type}]`, 'color:green', task);

    return post<SellRequest[]>(uuid, [task]);
  };

  /*
   * Проверка статуса задания
   */
  const checkStatus = async (
    uuid: string,
    callIndex = 0,
  ): Promise<TaskResultStatus> => {
    try {
      const {
        data: { results },
      } = await get(uuid);
      const status = results?.[0]?.status;
      console.log('%c[ATOL] [checkStatus]', 'color:green', results);

      if (callIndex >= maxCalls) {
        throw new Error('MAX_CALLS LIMIT!');
      }

      if (status !== TaskResultStatus['ready']) {
        await delay(delayBetweenCalls);
        return checkStatus(uuid, callIndex + 1);
      }
      return status;
    } catch (error: any) {
      console.log('%c[ATOL] [checkStatus]', 'color:red', error.message);

      if (callIndex >= maxCalls) {
        throw new Error('MAX_CALLS LIMIT!');
      }

      await delay(delayBetweenCalls);
      return checkStatus(uuid, callIndex + 1);
    }
  };

  const executeTask = async (fn: any, cb: LegacyCallback) => {
    if (typeof cb !== 'function') {
      throw new Error('CALLBACK should be a function!');
    }
    try {
      const {
        data: { uuid },
      } = await fn();
      if (!uuid) {
        throw new Error('UUID cant be null | undefined!');
      }
      const status = await checkStatus(uuid);
      console.log('%c[ATOL] [executeTask]', 'color:green', { uuid, status });
      return cb(true, { code: 0, res: 'ok' });
    } catch (error: any) {
      console.log(error);
      const {
        error: { code, description },
      } = error.response.data;
      return cb(false, { code, res: description });
    }
  };

  // Легаси
  const fprint = {
    report: async function (cb: LegacyCallback) {
      await executeTask(() => reportX(), cb);
    },
    sell: async function (data: any, cb: LegacyCallback) {
      console.log('%c[ATOL] [LEGACY]', 'color:green', data);
      await executeTask(
        () =>
          sell(
            legacyMapSell(data, {
              useMarkingCode,
              maxCodeLength,
              measurementUnit,
              positionTax,
            }) as any,
          ),
        cb,
      );
    },
    ret: async function (data: any, cb: LegacyCallback) {
      await executeTask(
        () =>
          sell(
            legacyMapSell(data, {
              maxCodeLength,
              useMarkingCode,
              measurementUnit,
              positionTax,
            }) as any,
            RequestTypes.sellReturn,
          ),
        cb,
      );
    },
    open_session: async function (cb: LegacyCallback) {
      await executeTask(() => openShift(), cb);
    },
    close_session: async function (cb: LegacyCallback) {
      await executeTask(() => closeShift(), cb);
    },
    cash_income: async function (
      data: { income: boolean; summ: number },
      cb: LegacyCallback,
    ) {
      const fn = data.income
        ? () => cashIn(data.summ)
        : () => cashOut(data.summ);
      await executeTask(fn, cb);
    },
  };

  return {
    openShift,
    closeShift,
    cashIn,
    cashOut,
    sell,
    reportX,
    checkStatus,
    fprint,
  };
};
