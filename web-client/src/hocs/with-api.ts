import { API } from '@/api'
import { GsspHoc } from '.'

export type WithApiData = {
  api: API
}

export const withApi: GsspHoc<WithApiData, unknown, unknown> = (_, ctx) => {
  const authHeaders: Record<string, string> = {}
  const userId = ctx.req.headers['x-user-id']

  if (userId && typeof userId === 'string') {
    authHeaders['x-user-id'] = userId
    authHeaders['x-authenticated'] = 'true'
  }

  return {
    props: {},
    data: {
      api: new API({
        headers: authHeaders,
      }),
    },
  }
}
