// /src/app/(app)/(pages)/page.tsx

import React from 'react'
import Page from '@/components/Page'
import { cacheWithTags } from '@/utils/cache'
import { pagesService } from '@/services/pages.service'

const getHomePage = cacheWithTags(pagesService.getHomePage, ['pages'])

export default async function page() {
  const homePage = await getHomePage()
  return (
    <>
      {homePage && <Page page={homePage} />}
      {!homePage && <p>No homepage found</p>}
    </>
  )
}
