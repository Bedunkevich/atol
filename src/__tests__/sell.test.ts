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
} from '../types';

const FAKE_UUID = '24efab70-4502-11eb-a6c8-1f6f568dbd0e';

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
      mark: 'BASE64',
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
jest.mock('../uuid', () => ({
  v1: () => FAKE_UUID,
}));

describe('ATOL', () => {
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

    const responce = await Atol.sell({
      items,
      payments,
    });
    expect(responce.data).toMatchObject(
      expect.objectContaining({
        uuid: FAKE_UUID,
      }),
    );
  });
});
