import type { AxiosPromise } from 'axios';
export declare type AtolResponce = {
    uuid: string;
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
    closeShift = "closeShift"
}
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
    operator: {
        name: string;
        vatin: string;
    };
};
export declare type AtolDriverInterface = {
    openShift: () => AxiosPromise<AtolResponce>;
    closeShift: () => AxiosPromise<AtolResponce>;
    checkStatus: (uuid: string, callIndex?: number) => Promise<TaskResultStatus>;
};
//# sourceMappingURL=types.d.ts.map