import { Link } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import CTALink from "./CTALink"
import React, { useState } from "react"
import Image from "gatsby-plugin-sanity-image"
import { BsChevronDown } from "react-icons/bs"

const maybeImage = logo => {
  let img = null
  if (logo && logo.disabled !== true && logo.image && logo.image.asset) {
    img = <Image {...logo.image} />
  }
  return img
}

const Brand = props => {
  const img = maybeImage(props.navLogo)

  return img && props.replaceTitle ? (
    <div className="w-24 sm:w-48 md:w-64">{img}</div>
  ) : (
    <h1>
      <span className="text-xl font-medium tracking-tight">
        {props.siteTitle}
      </span>
    </h1>
  )
}

const Header = props => {
  const { navMenuItems } = props
  const [isExpanded, toggleExpansion] = useState(false)

  return (
    <header id="top" className="bg-white">
      <div className="flex flex-wrap items-center justify-between p-4 md:p-8">
        <Link to="/">
          <Brand {...props} />
        </Link>

        <button
          className="items-center block px-3 py-2 text-blueGrey-800 border border-white rounded md:hidden"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:text-xl md:flex md:items-center w-full md:w-auto md:flex-col`}
        >
          <ul className="md:flex md:pt-4 lg60:pt-0">
            {(navMenuItems || []).map(link =>
              link.anchor ? (
                <li
                  className={
                    `${link.subMenu.length > 0 ? "dropdown" : ""}` +
                    " md:ml-6 md:first:ml-0"
                  }
                  key={link._key}
                >
                  <div className="flex items-center">
                    <AnchorLink
                      to={`${link.route || ""}${link.anchor}`}
                      title={link.title}
                      className={`stripped block mt-4 text-blueGrey-800 no-underline md:inline-block md:mt-0`}
                    />
                    {link.subMenu.length > 0 && (
                      <BsChevronDown className="mt-4 md:mt-0 ml-2" />
                    )}
                  </div>
                  {link.subMenu && link.subMenu.length > 0 ? (
                    <ul className="dropdown-menu hidden md:absolute md:py-1 z-50">
                      <div className="bg-white pt-1 rounded">
                        {link.subMenu.map(subLink =>
                          subLink.anchor ? (
                            <li
                              key={subLink._key}
                              className="text-xs md:text-base pb-1"
                            >
                              <AnchorLink
                                to={`${subLink.route || ""}${subLink.anchor}`}
                                title={subLink.title}
                              />
                            </li>
                          ) : (
                            <li
                              key={subLink._key}
                              className="text-xs md:text-base pb-1"
                            >
                              <CTALink {...subLink}>{subLink.title}</CTALink>
                            </li>
                          )
                        )}
                      </div>
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li className="md:ml-6" key={link._key}>
                  <div className="flex items-center">
                    <Link
                      className="block mt-4 text-blueGrey-800 no-underline md:inline-block md:mt-0"
                      to={link.route}
                    >
                      {link.title}
                    </Link>
                    {link.subMenu.length > 0 && (
                      <BsChevronDown className="ml-2" />
                    )}
                  </div>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
