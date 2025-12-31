/**
 * @jest-environment node
 */

// Настройка для тестов

import nock from 'nock';
import type { Session } from './types';
import { init } from '.';

nock.disableNetConnect();

const BASE_URL = 'http://127.0.0.1:16732';

const SESSION: Session = {
  positionTax: 'vat5',
  taxationType: 'usnIncome',
  operator: {
    name: 'Иванов',
    vatin: '123654789507',
  },
};

const Atol = init({
  session: SESSION,
  options: {
    baseUrl: BASE_URL,
    maxCalls: 15,
    maxCodeLength: 31,
  },
});

export { Atol, nock, BASE_URL, SESSION };
