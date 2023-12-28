import currency from 'currency.js';
import type { Item, Payment, LegacyObject } from './types';
import { getMarkingCode } from './helpers';

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

  console.log({ maxCodeLength });

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
      const result = currency(item.cost).multiply(discount_multiplier);

      console.log(
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

  let full_cost = 0;

  const items = data.products.map((item): Item => {
    const itemDiscount = calcDiscountAmmount(item);
    const price = currency(item.cost).subtract(itemDiscount).value;
    const amount = currency(item.total).value;
    const infoDiscountAmount = currency(itemDiscount).multiply(
      item.quantity,
    ).value;

    full_cost += amount;

    return {
      type: 'position',
      name: item.name,
      price,
      quantity: item.quantity,
      amount,
      infoDiscountAmount,
      measurementUnit: 'шт',
      tax: { type: 'none' },
      ...(item.description && useMarkingCode
        ? {
            markingCode: getMarkingCode(item.description),
          }
        : undefined),
    };
  });

  const hurryAmmout = currency(full_cost).multiply(
    currency(data.hurry / 100),
  ).value;

  if (data.hurry > 0) {
    items.push({
      type: 'position',
      name: 'Срочность',
      price: hurryAmmout,
      measurementUnit: 'шт',
      quantity: 1,
      amount: hurryAmmout,
      tax: { type: 'none' },
    });
  }

  console.log({ items, payments });

  return {
    items,
    payments,
  };
};
