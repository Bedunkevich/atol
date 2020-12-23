/**
 * @jest-environment node
 */
import nock from 'nock';
import type { Session, AtolDriverInterface } from './types';
declare const BASE_URL = "http://127.0.0.1:16732";
declare const SESSION: Session;
declare const Atol: AtolDriverInterface;
declare const delay: (time: number) => Promise<void>;
export { Atol, nock, BASE_URL, SESSION, delay };
//# sourceMappingURL=tests.d.ts.map