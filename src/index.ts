import API from './api';
import type { Session, AtolDriverInterface } from './types';

export const init = ({
  session,
  baseUrl,
}: {
  session: Session;
  baseUrl: string;
}): AtolDriverInterface => API(session, baseUrl);
