import { type Page } from '@/payload-types'
import React from 'react'
import { Button } from './ui/button'

type PagePros = {
  page: Page
}

export default function Page({ page }: PagePros) {
  return (
    <div>
      {page.title}
      <p>
        <Button>Click me</Button>
      </p>
    </div>
  )
}
