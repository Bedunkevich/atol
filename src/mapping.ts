import currency from 'currency.js';
import type sellMock from './mocks/sell.json';
import type { Item, Payment } from './types';

type LegacySell = typeof sellMock;

export const legacyMapSell = (
  data: LegacySell,
  maxCodeLength?: number,
): { items: Item[]; payments: Payment[] } => {
  const payments: Payment[] = [];

  if (data.payments.cash !== undefined) {
    payments.push({
      type: '0',
      sum: data.payments.cash,
    });
  }

  if (data.payments.card !== undefined) {
    payments.push({
      type: '1',
      sum: data.payments.card,
    });
  }

  function calcDiscountAmmount(item: LegacySell['products']['0']) {
    try {
      const discount_multiplier = currency(item.discount).divide(100);
      const total_cost = currency(item.cost).multiply(item.quantity);
      const result = currency(total_cost).multiply(discount_multiplier);

      console.log(
        'total_cost',
        total_cost.value,
        'discount_multiplier',
        discount_multiplier.value,
        'result',
        result.value,
      );
      return result.value;
    } catch (error) {
      console.log('[calcDiscountAmmount]', error);
      return undefined;
    }
  }

  return {
    items: data.products.map(
      (item): Item => ({
        type: 'position',
        name: item.name,
        price: item.cost,
        quantity: item.quantity,
        amount: item.total,
        infoDiscountAmount: calcDiscountAmmount(item),
        tax: { type: 'none' },
        ...(item.description
          ? {
              markingCode: {
                type: 'other',
                mark: btoa(
                  maxCodeLength
                    ? unescape(item.description).slice(0, maxCodeLength)
                    : unescape(item.description),
                ),
              },
            }
          : undefined),
      }),
    ),
    payments,
  };
};
