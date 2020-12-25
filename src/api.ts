import axios, { AxiosPromise } from 'axios';
import Ajv from 'ajv';
import SessionSchema from './validation/Session.json';
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
} from './types';

const DEFAULT_BASE_URL = 'http://127.0.0.1:16732';
const MAX_CALLS = 3;
const DELAY_BETWEEN_CALLS = 1000;

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
});

export default (
  session: Session,
  baseURL: string = DEFAULT_BASE_URL,
): AtolDriverInterface => {
  const API = axios.create({
    baseURL,
    timeout: 1000,
  });

  const validate = ajv.compile(SessionSchema);

  if (!validate(session)) {
    console.log(
      '%c[ATOL] [validation]',
      'color:red',
      ajv.errorsText(validate.errors),
    );
    throw new Error(ajv.errorsText(validate.errors));
  }

  const { operator, taxationType } = session;

  const post = <T = unknown>(
    uuid: string,
    request: T,
  ): AxiosPromise<TaskResponce> => {
    return API.post('/api/v2/request', { uuid, request });
  };

  const get = (uuid: string): AxiosPromise<TaskResultResponce> => {
    return API.get(`/api/v2/request/${uuid}`);
  };

  /*
   * Открытие смены
   */
  const openShift = (): AxiosPromise<TaskResponce> => {
    const uuid = buildUUID();
    return post(uuid, [
      {
        type: RequestTypes[RequestTypes.openShift],
        operator,
      },
    ]);
  };

  /*
   * Закрытие смены
   */
  const closeShift = (): AxiosPromise<TaskResponce> => {
    const uuid = buildUUID();
    return post(uuid, [
      {
        type: RequestTypes[RequestTypes.closeShift],
        operator,
      },
    ]);
  };

  /*
   * Внесение наличных
   */
  const cashIn = (cashSum: number): AxiosPromise<TaskResponce> => {
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
  const cashOut = (cashSum: number): AxiosPromise<TaskResponce> => {
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
  const sell = (data: Sell): AxiosPromise<TaskResponce> => {
    const uuid = buildUUID();
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
      console.log('%c[ATOL] [checkStatus]', 'color:red', error);
      return TaskResultStatus['error'];
    }
  };

  return { openShift, closeShift, cashIn, cashOut, sell, checkStatus };
};
