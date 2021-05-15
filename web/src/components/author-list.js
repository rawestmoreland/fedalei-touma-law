import React from "react"
import { buildImageObj } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"
import Image from "gatsby-plugin-sanity-image"

const AuthorList = ({ items, title }) => {
  return (
    <div className="border-b border-t">
      <h2 className="mt-3 font-medium">{title}</h2>
      <ul>
        {items.map(({ author, _key }) => {
          const authorName = author && author.name
          return (
            <li key={_key} className="flex items-center my-4">
              <div>
                <div className="avatar">
                  {author && author.image && author.image.asset && (
                    <Image {...author.image} />
                  )}
                </div>
              </div>
              <div className="ml-2">
                <div>{authorName || <em>Missing name</em>}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AuthorList
