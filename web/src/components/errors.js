import React from "react"
import GraphQLErrorList from "./graphql-error-list"
import Layout from "../containers/layout"

const Errors = ({ errors }) => (
  <Layout>
    <GraphQLErrorList errors={errors} />
  </Layout>
)

export default Errors
