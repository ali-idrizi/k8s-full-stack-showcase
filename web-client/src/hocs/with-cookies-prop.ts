import { getColorModeCookie } from '@/utils/color-mode'
import { GsspHoc } from '.'

export type WithCookiesProp = {
  cookies: string
}

export const withCookiesProp: GsspHoc<Record<string, unknown>, WithCookiesProp, unknown> = (
  _,
  ctx,
) => {
  // Forward only cookies we need so we don't leak the httpOnly cookies
  const cookies = [getColorModeCookie(ctx.req.headers.cookie)]

  return {
    props: {
      cookies: cookies.join('; '),
    },
  }
}
