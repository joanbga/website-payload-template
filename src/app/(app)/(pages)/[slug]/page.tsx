import React from 'react'
import { notFound } from 'next/navigation'
import { cacheWithTags } from '@/utils/cache'
import { pagesService } from '@/services/pages.service'
import Page from '@/components/Page'

const getPageBySlug = cacheWithTags(pagesService.getPageBySlug, ['pages'])

export default async function page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }
  return <Page page={page} />
}

const getPagesSlugs = cacheWithTags(pagesService.getAllPageSlug, ['pages'])

export async function generateStaticParams() {
  const slugs = await getPagesSlugs()

  return slugs
}
