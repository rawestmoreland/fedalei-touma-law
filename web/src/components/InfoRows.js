import React from "react"
import PortableText from "./portableText"

import Image from "gatsby-plugin-sanity-image"

const maybeImage = illustration => {
  let img = null
  if (
    illustration &&
    illustration.disabled !== true &&
    illustration.image &&
    illustration.image.asset
  ) {
    img = <Image width={700} {...illustration.image} />
  }
  return img
}

const InfoRow = props => {
  const img = maybeImage(props.illustration)
  const sizeClass = img ? "sm:w-1/2" : "sm:w-1/1"
  return (
    <div className={"flex flex-wrap pb-6"}>
      <div className={"w-full p-6 " + sizeClass}>
        <h3 className="text-3xl text-gray-800 font-medium leading-none mb-3">
          {props.title}
        </h3>
        <div className="text-justify text-gray-600 mb-8">
          <PortableText blocks={props.text} />
        </div>
      </div>
      {img && <div className={"w-full " + sizeClass}>{img}</div>}
    </div>
  )
}

const InfoRowFlipped = props => {
  const img = maybeImage(props.illustration)
  const sizeClass = img ? "sm:w-1/2" : "sm:w-1/1"
  return (
    <div className={"flex flex-wrap pb-6 flex-col-reverse sm:flex-row"}>
      {img && <div className={"w-full " + sizeClass}>{img}</div>}
      <div className={"w-full p-6 " + sizeClass}>
        <h3 className="text-3xl text-gray-800 font-medium leading-none mb-3">
          {props.title}
        </h3>
        <div className="text-justify text-gray-600 mb-8">
          <PortableText blocks={props.text} />
        </div>
      </div>
    </div>
  )
}

const InfoRows = props => {
  const contentRows = (props.rows || [])
    .filter(r => !r.disabled)
    .map((r, i) => {
      return i % 2 === 0 ? (
        <InfoRow key={r._key} {...r} />
      ) : (
        <InfoRowFlipped key={r._key} {...r} />
      )
    })

  return (
    <section
      id={props.anchor || ""}
      className="flex justify-center items-center min-h-screen bg-white border-b"
    >
      <div className="container max-w-5xl mx-auto m-8">
        <h2 className="w-full my-2 text-5xl font-medium leading-tight text-center text-gray-800">
          {props.title}
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        {contentRows}
      </div>
    </section>
  )
}

export default InfoRows
