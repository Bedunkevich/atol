import type sellMock from './mocks/sell.json';
import type { Item, Payment } from './types';
type LegacySell = typeof sellMock;
export declare const legacyMapSell: (data: LegacySell, maxCodeLength?: number) => {
    items: Item[];
    payments: Payment[];
};
export {};
//# sourceMappingURL=mapping.d.ts.map