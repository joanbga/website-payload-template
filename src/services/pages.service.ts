// /src/services/pages.service.ts

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Page } from '@/payload-types'

export class PagesService {
  private static instance: PagesService

  private constructor() {}

  public static getInstance(): PagesService {
    if (!PagesService.instance) {
      PagesService.instance = new PagesService()
    }
    return PagesService.instance
  }

  public async getHomePage(): Promise<Page | null> {
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
  }

  public async getPageBySlug(slug: string): Promise<Page | null> {
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
  }

  public async getAllPageSlug(): Promise<string[]> {
    const payload = await getPayloadHMR({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
    })
    return pages.docs.map((page) => page.slug)
  }
}

export const pagesService = PagesService.getInstance()
