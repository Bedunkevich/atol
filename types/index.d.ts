import type { Session } from './types';
export declare const init: ({ session, baseUrl, }: {
    session: Session;
    baseUrl: string;
}) => {
    openShift: () => import("axios").AxiosPromise<import("./types").AtolResponce>;
    checkStatus: (uuid: string) => Promise<import("./types").TaskResultStatus>;
};
//# sourceMappingURL=index.d.ts.map