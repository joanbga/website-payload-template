import type { CollectionConfig } from 'payload'
import { HeroBlock } from './blocks/HeroBlock'
import { revalidateTag } from 'next/cache'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('pages')
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      validate: (value) => {
        if (!value) {
          return 'Please enter a title'
        }
        if (value.length < 3) {
          return 'Name must be at least 3 characters'
        }
        return true
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'isHomepage',
      label: 'Is Homepage?',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
