import type { AxiosPromise } from 'axios';
declare global {
    interface Window {
        ajv7: {
            default: any;
        };
    }
}
export declare type Options = Partial<{
    baseUrl: string;
    maxCalls: number;
    delayBetweenCalls: number;
}> | undefined;
export declare type TaskResponce = Partial<{
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
export declare type TaxationType = 'osn' | 'usnIncome' | 'usnIncomeOutcome' | 'envd' | 'esn' | 'patent';
export declare type TaskResultResponce = {
    results: {
        error: {
            code: number;
            description: string;
        };
        status: TaskResultStatus;
    }[];
};
export declare type Session = {
    taxationType: TaxationType;
    operator: {
        name: string;
        vatin?: string;
    };
};
export declare type PositionTax = 'none' | 'vat0' | 'vat10' | 'vat110' | 'vat18' | 'vat118' | 'vat20' | 'vat120';
export declare type Item = {
    type: 'position';
    name: string;
    price: number;
    quantity: number;
    amount: number;
    infoDiscountSum?: number;
    tax: {
        type: PositionTax;
        sum?: number;
    };
    paymentMethod?: 'fullPrepayment' | 'prepayment' | 'advance' | 'fullPayment' | 'partialPayment' | 'credit' | 'creditPayment';
    paymentObject?: 'commodity' | 'excise' | 'job' | 'service';
    department?: number;
    markingCode: {
        type?: 'other' | 'egais20' | 'egais30';
        mark: string;
    };
};
export declare type Payment = {
    type: 'cash' | 0 | 'electronicaly' | 1 | 'prepaid' | 2 | 'credir' | 3 | 'other' | 4 | number;
    sum: number;
};
export declare type MinimumArray<T> = [T, ...T[]];
export declare type Sell = {
    items: MinimumArray<Item>;
    payments: MinimumArray<Payment>;
    total?: number;
};
export declare type SellRequest = {
    type: RequestTypes;
} & Session & Sell;
export declare type LegacyCallback = (success: boolean, data: any) => void;
export declare type AtolDriverInterface = {
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