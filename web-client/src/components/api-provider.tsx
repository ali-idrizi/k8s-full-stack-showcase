import { API } from '@/api'
import { useRefreshTokenMutation } from '@/hooks'
import { createContext, useCallback, useMemo, useRef } from 'react'

export const ApiContext = createContext<API | null>(null)

/**
 * This component creates the `API` and adds a context provider for it. It also handles refreshing
 * the token for API calls. Use the `useApi` hook to get the `API` object.
 */
export const ApiProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const refreshTokenPromiseRef = useRef<Promise<unknown> | null>(null)
  const { mutateAsync: mutateRefreshToken } = useRefreshTokenMutation()

  const handleRefreshToken = useCallback(async () => {
    try {
      // await new Promise((res) => setTimeout(res, 200))
      refreshTokenPromiseRef.current ??= mutateRefreshToken(null)
      await refreshTokenPromiseRef.current
      return true
    } catch {
      return false
    } finally {
      refreshTokenPromiseRef.current = null
    }
  }, [mutateRefreshToken])

  const api = useMemo(() => {
    return new API({
      // Handles refresh token during an API call
      onRefreshToken: handleRefreshToken,
      onPreRequest: async () => {
        // Delay requests if we are in process of refreshing the token
        // Cancel requests if refresh token fails
        if (refreshTokenPromiseRef.current !== null) {
          try {
            await refreshTokenPromiseRef.current
          } catch {
            return false
          }
        }
        return true
      },
    })
  }, [handleRefreshToken])

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
