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
      title: 'Replace Title With Logo In Navbar',
    },
    {
      type: 'array',
      name: 'items',
      of: [{ type: 'cta' }],
    },
  ],
}
