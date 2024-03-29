import { getMarkingCode } from '../helpers';
import { legacyMapSell } from '../mapping';

describe('LEGACY', () => {
  it('Get right marking code', async () => {
    const cuttedString =
      '0104660251635565215a2E?J2WX2Zob9100C092wDBpyFej7JaKEYTI+QtD3pGT8+yIu0CGRoDr3x3U/K0ui3aViobHT2/By+q5ni6Ngi7ztHsiVNYGMK7cDS3xXw==';
    const { mark } = getMarkingCode(cuttedString) || {};

    expect(mark).toBe(
      'MDEwNDY2MDI1MTYzNTU2NTIxNWEyRT9KMldYMlpvYh05MTAwQzAdOTJ3REJweUZlajdKYUtFWVRJK1F0RDNwR1Q4K3lJdTBDR1JvRHIzeDNVL0swdWkzYVZpb2JIVDIvQnkrcTVuaTZOZ2k3enRIc2lWTllHTUs3Y0RTM3hYdz09',
    );
  });

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

  it('Mapping to sell with hurry complex', async () => {
    const responce = legacyMapSell(
      {
        hurry: 50,
        topay: 102,
        user: 'Администратор',
        total_price: 68,
        number: '3-53',
        products: [
          {
            discount: 10,
            quantity: 2,
            description: '',
            cost: 10,
            name: 'Свободная цена',
            total: 18,
          },
          {
            discount: 50,
            quantity: 1,
            description: '',
            cost: 100,
            name: 'Свободная цена',
            total: 50,
          },
        ],
        payments: {
          cash: 0,
          card: 102,
        },
        other_payments: [
          {
            value: 102,
            id: 2,
          },
        ],
      },
      undefined,
    );
    console.log(responce);
    expect(responce).toMatchObject(
      expect.objectContaining({
        payments: [
          { type: '0', sum: 0.0 },
          { type: '1', sum: 102.0 },
        ],
        items: [
          expect.objectContaining({
            price: 9,
            quantity: 2,
            amount: 18,
            infoDiscountAmount: 2,
          }),
          expect.objectContaining({
            price: 50,
            quantity: 1,
            amount: 50,
            infoDiscountAmount: 50,
          }),
          expect.objectContaining({
            type: 'position',
            name: 'Срочность',
            price: 34,
            quantity: 1,
            amount: 34,
          }),
        ],
      }),
    );
  });
});
