import { NextRouter, useRouter } from 'next/router'
import { MutableRefObject, useEffect, useRef } from 'react'

export const useRouterRef = (): MutableRefObject<NextRouter> => {
  const router = useRouter()
  const routerRef = useRef(router)

  useEffect(() => {
    routerRef.current = router
  }, [router])

  return routerRef
}
