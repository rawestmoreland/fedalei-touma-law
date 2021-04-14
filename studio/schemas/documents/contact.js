import { AiOutlineMail as email } from 'react-icons/ai'

export default {
  name: 'contact',
  type: 'document',
  title: 'Form submissions',
  icon: email,
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
  preview: {
    select: {
      firstname: `firstname`,
      lastname: `lastname`,
      email: 'email',
    },
    prepare({ firstname, lastname, email }) {
      return {
        title: `${lastname}, ${firstname}`,
        subtitle: email,
      }
    },
  },
}
