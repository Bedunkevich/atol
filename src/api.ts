import axios, { AxiosPromise } from 'axios';
import * as uuidBundle from 'uuid';
import { delay } from './helpers';
import {
  Session,
  AtolResponce,
  TaskResultResponce,
  TaskResultStatus,
  RequestTypes,
  AtolDriverInterface,
} from './types';

const DEFAULT_BASE_URL = 'http://127.0.0.1:16732';
const MAX_CALLS = 3;
const DELAY_BETWEEN_CALLS = 500;

export default (
  session: Session,
  baseURL: string = DEFAULT_BASE_URL,
): AtolDriverInterface => {
  const API = axios.create({
    baseURL,
    timeout: 1000,
  });

  const { operator } = session;

  const post = (uuid: string, request: unknown): AxiosPromise<AtolResponce> => {
    return API.post('/api/v2/request', { uuid, request });
  };

  const get = (uuid: string): AxiosPromise<TaskResultResponce> => {
    return API.get(`/api/v2/request/${uuid}`);
  };

  /*
   * Открытие смены
   */
  const openShift = (): AxiosPromise<AtolResponce> => {
    const uuid = uuidBundle.v1();
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
  const closeShift = (): AxiosPromise<AtolResponce> => {
    const uuid = uuidBundle.v1();
    return post(uuid, [
      {
        type: RequestTypes[RequestTypes.closeShift],
        operator,
      },
    ]);
  };

  const checkStatus = async (
    uuid: string,
    callIndex = 0,
  ): Promise<TaskResultStatus> => {
    try {
      const {
        data: { results },
      } = await get(uuid);
      const status = results?.[0]?.status;

      if (callIndex >= MAX_CALLS) {
        throw new Error('MAX_CALLS LIMIT!');
      }

      if (status !== TaskResultStatus['ready']) {
        await delay(DELAY_BETWEEN_CALLS);
        return checkStatus(uuid, callIndex + 1);
      }
      return status;
    } catch (error) {
      return TaskResultStatus['error'];
    }
  };

  return { openShift, closeShift, checkStatus };
};
