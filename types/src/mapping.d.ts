import type { Item, Payment, LegacyObject, PositionTax } from './types';
type legacyMapSellOptions = {
    maxCodeLength?: number;
    useMarkingCode?: boolean;
    measurementUnit?: number | string;
    positionTax: PositionTax;
};
export declare const legacyMapSell: (data: LegacyObject, options?: legacyMapSellOptions) => {
    items: Item[];
    payments: Payment[];
};
export {};
//# sourceMappingURL=mapping.d.ts.map