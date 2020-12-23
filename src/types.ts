import type { AxiosPromise } from 'axios';

export type AtolResponce = { uuid: string };

export enum TaskResultStatus {
  ready = 'ready',
  error = 'error',
  wait = 'wait',
  inProgress = 'inProgress',
  interrupted = 'interrupted',
  blocked = 'blocked',
  canceled = 'canceled',
}

export enum RequestTypes {
  openShift = 'openShift',
  closeShift = 'closeShift',
}

export type TaskResultResponce = {
  results: {
    error: {
      code: number;
      description: string;
    };
    status: TaskResultStatus;
  }[];
};

export type Session = {
  operator: {
    name: string;
    vatin: string;
  };
};

export type AtolDriverInterface = {
  openShift: () => AxiosPromise<AtolResponce>;
  closeShift: () => AxiosPromise<AtolResponce>;
  checkStatus: (uuid: string, callIndex?: number) => Promise<TaskResultStatus>;
};
