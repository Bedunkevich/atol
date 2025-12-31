import { type AxiosPromise } from 'axios';
import { Session, Options, TaskResponce, TaskResultStatus, RequestTypes, Sell, LegacyCallback } from './types';
declare const _default: (session: Session, options: Options) => {
    openShift: () => Promise<AxiosPromise<TaskResponce>>;
    closeShift: () => Promise<AxiosPromise<TaskResponce>>;
    cashIn: (cashSum: number) => Promise<AxiosPromise<TaskResponce>>;
    cashOut: (cashSum: number) => Promise<AxiosPromise<TaskResponce>>;
    sell: (data: Sell, type?: RequestTypes) => Promise<AxiosPromise<TaskResponce>>;
    reportX: () => Promise<AxiosPromise<TaskResponce>>;
    checkStatus: (uuid: string, callIndex?: number) => Promise<TaskResultStatus>;
    fprint: {
        report: (cb: LegacyCallback) => Promise<void>;
        sell: (data: any, cb: LegacyCallback) => Promise<void>;
        ret: (data: any, cb: LegacyCallback) => Promise<void>;
        open_session: (cb: LegacyCallback) => Promise<void>;
        close_session: (cb: LegacyCallback) => Promise<void>;
        cash_income: (data: {
            income: boolean;
            summ: number;
        }, cb: LegacyCallback) => Promise<void>;
    };
};
export default _default;
//# sourceMappingURL=api.d.ts.map