import type sellMock from './mocks/sell.json';
import type { Item, Payment } from './types';

type LegacySell = typeof sellMock;

export const legacyMapSell = (
  data: LegacySell,
): { items: Item[]; payments: Payment[] } => {
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
          mark: btoa(item.description),
        },
      }),
    ),
    payments: Object.keys(data.payments).reduce(
      (acc: Payment[], key): Payment[] => {
        return acc.concat({
          type: key,
          sum: data.payments[key as 'cash' | 'card'],
        });
      },
      [],
    ),
  };
};
