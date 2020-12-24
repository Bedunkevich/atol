/**
 * @jest-environment node
 */

import { nock, Atol, BASE_URL, SESSION } from '../setup';
import { TaskResultStatus, RequestTypes } from '../types';

const FAKE_UUID = '24efab70-4502-11eb-a6c8-1f6f568dbd0e';

jest.mock('../uuid', () => ({
  v1: () => FAKE_UUID,
}));

describe('ATOL', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('openShift | success', async () => {
    nock(BASE_URL)
      .post('/api/v2/request', {
        uuid: FAKE_UUID,
        request: [
          {
            type: RequestTypes[RequestTypes.openShift],
            operator: SESSION.operator,
          },
        ],
      })
      .reply(201, {
        number: 1,
        uuid: FAKE_UUID,
        isBlocked: false,
        blockedUUID: '',
      });

    const responce = await Atol.openShift();
    expect(responce.data).toMatchObject(
      expect.objectContaining({
        uuid: FAKE_UUID,
      }),
    );
  });
  it('openShift | fail (401)', async () => {
    nock(BASE_URL)
      .post('/api/v2/request', {
        uuid: FAKE_UUID,
        request: [
          {
            type: RequestTypes[RequestTypes.openShift],
            operator: SESSION.operator,
          },
        ],
      })
      .reply(401, {
        error: {
          code: 504,
          description: 'Авторизация не пройдена',
        },
      });

    try {
      await Atol.openShift();
    } catch (error) {
      expect(error.response.data).toStrictEqual({
        error: { code: 504, description: 'Авторизация не пройдена' },
      });
    }
  });
  it('openShift | get task status success', async () => {
    nock(BASE_URL)
      .get(`/api/v2/request/${FAKE_UUID}`)
      .reply(201, {
        results: [
          {
            error: {
              code: 0,
              description: 'Ошибок нет',
            },
            status: TaskResultStatus[TaskResultStatus.inProgress],
          },
        ],
      });
    nock(BASE_URL)
      .get(`/api/v2/request/${FAKE_UUID}`)
      .reply(201, {
        results: [
          {
            error: {
              code: 0,
              description: 'Ошибок нет',
            },
            status: TaskResultStatus[TaskResultStatus.inProgress],
          },
        ],
      });
    nock(BASE_URL)
      .get(`/api/v2/request/${FAKE_UUID}`)
      .reply(201, {
        results: [
          {
            error: {
              code: 0,
              description: 'Ошибок нет',
            },
            status: TaskResultStatus[TaskResultStatus.ready],
          },
        ],
      });

    const status = await Atol.checkStatus(FAKE_UUID);
    expect(status).toBe(TaskResultStatus.ready);
  });
});
