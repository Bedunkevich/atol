import type sellMock from './mocks/sell.json';
import type { Item, Payment } from './types';

type LegacySell = typeof sellMock;

export const legacyMapSell = (
  data: LegacySell,
): { items: Item[]; payments: Payment[] } => {
  const payments: Payment[] = [];

  if (data.payments.cash) {
    payments.push({
      type: '0',
      sum: data.payments.cash,
    });
  }

  if (data.payments.card) {
    payments.push({
      type: '1',
      sum: data.payments.card,
    });
  }

  return {
    items: data.products.map(
      (item): Item =>
        item.description
          ? {
              type: 'position',
              name: item.name,
              price: item.cost,
              quantity: item.quantity,
              amount: item.total,
              tax: { type: 'none' },
              markingCode: {
                mark: btoa(unescape(item.description)),
              },
            }
          : {
              type: 'position',
              name: item.name,
              price: item.cost,
              quantity: item.quantity,
              amount: item.total,
              tax: { type: 'none' },
            },
    ),
    payments,
  };
};
