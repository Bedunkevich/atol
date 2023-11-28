import type { Item, Payment, LegacyObject } from './types';
type legacyMapSellOptions = {
    maxCodeLength?: number;
    useMarkingCode?: boolean;
};
export declare const legacyMapSell: (data: LegacyObject, options?: legacyMapSellOptions) => {
    items: Item[];
    payments: Payment[];
};
export {};
//# sourceMappingURL=mapping.d.ts.map