import React from 'react'
import { unstable_cache as cache } from 'next/cache'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { cacheWithTags } from '@/utils/cache'
import { pagesService } from '@/services/pages.service'

const getPageBySlug = cacheWithTags(pagesService.getPageBySlug, ['pages'])

export default async function page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)
  if (!page) {
    notFound()
  }
  return (
    <>
      <p>{page.title}</p>
    </>
  )
}

const getPagesSlugs = cacheWithTags(pagesService.getAllPageSlug, ['pages'])

export async function generateStaticParams() {
  const slugs = await getPagesSlugs()

  return slugs
}
