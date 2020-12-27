import type sellMock from './mocks/sell.json';
import type { Item, Payment } from './types';

type LegacySell = typeof sellMock;

export const legacyMapSell = (data: LegacySell) => {
  return {
    items: data.products.map(
      (item): Item => ({
        type: 'position',
        name: item.name,
        price: item.cost,
        quantity: item.quantity,
        amount: item.total,
        tax: { type: 'none' },
        markingCode: {
          mark: item.description,
        },
      }),
    ),
    payments: data.other_payments.map(
      (payment): Payment => ({
        type: payment.id - 1,
        sum: payment.value,
      }),
    ),
  };
};
