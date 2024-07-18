import React from 'react'
import Link from 'next/link'
import { navigationService } from '@/services/navigation.service'
import { cacheWithTags } from '@/utils/cache'

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
        <nav>
          {navs.map((nav) => (
            <p key={nav.href}>
              <Link href={`/${nav.isHomePage ? '' : nav.href}`}>{nav.label}</Link>
            </p>
          ))}
        </nav>
        {children}
      </body>
    </html>
  )
}
