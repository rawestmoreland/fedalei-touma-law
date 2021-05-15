import { format, formatDistance, differenceInDays } from "date-fns"
import React from "react"
import PortableText from "./portableText"
import AuthorList from "./author-list"
import Container from "./container"
import serializers from "./serializers"
import Image from "gatsby-plugin-sanity-image"

function BlogPost(props) {
  const { _rawBody, authors, categories, title, mainImage, publishedAt } = props
  return (
    <article>
      {mainImage && mainImage.asset && (
        <Image
          className="w-screen md:max-w-7xl mx-auto md:p-6"
          {...mainImage}
        />
      )}
      <Container>
        <div className="md:grid md:grid-cols-4 md:gap-8">
          <div className="md:col-span-3">
            <h1 className="text-3xl font-bold my-4">{title}</h1>
            <div className="blog-content font-poppins text-sm md:text-base">
              {_rawBody && (
                <PortableText blocks={_rawBody} serializers={{ serializers }} />
              )}
            </div>
          </div>
          <aside>
            {publishedAt && (
              <div className="text-sm mt-8 mb-12">
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? formatDistance(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), "MMMM do, yyyy")}
              </div>
            )}
            {authors && <AuthorList items={authors} title="Authors" />}
            {categories.length > 0 && (
              <div>
                <h3 className="mb-4">Categories</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  )
}

export default BlogPost
