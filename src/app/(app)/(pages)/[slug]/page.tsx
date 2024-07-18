import React from 'react'
import { unstable_cache as cache } from 'next/cache'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

const getPageBySlug = cache(
  async (slug: string) => {
    const payload = await getPayloadHMR({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    return pages.docs.length > 0 ? pages.docs[0] : null
  },
  undefined,
  { tags: ['pages'] },
)

export default async function page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)
  if (!page) {
    notFound()
  }
  return (
    <>
      <div>Hello {params.slug}</div>
      <p>{page.title}</p>
    </>
  )
}

const getPagesSlugs = cache(
  async () => {
    const payload = await getPayloadHMR({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
    })
    return pages.docs.map((page) => page.slug)
  },
  undefined,
  { tags: ['pages'] },
)

export async function generateStaticParams() {
  const slugs = await getPagesSlugs()

  return slugs
}
