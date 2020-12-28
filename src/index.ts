import API from './api';
import type { Session, Options, AtolDriverInterface } from './types';

export const init = ({
  session,
  options,
}: {
  session: Session;
  options?: Options;
}): AtolDriverInterface => API(session, options);
