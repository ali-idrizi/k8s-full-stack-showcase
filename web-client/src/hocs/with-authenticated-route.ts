import { GsspHoc, WithAuthData } from '.'

/**
 * Redirects to the specified destination if the user is not authenticated
 */
export const withAuthenticatedRoute: (
  destination?: string,
) => GsspHoc<unknown, unknown, WithAuthData> = (destination = '/login') => {
  return ({ auth: { hasAuthTokens } }) => {
    if (!hasAuthTokens) {
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
