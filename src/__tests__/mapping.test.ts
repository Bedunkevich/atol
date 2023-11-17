import { legacyMapSell } from '../mapping';
import data from '../mocks/sell.json';

describe('LEGACY', () => {
  it('Mapping to sell', async () => {
    const responce = legacyMapSell(data);
    expect(responce).toMatchObject(
      expect.objectContaining({
        payments: [
          { sum: 1000, type: '0' },
          { sum: 1929.5, type: '1' },
        ],
        items: [
          expect.objectContaining({
            price: 3,
            quantity: 3,
            amount: 9,
            infoDiscountAmount: 0.9,
          }),
          expect.objectContaining({
            infoDiscountAmount: 270.5,
            markingCode: {
              type: 'other',
              mark: 'Ky8/IDov',
            },
          }),
          expect.not.objectContaining({
            markingCode: {},
          }),
        ],
      }),
    );
  });
});
