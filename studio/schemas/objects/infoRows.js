export default {
  type: 'object',
  name: 'infoRows',
  title: 'Info rows',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'string',
      name: 'anchor',
      description: 'Example: whyus',
    },
    {
      type: 'array',
      name: 'rows',
      of: [{ type: 'textWithIllustration' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      disabled: 'disabled',
    },
    prepare({ title, disabled }) {
      return {
        title: `Info Rows: ${disabled ? 'DISABLED' : title}`,
      }
    },
  },
}
