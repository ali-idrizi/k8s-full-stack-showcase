import { GsspHoc, WithAuthData } from '.'

/**
 * Redirects to the specified destination if the user is authenticated
 */
export const withUnauthenticatedRoute: (
  destination?: string,
) => GsspHoc<unknown, unknown, WithAuthData> = (destination = '/dashboard') => {
  return ({ auth: { isLoggedIn } }) => {
    if (isLoggedIn) {
      return {
        redirect: {
          destination,
          permanent: false,
        },
      }
    }

    return {
      props: {},
    }
  }
}
