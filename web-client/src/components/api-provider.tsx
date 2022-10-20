import { API } from '@/api'
import { useAuthQuery, useRefreshTokenMutation, useRouterRef } from '@/hooks'
import { HStack, Spinner, Text } from '@chakra-ui/react'
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const ApiContext = createContext<API | null>(null)

/**
 * This component creates the `API` and adds a context provider for it. It also handles refreshing
 * the token, both for API and getServerSideProps calls. Use the `useApi` hook to get the `API` object.
 */
export const ApiProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const routerRef = useRouterRef()
  const refreshTokenPromiseRef = useRef<Promise<unknown> | null>(null)
  const [isTokenRefreshing, setInTokenRefreshing] = useState(false)
  const { mutateAsync: mutateRefreshToken } = useRefreshTokenMutation()
  const { isLoggedIn, shouldRefreshToken } = useAuthQuery()

  const handleRefreshToken = useCallback(async () => {
    try {
      if (isLoggedIn) {
        refreshTokenPromiseRef.current = refreshTokenPromiseRef.current ?? mutateRefreshToken(null)
        await refreshTokenPromiseRef.current
        return true
      }
    } catch {
    } finally {
      refreshTokenPromiseRef.current = null
    }
    return false
  }, [mutateRefreshToken, isLoggedIn])

  const api = useMemo(() => {
    return new API({
      onRefreshToken: handleRefreshToken,
      onPreRequest: async () => {
        // Delay requests if we are in process of refreshing the token.
        // Cancel requests if refresh token fails.
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

  // Only a call to `getServerSideProps` will set `shouldRefreshToken` to `true`.
  // Refresh the token in that case and replace the route to make another call to it.
  useEffect(() => {
    const refreshTokenAndReplaceRoute = async () => {
      if (shouldRefreshToken) {
        setInTokenRefreshing(true)
        if (await handleRefreshToken()) {
          await routerRef.current.replace(routerRef.current.asPath)
        }
        setInTokenRefreshing(false)
      }
    }

    refreshTokenAndReplaceRoute()
  }, [shouldRefreshToken, handleRefreshToken, routerRef])

  return (
    <ApiContext.Provider value={api}>
      {shouldRefreshToken || isTokenRefreshing ? (
        <HStack justifyContent="center" spacing="4" pt="16">
          <Spinner size="sm" />
          <Text fontSize="sm">Authenticating! Please wait...</Text>
        </HStack>
      ) : (
        children
      )}
    </ApiContext.Provider>
  )
}
