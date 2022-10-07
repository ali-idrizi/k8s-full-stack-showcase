import { GsspHoc, WithAuthData } from '.'

/**
 * Redirects to login is the user is not authenticated
 */
export const withAuthenticatedRoute: GsspHoc<unknown, unknown, WithAuthData> = ({
  auth: { isLoggedIn },
}) => {
  if (!isLoggedIn) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
