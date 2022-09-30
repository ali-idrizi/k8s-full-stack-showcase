import { useAuthQuery, useRefreshTokenMutation } from '@/hooks'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

export const Auth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { mutate } = useRefreshTokenMutation()
  const { needsRefresh } = useAuthQuery()

  const router = useRouter()
  const routerRef = useRef(router)

  useEffect(() => {
    routerRef.current = router
  }, [router])

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
  }, [needsRefresh, mutate])

  if (needsRefresh) {
    return <noscript>Authentication failed</noscript>
  }

  return <>{children}</>
}
