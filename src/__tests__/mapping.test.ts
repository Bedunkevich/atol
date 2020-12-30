import { legacyMapSell } from '../mapping';
import data from '../mocks/sell.json';

describe('LEGACY', () => {
  it('Mapping to sell', async () => {
    const responce = legacyMapSell(data);
    expect(responce).toMatchObject(
      expect.objectContaining({
        payments: [
          { sum: 1929.5, type: 'card' },
          { sum: 1000, type: 'cash' },
        ],
      }),
    );
  });
});
