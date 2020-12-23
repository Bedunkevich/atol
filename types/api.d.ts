import { AxiosPromise } from 'axios';
import { Session, AtolResponce, TaskResultStatus } from './types';
declare const _default: (session: Session, baseURL?: string) => {
    openShift: () => AxiosPromise<AtolResponce>;
    checkStatus: (uuid: string) => Promise<TaskResultStatus>;
};
export default _default;
//# sourceMappingURL=api.d.ts.map