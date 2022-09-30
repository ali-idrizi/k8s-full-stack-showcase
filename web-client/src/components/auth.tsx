import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const Auth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { needsRefresh } = useAuth()

  useEffect(() => {
    const refreshToken = async (): Promise<void> => {
      const res = await fetch('/api/user/auth/refresh-token', {
        method: 'post',
      })

      if (!res.ok) {
        throw new Error('Failed to refresh the access token')
      }
    }

    // Refresh the access token if a GSSP call requested it
    if (needsRefresh) {
      refreshToken()
        .then(() => {
          // Replace the route with the current path, this will make another call to GSSP
          router.replace(router.asPath)
        })
        .catch(() => {
          // TODO: refresh token failed, logout and redirect to /login
          router.push('/404')
        })
    }
  }, [router, needsRefresh])

  if (needsRefresh) {
    return <noscript>Authentication failed</noscript>
  }

  return <>{children}</>
}
