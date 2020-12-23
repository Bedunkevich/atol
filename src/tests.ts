/**
 * @jest-environment node
 */

import nock from 'nock';
import type { Session, AtolDriverInterface } from './types';
import { init } from '.';

nock.disableNetConnect();

const BASE_URL = 'http://127.0.0.1:16732';

const SESSION: Session = {
  operator: {
    name: 'Иванов',
    vatin: '123654789507',
  },
};

const Atol: AtolDriverInterface = init({
  session: SESSION,
  baseUrl: BASE_URL,
});

const delay = (time: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, time));

export { Atol, nock, BASE_URL, SESSION, delay };
