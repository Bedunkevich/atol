// import currency from 'currency.js';
import type sellMock from './mocks/sell.json';
import type { Item, Payment } from './types';

type LegacySell = typeof sellMock;

export const legacyMapSell = (
  data: LegacySell,
  maxCodeLength?: number,
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

  function calcDiscountAmmount(item: LegacySell['products']['0']) {
    try {
      // return currency(item.cost)
      //   .multiply(item.quantity)
      //   .subtract(currency(item.total)).value;

      return Math.round((item.cost * item.quantity - item.total) * 100) / 100;
    } catch (error) {
      console.log('[calcDiscountAmmount]', error);
      return undefined;
    }
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
              infoDiscountAmount: calcDiscountAmmount(item),
              tax: { type: 'none' },
              markingCode: {
                type: 'other',
                mark: btoa(
                  maxCodeLength
                    ? unescape(item.description).slice(0, maxCodeLength)
                    : unescape(item.description),
                ),
              },
            }
          : {
              type: 'position',
              name: item.name,
              price: item.cost,
              infoDiscountAmount: calcDiscountAmmount(item),
              quantity: item.quantity,
              amount: item.total,
              tax: { type: 'none' },
            },
    ),
    payments,
  };
};
