import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { unstable_cache as cache } from 'next/cache'
import Link from 'next/link'

const getNavs = cache(
  async () => {
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await payload.findGlobal({
      slug: 'navigations',
    })
    return data.items
      .map((nav) => ({
        label: nav.label,
        isHomePage: typeof nav.page === 'string' ? false : nav.page.isHomepage,
        href: typeof nav.page === 'string' ? null : nav.page.slug,
      }))
      .filter((nav) => nav.href)
  },
  undefined,
  { tags: ['navigations'] },
)

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
