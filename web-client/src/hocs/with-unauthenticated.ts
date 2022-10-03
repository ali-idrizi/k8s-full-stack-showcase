import { GsspHoc, WithAuthData } from '.'

/**
 * Redirects to homepage is the user is authenticated
 */
export const withUnauthenticated: GsspHoc<unknown, unknown, WithAuthData> = ({ auth }) => {
  if (auth.userId !== null || auth.needsRefresh) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
