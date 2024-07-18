import React from 'react'
import Link from 'next/link'
import { navigationService } from '@/services/navigation.service'
import { cacheWithTags } from '@/utils/cache'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ModeToggle } from '@/components/ModeToggle'

const getNavs = cacheWithTags(navigationService.getNavigation, ['navigations'])
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navs = await getNavs()
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
          <ModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
