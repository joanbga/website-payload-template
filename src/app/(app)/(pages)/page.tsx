import React from 'react'
import { unstable_cache as cache } from 'next/cache'
import { findCollection, findGlobal, getPayload } from '@/lib/payload/payload'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Page from '@/components/Page'

const getHomePage = cache(
  async () => {
    const payload = await getPayloadHMR({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      where: {
        isHomepage: {
          equals: true,
        },
      },
    })
    if (pages.docs.length === 0) {
      return null
    }
    return pages.docs[0]
  },
  undefined,
  { tags: ['pages'] },
)

export default async function page() {
  const homePage = await getHomePage()
  return (
    <>
      {homePage && <Page page={homePage} />}
      {!homePage && <p>No homepage found</p>}
    </>
  )
}
