import { revalidateTag } from 'next/cache'
import type { GlobalConfig } from 'payload'

const Navigations: GlobalConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('navigations')
      },
    ],
  },
  slug: 'navigations',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
        },
      ],
    },
  ],
}

export default Navigations
