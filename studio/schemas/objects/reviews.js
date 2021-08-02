export default {
  name: 'reviews',
  type: 'object',
  title: 'Google Reviews',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'anchor', type: 'string', description: 'Example: reviews' },
  ],
  preview: {
    select: {
      title: 'title',
      disabled: 'disabled',
    },
    prepare({ title, disabled }) {
      return {
        title: `Google Reviews: ${disabled ? 'DISABLED' : title}`,
      }
    },
  },
}
