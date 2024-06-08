import { usePathname } from 'next/navigation'
import React from 'react'

export default function CurrentPage() {
  const path = usePathname()
  const routes: Record<string, string> = {
    '/': 'Home',
    '/about': 'About',
    '/contact': 'Contact'
  }
  return <span>{routes[path]}</span>
}
