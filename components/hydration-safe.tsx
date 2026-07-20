"use client"

import { useEffect, useState } from "react"

interface HydrationSafeProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationSafe({ children, fallback }: HydrationSafeProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return fallback || <div suppressHydrationWarning>{children}</div>
  }

  return <>{children}</>
}

// Higher-order component for hydration safety
export function withHydrationSafe<P extends object>(
  Component: React.ComponentType<P>
) {
  return function HydrationSafeComponent(props: P) {
    return (
      <HydrationSafe>
        <Component {...props} />
      </HydrationSafe>
    )
  }
}
