import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      validate: (value) => {
        if (!value) {
          return 'Please enter a name'
        }
        if (value.length < 3) {
          return 'Name must be at least 3 characters'
        }
        return true;
      }
    }
    // Email added by default
    // Add more fields as needed
  ],
}
