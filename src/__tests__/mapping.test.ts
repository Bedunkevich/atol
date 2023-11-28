import { legacyMapSell } from '../mapping';

describe('LEGACY', () => {
  it('Mapping to sell with hurry', async () => {
    const responce = legacyMapSell(
      {
        hurry: 50,
        topay: 14.25,
        user: 'Администратор',
        total_price: 9.5,
        number: '3-51',
        products: [
          {
            discount: 5,
            quantity: 1,
            description: 'Описание',
            cost: 10,
            name: 'Свободная цена',
            total: 9.5,
          },
        ],
        payments: {
          cash: 14.25,
          card: 0,
        },
        other_payments: [
          {
            value: 14.25,
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
          { type: '0', sum: 14.25 },
          { type: '1', sum: 0 },
        ],
        items: [
          expect.objectContaining({
            price: 10,
            quantity: 1,
            amount: 10,
            infoDiscountAmount: 0.5,
          }),
          expect.objectContaining({
            type: 'position',
            name: 'Срочность',
            price: 4.75,
            quantity: 1,
            amount: 4.75,
          }),
        ],
      }),
    );
  });
});
