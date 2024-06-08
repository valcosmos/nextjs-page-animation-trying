'use client'

import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useContext, useRef } from 'react'

export function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {})
  const frozen = useRef(context)

  if (!frozen.current) {
    return <>{props.children}</>
  }

  return (
    <LayoutRouterContext.Provider value={frozen.current}>{props.children}</LayoutRouterContext.Provider>
  )
}
