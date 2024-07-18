import { type Page } from '@/payload-types'
import React from 'react'

type PagePros = {
  page: Page
}

export default function Page({ page }: PagePros) {
  return <div>{page.title}</div>
}
