export default {
  name: 'contact',
  type: 'document',
  title: 'Form submissions',
  readOnly: true,
  fields: [
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
      name: 'email',
      type: 'email',
      title: 'Email',
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
    },
    {
      name: 'message',
      type: 'text',
      title: 'Message',
    },
  ],
}
