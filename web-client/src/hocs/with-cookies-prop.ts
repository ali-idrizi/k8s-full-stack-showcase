import { getColorModeCookie } from '@/utils/color-mode'
import { GsspHoc } from '.'

export type WithCookiesProp = {
  cookies: string
}

export const withCookiesProp: GsspHoc<Record<string, unknown>, WithCookiesProp, unknown> = (
  _,
  ctx,
) => {
  return {
    props: {
      cookies: getColorModeCookie(ctx.req.headers.cookie),
    },
  }
}
