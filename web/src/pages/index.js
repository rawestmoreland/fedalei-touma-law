import * as React from "react"
import { graphql } from "gatsby"

import Page from "../templates/page"
import Errors from "../components/errors"

export const query = graphql`
  query FrontpageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)frontpage/" }) {
      ...PageInfo
    }

    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      phone
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

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return <Errors errors={errors} />
  }

  return <Page data={data} />
}

export default IndexPage
