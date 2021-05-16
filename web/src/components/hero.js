import React from "react"
import PortableText from "./portableText"
import CTALink from "./CTALink"
import Image from "gatsby-plugin-sanity-image"

const maybeImage = illustration => {
  let img = null
  if (
    illustration &&
    illustration.disabled !== true &&
    illustration.image &&
    illustration.image.asset
  ) {
    img = <Image width={1200} {...illustration.image} />
  }
  return img
}

function Hero(props) {
  const img = maybeImage(props.illustration)
  return (
    <div
      id={props.anchor || ""}
      className="border-b relative w-full mx-auto flex flex-wrap flex-col lg:flex-row items-start pb-6 md:pb-0"
    >
      <div className="relative bg-white">{img}</div>
      <div
        id={props.anchor || ""}
        className="md:absolute md:top-0 md:left-0 flex flex-col p-4 w-full mx-auto xl:mt-5 rounded-md justify-between items-center z-45"
      >
        <h1 className="text-blueGrey-800 text-5xl xl:text-6xl 2xl:text-8xl 2xl:mb-4 font-medium leading-tight tracking-wide text-center">
          {props.heading}
        </h1>
        <div className="leading-normal text-2xl 2xl:text-3xl text-center font-normal">
          <PortableText blocks={props.tagline} />
        </div>
        {props.phone && (
          <div className="py-4 md:py-2 2xl:py-4">
            <a
              className="text-normal font-bold 2xl:text-2xl hover:underline"
              href={`tel:+1${props.phone.replace(/[^\d+]/g, "")}`}
            >
              {props.phone}
            </a>
          </div>
        )}
        {props.cta && props.cta.title && (
          <CTALink
            {...props.cta}
            buttonActionClass="mx-auto hover:underline bg-white text-blueGray-800 font-bold rounded-full md:my-2 py-4 px-8 shadow-lg 2xl:text-2xl"
            linkActionClass="text-xl 2xl:text-2xl"
          />
        )}
      </div>
    </div>
  )
}

export default Hero
