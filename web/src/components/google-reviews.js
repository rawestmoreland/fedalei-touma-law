import React from "react"
import Slider from "react-slick"
import { useStaticQuery, graphql } from "gatsby"
import { AiFillStar as Star } from "react-icons/ai"

const StarRating = ({ rating, id }) => {
  let stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating - i >= 0) {
      stars.push(
        <Star
          key={`${id}_${i}`}
          style={{ color: "orange", fontSize: "40px" }}
        />
      )
    }
  }
  return <div className="flex justify-center mb-4 mt-2">{stars}</div>
}

const GoogleReviews = props => {
  const data = useStaticQuery(graphql`
    query RatingsQuery {
      allGoogleReview {
        edges {
          node {
            id
            body
            rating
          }
        }
      }
    }
  `)

  const reviews = data.allGoogleReview.edges

  const settings = {
    className: "react__slick__slider__parent",
    infinite: true,
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slideToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 15000,
    speed: 500,
  }

  const content = reviews.map(r => {
    r = r.node
    return (
      <div key={r.id}>
        <StarRating rating={r.rating} id={r.id} />
        <div className="mx-12 text-center font-poppins">
          <p>{r.body}</p>
        </div>
      </div>
    )
  })

  return <Slider {...settings}>{content}</Slider>
}

export default GoogleReviews
