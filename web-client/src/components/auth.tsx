import { useAuthQuery, useRefreshTokenMutation, useRouterRef } from '@/hooks'
import { useEffect, useState } from 'react'

export const Auth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { mutate } = useRefreshTokenMutation()
  const { needsRefresh } = useAuthQuery()
  const routerRef = useRouterRef()
  const [isRefreshing, setIsRefreshing] = useState(needsRefresh)

  useEffect(() => {
    // Refresh the access token if a GSSP call requested it
    if (needsRefresh) {
      setIsRefreshing(true)
      mutate(null, {
        onSuccess: async () => {
          // Replace the route with the current path, this will make another call to GSSP
          await routerRef.current.replace(routerRef.current.asPath)
          setIsRefreshing(false)
        },
        onError: () => {
          console.error('refresh token failed')
          // TODO: refresh token failed, logout and redirect to /login
        },
      })
    }
  }, [needsRefresh, mutate, routerRef])

  if (isRefreshing) {
    return <noscript>Authentication failed</noscript>
  }

  return <>{children}</>
}
