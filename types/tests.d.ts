/**
 * @jest-environment node
 */
import nock from 'nock';
import type { Session } from './types';
declare const BASE_URL = "http://127.0.0.1:16732";
declare const SESSION: Session;
declare const Atol: {
    openShift: () => import("axios").AxiosPromise<import("./types").AtolResponce>;
    checkStatus: (uuid: string) => Promise<import("./types").TaskResultStatus>;
};
export { Atol, nock, BASE_URL, SESSION };
//# sourceMappingURL=tests.d.ts.map