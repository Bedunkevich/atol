import axios, { AxiosPromise } from 'axios';
import SessionSchema from './validation/Session.json';
import SellSchema from './validation/Sell.json';
import { v1 as buildUUID } from './uuid';
import { delay } from './helpers';
import {
  Session,
  TaskResponce,
  TaskResultResponce,
  TaskResultStatus,
  RequestTypes,
  AtolDriverInterface,
  Sell,
  SellRequest,
  LegacyCallback,
} from './types';
import { legacyMapSell } from './mapping';

const DEFAULT_BASE_URL = 'http://127.0.0.1:16732';
const MAX_CALLS = 3;
const DELAY_BETWEEN_CALLS = 1000;

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

export default (
  session: Session,
  baseURL: string = DEFAULT_BASE_URL,
): AtolDriverInterface => {
  const API = axios.create({
    baseURL,
    timeout: 1000,
  });

  const { operator, taxationType } = session;

  validateData(SessionSchema, session);

  const post = <T = unknown>(
    uuid: string,
    request: T,
  ): Promise<AxiosPromise<TaskResponce>> => {
    return API.post('/api/v2/request', { uuid, request });
  };

  const get = (uuid: string): AxiosPromise<TaskResultResponce> => {
    return API.get(`/api/v2/request/${uuid}`);
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
      console.log(
        `%c[ATOL] [openShift] FAIL`,
        'color:red',
        error.response.data,
      );
      return error;
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
      },
      cashSum,
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
      },
      cashSum,
    ]);
  };

  /*
   * Чек прихода – продажа
   */
  const sell = (data: Sell): Promise<AxiosPromise<TaskResponce>> => {
    const uuid = buildUUID();

    validateData(SellSchema, data);

    return post<SellRequest[]>(uuid, [
      {
        type: RequestTypes[RequestTypes.sell],
        taxationType,
        operator,
        ...data,
      },
    ]);
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

      if (callIndex >= MAX_CALLS) {
        throw new Error('MAX_CALLS LIMIT!');
      }

      if (status !== TaskResultStatus['ready']) {
        await delay(DELAY_BETWEEN_CALLS);
        return checkStatus(uuid, callIndex + 1);
      }
      return status;
    } catch (error) {
      console.log('%c[ATOL] [checkStatus]', 'color:red', error.message);

      if (callIndex >= MAX_CALLS) {
        throw new Error('MAX_CALLS LIMIT!');
      }

      await delay(DELAY_BETWEEN_CALLS);
      return checkStatus(uuid, callIndex + 1);
    }
  };

  // Легаси
  const fprint = {
    report: async function (cb: LegacyCallback) {
      try {
        const {
          data: { uuid },
        } = await reportX();
        if (!uuid) {
          throw new Error('UUID cant be null | undefined!');
        }
        const status = await checkStatus(uuid);
        return cb(true, { status, code: 0 });
      } catch (error) {
        const {
          error: { code, description },
        } = error.response.data;
        return cb(false, { code, res: description });
      }
    },
    sell: async function (data: any, cb: LegacyCallback) {
      try {
        const {
          data: { uuid },
        } = await sell(legacyMapSell(data) as any);
        if (!uuid) {
          throw new Error('UUID cant be null | undefined!');
        }
        const status = await checkStatus(uuid);
        return cb(true, { status, code: 0 });
      } catch (error) {
        const {
          error: { code, description },
        } = error.response.data;
        return cb(false, { code, res: description });
      }
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
