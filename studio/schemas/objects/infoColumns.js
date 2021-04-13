export default {
  type: 'object',
  name: 'infoColumns',
  title: 'Info columns',
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
      name: 'columns',
      of: [{ type: 'illustration', title: 'Image' }, { type: 'simpleText' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      disabled: 'disabled',
    },
    prepare({ title, disabled }) {
      return {
        title: `Info Columns: ${disabled ? 'DISABLED' : title}`,
      }
    },
  },
}
