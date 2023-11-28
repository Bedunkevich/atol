import currency from 'currency.js';
import type { Item, Payment, LegacyObject } from './types';

type legacyMapSellOptions = {
  maxCodeLength?: number;
  useMarkingCode?: boolean;
};

export const legacyMapSell = (
  data: LegacyObject,
  options: legacyMapSellOptions = {
    maxCodeLength: undefined,
    useMarkingCode: true,
  },
): { items: Item[]; payments: Payment[] } => {
  const { maxCodeLength, useMarkingCode } = options;
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

  function calcDiscountAmmount(item: LegacyObject['products']['0']) {
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
      return 0;
    }
  }

  const hurryAmmout = currency(data.total_price).multiply(
    currency(data.hurry / 100),
  ).value;

  return {
    items: data.products
      .map((item): Item => {
        const infoDiscountAmount = calcDiscountAmmount(item);
        const amount = currency(item.total).add(infoDiscountAmount).value;

        function getMarkingCode() {
          try {
            return {
              type: 'other' as const,
              mark: btoa(
                maxCodeLength
                  ? unescape(item.description).slice(0, maxCodeLength)
                  : unescape(item.description),
              ),
            };
          } catch (error) {
            return undefined;
          }
        }

        return {
          type: 'position',
          name: item.name,
          price: item.cost,
          quantity: item.quantity,
          amount,
          infoDiscountAmount,
          tax: { type: 'none' },
          ...(item.description && useMarkingCode
            ? {
                markingCode: getMarkingCode(),
              }
            : undefined),
        };
      })
      .concat(
        data.hurry > 0
          ? {
              type: 'position',
              name: 'Срочность',
              price: hurryAmmout,
              quantity: 1,
              amount: hurryAmmout,
              tax: { type: 'none' },
            }
          : [],
      ),
    payments,
  };
};
