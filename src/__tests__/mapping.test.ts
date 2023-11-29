import { legacyMapSell } from '../mapping';

describe('LEGACY', () => {
  it('Mapping to sell with hurry', async () => {
    const responce = legacyMapSell(
      {
        hurry: 100,
        topay: 36,
        user: 'Администратор',
        total_price: 18,
        number: '3-51',
        products: [
          {
            quantity: 2,
            description: '',
            discount: 10,
            cost: 10,
            name: 'Свободная цена',
            total: 18,
          },
        ],
        payments: {
          cash: 36,
          card: 0,
        },
        other_payments: [
          {
            value: 36,
            id: 1,
          },
        ],
      },
      undefined,
    );
    console.log(responce);
    expect(responce).toMatchObject(
      expect.objectContaining({
        payments: [
          { type: '0', sum: 36.0 },
          { type: '1', sum: 0 },
        ],
        items: [
          expect.objectContaining({
            price: 9,
            quantity: 2,
            amount: 18,
            infoDiscountAmount: 2,
          }),
          expect.objectContaining({
            type: 'position',
            name: 'Срочность',
            price: 18,
            quantity: 1,
            amount: 18,
          }),
        ],
      }),
    );
  });
});
