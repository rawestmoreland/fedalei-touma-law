import { graphql } from "gatsby"

export const NavMenu = graphql`
  fragment NavMenu on SanityNavigationMenu {
    items {
      title
      route
      anchor
      subMenu {
        link
        name
      }
      landingPageRoute {
        ... on SanityRoute {
          id
          _type
          slug {
            current
          }
        }
      }
    }
    logo {
      image {
        ...SanityImage
      }
    }
    replaceTitle
  }
`
