import API from './api';
import type { Session, Options } from './types';

export const init = ({
  session,
  options,
}: {
  session: Session;
  options?: Options;
}) => API(session, options);
