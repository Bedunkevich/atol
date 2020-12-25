import type { AxiosPromise } from 'axios';
export declare type TaskResponce = {
    uuid: string;
    number: number;
    isBlocked: boolean;
    blockedUUID: string;
} | {
    error: {
        code: number;
        description: string;
    };
};
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
    buyReturn = "buyReturn"
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
        vatin: string;
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
    type: 'cash' | 'electronicaly' | 'prepaid' | 'credir' | 'other';
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
export declare type AtolDriverInterface = {
    openShift: () => AxiosPromise<TaskResponce>;
    closeShift: () => AxiosPromise<TaskResponce>;
    cashIn: (sum: number) => AxiosPromise<TaskResponce>;
    cashOut: (sum: number) => AxiosPromise<TaskResponce>;
    sell: (data: Sell) => AxiosPromise<TaskResponce>;
    checkStatus: (uuid: string, callIndex?: number) => Promise<TaskResultStatus>;
};
//# sourceMappingURL=types.d.ts.map