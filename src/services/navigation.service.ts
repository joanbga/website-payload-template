// /src/services/navigation.service.ts

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

interface NavigationItem {
  label: string
  isHomePage: boolean
  href: string | null
}

export class NavigationService {
  private static instance: NavigationService

  private constructor() {}

  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService()
    }
    return NavigationService.instance
  }

  public async getNavigation(): Promise<NavigationItem[]> {
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await payload.findGlobal({
      slug: 'navigations',
    })

    return data.items
      .map((nav: any) => ({
        label: nav.label,
        isHomePage: typeof nav.page === 'string' ? false : nav.page.isHomepage,
        href: typeof nav.page === 'string' ? null : nav.page.slug,
      }))
      .filter((nav: NavigationItem) => nav.href)
  }
}

export const navigationService = NavigationService.getInstance()
