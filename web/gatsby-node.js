const { isFuture, parseISO } = require("date-fns")
const path = require("path")
const fs = require("fs")
const klaw = require("klaw")
const matter = require("gray-matter")
const slugify = require("slugify")
const axios = require("axios")
const sanityClient = require("@sanity/client")

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV || "development"}`,
// })

// const client = sanityClient({
//   projectId: process.env.GATSBY_SANITY_PROJECT_ID,
//   dataset: process.env.GATSBY_SANITY_DATASET,
//   token: process.env.GATSBY_SANITY_TOKEN,
//   useCdn: false,
// })
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const getGoogleReviews = async () => {
//   console.log("=> Fetching reviews data..")
//   const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${process.env.PLACE_ID}&key=${process.env.PLACE_KEY}`
//   return new Promise((resolve, reject) => {
//     let reviews
//     axios.get(url).then(async res => {
//       console.log("=> Reviews data fetched!")
//       if (res.data.status === "OK") {
//         reviews = res.data.result.reviews
//         for (let i = 0; i < reviews.length; i++) {
//           const review = {
//             _id: slugify(reviews[i].author_name),
//             _type: "review",
//             name: reviews[i].author_name,
//             rating: reviews[i].rating,
//             message: reviews[i].text,
//           }
//           await client.createOrReplace(review).then(res => {
//             console.log(
//               `Review from ${res._id} was created (or was already present)`
//             )
//           })
//         }
//       }
//       resolve(reviews)
//     })
//   })
// }

/* Do things before the buld starts */
// exports.onPreBuild = async ({ reporter }) => {
//   reporter.info(`Running Pre Build Things...`)
//   // Get Google reviews and send to Sanity
//   await getGoogleReviews()
// }

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: "SanityPost",
      interfaces: ["Node"],
      fields: {
        isPublished: {
          type: "Boolean!",
          resolve: source => new Date(source.publishedAt) <= new Date(),
        },
      },
    }),
  ])
}

async function createLandingPages(
  pathPrefix = "/",
  graphql,
  actions,
  reporter
) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityRoute(
        filter: { slug: { current: { ne: null } }, page: { id: { ne: null } } }
      ) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const routeEdges = (result.data.allSanityRoute || {}).edges || []
  routeEdges.forEach(edge => {
    const { id, slug = {} } = edge.node
    const path = [pathPrefix, slug.current, "/"].join("")
    reporter.info(`Creating landing page: ${path}`)
    createPage({
      path,
      component: require.resolve("./src/templates/page.js"),
      context: { id },
    })
  })
}

async function createBlogPostPages(
  pathPrefix = "/blog",
  graphql,
  actions,
  reporter
) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, isPublished: { eq: true } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []
  postEdges
    .filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
    .forEach(edge => {
      const { id, slug = {} } = edge.node
      const path = `${pathPrefix}/${slug.current}/`
      reporter.info(`Creating blog post page: ${path}`)
      createPage({
        path,
        component: require.resolve("./src/templates/blog-post.js"),
        context: { id },
      })
    })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createLandingPages("/", graphql, actions, reporter)
  await createBlogPostPages("/blog", graphql, actions, reporter)
}
