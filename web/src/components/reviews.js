import React from "react"
import GoogleReviews from "./google-reviews"

const Reviews = props => {
  return (
    <section id={props.anchor} className="bg-white border-b py-8">
      <div className="container mx-w-lg mx-auto p-3 lg:p-0">
        <h2 className="w-full my-2 text-5xl font-medium leading-tight text-center text-gray-800">
          {props.title}
        </h2>
        <GoogleReviews title={props.title} />
      </div>
    </section>
  )
}

export default Reviews
