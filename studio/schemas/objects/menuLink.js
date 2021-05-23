export default {
  title: 'Nav Menu Link',
  name: 'menuLink',
  type: 'object',
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
      title: 'Sub Menu (Drop-Down)',
      name: 'subMenu',
      description: 'Leave blank if you do not want a drop down menu.',
      type: 'array',
      of: [{ type: 'subMenu' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      landingPage: 'landingPageRoute.slug.current',
      route: 'route',
      link: 'link',
    },
    prepare({ title, landingPage, route, link }) {
      let subtitle = 'Not set'
      if (landingPage) {
        subtitle = `Route: /${landingPage}`
      }
      if (route) {
        subtitle = `Route: ${route}`
      }
      if (link) {
        subtitle = `External: ${link}`
      }
      return {
        title,
        subtitle,
      }
    },
  },
}
