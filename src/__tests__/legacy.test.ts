/**
 * @jest-environment node
 */

import { nock, Atol, BASE_URL, SESSION } from '../setup';
import {
  RequestTypes,
  SellRequest,
  Item,
  Payment,
  MinimumArray,
  TaskResultStatus,
} from '../types';

declare const global: any;

const FAKE_UUID = '24efab70-4502-11eb-a6c8-1f6f568dbd0e';

jest.mock('../uuid', () => ({
  v1: () => FAKE_UUID,
}));

const callBack = jest.fn();

const legacyProducts: any = [
  {
    name: 'Бананы',
    cost: 10.0,
    quantity: 0.5,
    description: '010290000237487221.%22Sb%3DTNTE%2A%3EB%21%0D%0A',
    total: 5.0,
  },
];

const legacyPayments: any = { card: 2.5, cash: 2.5 };

const items: MinimumArray<Item> = [
  {
    type: 'position',
    name: 'Бананы',
    price: 10.0,
    quantity: 0.5,
    amount: 5.0,
    tax: {
      type: 'none',
    },
    markingCode: {
      type: 'other',
      mark: 'MDEwMjkwMDAwMjM3NDg3MjIxLiJTYj1UTlRFKj5CIQ0=',
    },
  },
];
const payments: MinimumArray<Payment> = [
  {
    type: '0',
    sum: 2.5,
  },
  { type: '1', sum: 2.5 },
];

const request: SellRequest = {
  type: RequestTypes[RequestTypes.sell],
  ...SESSION,
  items,
  payments,
};

describe('ATOL LEGACY', () => {
  beforeAll(() => {
    global.btoa = (str: string) => {
      if (str.length !== 32) {
        throw new Error('Не верная длинна маркировки');
      }
      return 'MDEwMjkwMDAwMjM3NDg3MjIxLiJTYj1UTlRFKj5CIQ0=';
    };
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('sell | success', async () => {
    nock(BASE_URL)
      .post('/api/v2/requests', {
        uuid: FAKE_UUID,
        request: [request],
      })
      .reply(201, {
        number: 1,
        uuid: FAKE_UUID,
        isBlocked: false,
        blockedUUID: '',
      });
    nock(BASE_URL)
      .get(`/api/v2/requests/${FAKE_UUID}`)
      .reply(201, {
        results: [
          {
            error: {
              code: 0,
              description: 'Ошибок нет',
            },
            status: TaskResultStatus[TaskResultStatus.ready],
          },
        ],
      });

    await Atol.fprint.sell(
      {
        payments: legacyPayments,
        products: legacyProducts,
      },
      callBack,
    );
    expect(callBack).toBeCalledWith(true, { code: 0, res: 'ok' });
  });
});
