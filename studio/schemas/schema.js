// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import authorReference from './objects/authorReference'
import blockContent from './documents/blockContent'
import simpleBlockContent from './documents/simpleBlockContent'
import category from './documents/category'
import cta from './objects/cta'
import post from './documents/post'
import author from './documents/author'
import link from './objects/link'
import mainImage from './objects/mainImage'
import openGraph from './objects/openGraph'
import page from './documents/page'
import navMenu from './documents/navMenu'
import route from './documents/route'
import hero from './objects/hero'
import illustration from './objects/illustration'
import bioPortableText from './objects/bioPortableText'
import siteSettings from './documents/siteSettings'
import textWithIllustration from './objects/textWithIllustration'
import infoRows from './objects/infoRows'
import contactForm from './objects/contactForm'
import contact from './documents/contact'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    authorReference,
    post,
    author,
    bioPortableText,
    category,
    cta,
    hero,
    link,
    illustration,
    page,
    mainImage,
    navMenu,
    openGraph,
    route,
    simpleBlockContent,
    siteSettings,
    infoRows,
    textWithIllustration,
    contactForm,
    contact,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
})
