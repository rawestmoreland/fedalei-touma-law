export default {
  type: 'object',
  name: 'simpleText',
  title: 'Text Area',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Text Area`,
      }
    },
  },
}
