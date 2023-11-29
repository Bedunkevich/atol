/**
 * @jest-environment node
 */

import { nock, Atol, BASE_URL } from '../setup';
import { TaskResultStatus } from '../types';

declare const global: any;

const FAKE_UUID = '24efab70-4502-11eb-a6c8-1f6f568dbd0e';

jest.mock('../uuid', () => ({
  v1: () => FAKE_UUID,
}));

const callBack = jest.fn();

describe('ATOL LEGACY RETURN', () => {
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
  it('return | success', async () => {
    nock(BASE_URL)
      .post('/api/v2/requests', {
        uuid: FAKE_UUID,
        request: [
          {
            type: 'sellReturn',
            taxationType: 'usnIncome',
            operator: { name: 'Иванов', vatin: '123654789507' },
            items: [
              {
                type: 'position',
                name: 'Бананы',
                price: 2.7,
                quantity: 3,
                amount: 8.1,
                infoDiscountAmount: 0.9,
                tax: { type: 'none' },
              },
            ],
            payments: [
              { type: '0', sum: 0 },
              { type: '1', sum: 0 },
            ],
          },
        ],
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

    await Atol.fprint.ret(
      {
        payments: { card: 0, cash: 0 },
        products: [
          {
            name: 'Бананы',
            cost: 3.0,
            quantity: 3,
            discount: 10,
            total: 8.1,
          },
        ],
      },
      callBack,
    );
    expect(callBack).toBeCalledWith(true, { code: 0, res: 'ok' });
  });
});
