import React from "react"
import { graphql } from "gatsby"

import Hero from "../components/hero"
import InfoRows from "../components/InfoRows"
import InfoColumns from "../components/InfoColumns"
import ContactForm from "../components/ContactForm"
import { BsChevronDoubleUp as UpChevron } from "react-icons/bs"

import GraphQLErrorList from "../components/graphql-error-list"
import SEO from "../components/seo"
import Layout from "../containers/layout"

export const query = graphql`
  query PageTemplateQuery($id: String!) {
    route: sanityRoute(id: { eq: $id }) {
      slug {
        current
      }
      useSiteTitle
      page {
        ...PageInfo
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      keywords
      openGraph {
        title
        description
        keywords
        image {
          ...SanityImage
        }
      }
    }
  }
`

const Page = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  const page = data.page || data.route.page

  const content = (page._rawContent || [])
    .filter(c => !c.disabled)
    .map(c => {
      let el = null
      switch (c._type) {
        case "hero":
          el = <Hero key={c._key} {...c} phone={site.phone || ""} />
          break
        case "infoRows":
          el = <InfoRows key={c._key} {...c} />
          break
        case "infoColumns":
          el = <InfoColumns key={c._key} {...c} />
          break
        case "contactForm":
          el = <ContactForm key={c._key} {...c} />
          break
        default:
          el = null
      }
      return el
    })

  const menuItems =
    page.navMenu && (page.navMenu.items || []).filter(i => !i.disabled)
  const navLogo = page.navMenu && (page.navMenu.logo || {})
  const replaceTitle = page.navMenu && (page.navMenu.replaceTitle || false)
  const pageTitle = data.route && !data.route.useSiteTitle && page.title

  return (
    <Layout
      navMenuItems={menuItems}
      navLogo={navLogo}
      replaceTitle={replaceTitle}
    >
      <SEO
        title={pageTitle}
        description={site.description}
        keywords={site.keywords}
      />
      {content}
      <button
        id="scroll-btn"
        className="hidden fixed bottom-24 right-6 md:bottom-24 md:right-10 scroll-btn bg-white bg-opacity-80 p-1 rounded"
        title="Top"
        to="#top"
      >
        <UpChevron className="mx-auto" />
        <span className="font-bold">To Top</span>
      </button>
    </Layout>
  )
}

export default Page
