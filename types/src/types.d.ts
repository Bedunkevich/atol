import type { AxiosPromise } from 'axios';
declare global {
    interface Window {
        ajv7: {
            default: any;
        };
    }
}
export type Options = Partial<{
    baseUrl: string;
    maxCalls: number;
    delayBetweenCalls: number;
    maxCodeLength: number;
}> | undefined;
export type TaskResponce = Partial<{
    uuid: string;
    number: number;
    isBlocked: boolean;
    blockedUUID: string;
    error: {
        code: number;
        description: string;
    };
}>;
export declare enum TaskResultStatus {
    ready = "ready",
    error = "error",
    wait = "wait",
    inProgress = "inProgress",
    interrupted = "interrupted",
    blocked = "blocked",
    canceled = "canceled"
}
export declare enum RequestTypes {
    openShift = "openShift",
    closeShift = "closeShift",
    cashIn = "cashIn",
    cashOut = "cashOut",
    sell = "sell",
    sellReturn = "sellReturn",
    buy = "buy",
    buyReturn = "buyReturn",
    reportX = "reportX"
}
export type TaxationType = 'osn' | 'usnIncome' | 'usnIncomeOutcome' | 'envd' | 'esn' | 'patent';
export type TaskResultResponce = {
    results: {
        error: {
            code: number;
            description: string;
        };
        status: TaskResultStatus;
    }[];
};
export type Session = {
    taxationType: TaxationType;
    operator: {
        name: string;
        vatin?: string;
    };
};
export type PositionTax = 'none' | 'vat0' | 'vat10' | 'vat110' | 'vat18' | 'vat118' | 'vat20' | 'vat120';
export type Item = {
    type: 'position';
    name: string;
    price: number;
    quantity: number;
    amount: number;
    infoDiscountAmount?: number;
    tax: {
        type: PositionTax;
        sum?: number;
    };
    paymentMethod?: 'fullPrepayment' | 'prepayment' | 'advance' | 'fullPayment' | 'partialPayment' | 'credit' | 'creditPayment';
    paymentObject?: 'commodity' | 'excise' | 'job' | 'service';
    department?: number;
    markingCode?: {
        type?: 'other' | 'egais20' | 'egais30';
        mark: string;
    };
};
export type Payment = {
    type: 'cash' | '0' | 'electronicaly' | '1' | 'prepaid' | '2' | 'credir' | '3' | 'other' | '4' | string;
    sum: number;
};
export type MinimumArray<T> = [T, ...T[]];
export type Sell = {
    items: MinimumArray<Item>;
    payments: MinimumArray<Payment>;
    total?: number;
};
export type SellRequest = {
    type: RequestTypes;
} & Session & Sell;
export type LegacyCallback = (success: boolean, data: any) => void;
export type AtolDriverInterface = {
    openShift: () => Promise<AxiosPromise<TaskResponce>>;
    closeShift: () => Promise<AxiosPromise<TaskResponce>>;
    cashIn: (sum: number) => Promise<AxiosPromise<TaskResponce>>;
    cashOut: (sum: number) => Promise<AxiosPromise<TaskResponce>>;
    sell: (data: Sell) => Promise<AxiosPromise<TaskResponce>>;
    reportX: () => Promise<AxiosPromise<TaskResponce>>;
    checkStatus: (uuid: string, callIndex?: number) => Promise<TaskResultStatus>;
    fprint: any;
};
//# sourceMappingURL=types.d.ts.map