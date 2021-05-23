export default {
  type: 'document',
  name: 'navigationMenu',
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'illustration',
      name: 'logo',
      title: 'Logo',
    },
    {
      type: 'boolean',
      name: 'replaceTitle',
      title: 'Replace title with logo in nav bar',
      description:
        'If this is selected, your logo will appear in you nav bar instead of a text version of your site title',
    },
    {
      type: 'array',
      name: 'items',
      of: [{ type: 'menuLink' }],
    },
  ],
}
