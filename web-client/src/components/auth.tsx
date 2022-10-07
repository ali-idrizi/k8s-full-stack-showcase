import { useAuthQuery, useRefreshTokenMutation, useRouterRef } from '@/hooks'
import { useEffect } from 'react'

export const Auth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { mutate } = useRefreshTokenMutation()
  const { needsRefresh } = useAuthQuery()
  const routerRef = useRouterRef()

  useEffect(() => {
    // Refresh the access token if a GSSP call requested it
    if (needsRefresh) {
      mutate(null, {
        onSuccess: () => {
          // Replace the route with the current path, this will make another call to GSSP
          const router = routerRef.current

          router.replace(router.asPath)
        },
        onError: () => {
          console.error('refresh token failed')
          // TODO: refresh token failed, logout and redirect to /login
        },
      })
    }
  }, [needsRefresh, mutate, routerRef])

  if (needsRefresh) {
    return <noscript>Authentication failed</noscript>
  }

  return <>{children}</>
}
