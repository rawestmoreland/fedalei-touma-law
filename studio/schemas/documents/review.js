export default {
  name: 'review',
  type: 'document',
  title: 'Google Reviews',
  readOnly: true,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Reviewer Name',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating Received',
    },
    {
      name: 'message',
      type: 'text',
      title: 'Review Content',
    },
  ],
  preview: {
    select: {
      name: `name`,
    },
    prepare({ name }) {
      return {
        title: `${name}`,
      }
    },
  },
}
