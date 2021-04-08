export default {
  type: 'object',
  name: 'infoRows',
  title: 'Info rows',
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'string',
      name: 'anchor',
      description: 'Example: aboutus',
    },
    {
      type: 'array',
      name: 'rows',
      of: [{ type: 'textWithIllustration' }],
    },
  ],
}
