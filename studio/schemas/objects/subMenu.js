export default {
  title: 'Sub Menu (Drop Down)',
  name: 'subMenu',
  type: 'object',
  description: 'Leave these fields blank if you do not want a drop down menu.',
  fieldsets: [
    {
      title: 'Link',
      name: 'link',
      description: 'Only the first value of these will be used',
    },
  ],
  fields: [
    {
      title: 'Disabled',
      name: 'disabled',
      type: 'boolean',
      description: 'Turn this on if you want to hide this link / button.',
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Landing page',
      name: 'landingPageRoute',
      type: 'reference',
      fieldset: 'link',
      to: [{ type: 'route' }],
    },
    {
      title: 'Path',
      name: 'route',
      fieldset: 'link',
      description: 'Example: /blog',
      type: 'string',
    },
    {
      title: 'Anchor',
      name: 'anchor',
      type: 'string',
      fieldset: 'link',
      description: 'Example: #about',
    },
    {
      title: 'Kind',
      name: 'kind',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['button', 'link'],
      },
    },
    {
      title: 'External link',
      name: 'link',
      type: 'string',
      description: 'Example: https://www.sanity.io',
      fieldset: 'link',
    },
  ],
}
