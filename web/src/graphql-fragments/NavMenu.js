import { graphql } from "gatsby"

export const NavMenu = graphql`
  fragment NavMenu on SanityNavigationMenu {
    items {
      title
      route
      anchor
      link
      _key
      subMenu {
        title
        anchor
        route
        link
        _key
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
