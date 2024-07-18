import React from 'react'
import Link from 'next/link'
import { navigationService } from '@/services/navigation.service'
import { cacheWithTags } from '@/utils/cache'
import './globals.css'

const getNavs = cacheWithTags(navigationService.getNavigation, ['navigations'])
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navs = await getNavs()
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-2">
          {navs.map((nav) => (
            <Link
              key={nav.href}
              className="text-gray-500 hover:text-gray-700"
              href={`/${nav.isHomePage ? '' : nav.href}`}
            >
              {nav.label}
            </Link>
          ))}
        </nav>
        {children}
      </body>
    </html>
  )
}
