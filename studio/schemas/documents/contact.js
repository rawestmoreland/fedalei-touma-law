export default {
  name: 'contact',
  type: 'document',
  title: 'Form submission',
  readOnly: true,
  fields: [
    {
      name: 'email',
      type: 'email',
      title: 'Email',
    },
    {
      name: 'firstname',
      type: 'string',
      title: 'First Name',
    },
    {
      name: 'lastname',
      type: 'string',
      title: 'Last Name',
    },
    {
      name: 'message',
      type: 'text',
      title: 'Message',
    },
  ],
}
