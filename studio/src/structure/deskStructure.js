import S from '@sanity/desk-tool/structure-builder'
import { GoBrowser as PageIcon, GoHome, GoSettings } from 'react-icons/go'

import landingPages from './landingPages'
import blog from './blog'

const hiddenDocTypes = (listItem) =>
  !['route', 'navigationMenu', 'post', 'page', 'siteSettings', 'author', 'category'].includes(
    listItem.getId()
  )

export default () =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem()
        .schemaType('siteSettings')
        .title('Site settings')
        .icon(GoSettings)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').views([S.view.form()])
        ),
      S.documentListItem()
        .title('Frontpage')
        .schemaType('page')
        .icon(GoHome)
        .child(S.document().schemaType('page').documentId('frontpage').views([S.view.form()])),
      landingPages,
      blog,
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
