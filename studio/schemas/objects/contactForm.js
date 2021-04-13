export default {
  name: 'contactForm',
  type: 'object',
  title: 'Contact Form',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'anchor', type: 'string', description: 'Example: contact' },
  ],
  preview: {
    select: {
      title: 'title',
      disabled: 'disabled',
    },
    prepare({ title, disabled }) {
      return {
        title: `Contact Form: ${disabled ? 'DISABLED' : title}`,
      }
    },
  },
}
