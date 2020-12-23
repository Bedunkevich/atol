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
//# sourceMappingURL=types.d.ts.map