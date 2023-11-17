import type { Session, Options } from './types';
export declare const init: ({ session, options, }: {
    session: Session;
    options?: Options;
}) => {
    openShift: () => Promise<import("axios").AxiosPromise<Partial<{
        uuid: string;
        number: number;
        isBlocked: boolean;
        blockedUUID: string;
        error: {
            code: number;
            description: string;
        };
    }>>>;
    closeShift: () => Promise<import("axios").AxiosPromise<Partial<{
        uuid: string;
        number: number;
        isBlocked: boolean;
        blockedUUID: string;
        error: {
            code: number;
            description: string;
        };
    }>>>;
    cashIn: (cashSum: number) => Promise<import("axios").AxiosPromise<Partial<{
        uuid: string;
        number: number;
        isBlocked: boolean;
        blockedUUID: string;
        error: {
            code: number;
            description: string;
        };
    }>>>;
    cashOut: (cashSum: number) => Promise<import("axios").AxiosPromise<Partial<{
        uuid: string;
        number: number;
        isBlocked: boolean;
        blockedUUID: string;
        error: {
            code: number;
            description: string;
        };
    }>>>;
    sell: (data: import("./types").Sell, type?: import("./types").RequestTypes) => Promise<import("axios").AxiosPromise<Partial<{
        uuid: string;
        number: number;
        isBlocked: boolean;
        blockedUUID: string;
        error: {
            code: number;
            description: string;
        };
    }>>>;
    reportX: () => Promise<import("axios").AxiosPromise<Partial<{
        uuid: string;
        number: number;
        isBlocked: boolean;
        blockedUUID: string;
        error: {
            code: number;
            description: string;
        };
    }>>>;
    checkStatus: (uuid: string, callIndex?: number) => Promise<import("./types").TaskResultStatus>;
    fprint: {
        report: (cb: import("./types").LegacyCallback) => Promise<void>;
        sell: (data: any, cb: import("./types").LegacyCallback) => Promise<void>;
        ret: (data: any, cb: import("./types").LegacyCallback) => Promise<void>;
        open_session: (cb: import("./types").LegacyCallback) => Promise<void>;
        close_session: (cb: import("./types").LegacyCallback) => Promise<void>;
        cash_income: (data: {
            income: boolean;
            summ: number;
        }, cb: import("./types").LegacyCallback) => Promise<void>;
    };
};
//# sourceMappingURL=index.d.ts.map