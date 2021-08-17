import React, { useState } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"

const ContactForm = props => {
  const [phone, setPhone] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  // Format the phone number as it's entered
  const normalizeInput = (value, previousValue) => {
    if (!value) return value
    const currentValue = value.replace(/[^\d]/g, "")
    const cvLength = currentValue.length

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue
      if (cvLength < 7)
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
        3,
        6
      )}-${currentValue.slice(6, 10)}`
    }
  }

  const handlePhoneChange = e => {
    setPhone(normalizeInput(e.target.value))
  }

  // Handles the post process to Netlify so we can access their serverless functions
  const handlePost = (formData, event) => {
    fetch(`/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "Contact TF Law", ...formData }),
    })
      .then(response => {
        navigate("/#top")
        reset()
        console.log(response)
      })
      .catch(error => {
        console.warn(error)
      })
    event.preventDefault()
  }

  return (
    <section id={props.anchor || ""} className="bg-white border-b py-8">
      <div className="container max-w-lg mx-auto m-8 p-3 lg:p-0">
        <h2 className="w-full my-2 text-5xl font-medium leading-tight text-center text-gray-800">
          {props.title}
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 bg-mine-shaft mx-auto w-64 my-0 py-0"></div>
        </div>
        {props.phone && (
          <h2 className="w-full my-2 text-5xl font-medium text-center text-gray-800 mb-4">
            <a href={`tel:+1${props.phone.replace(/[^\d+]/g, "")}`}>
              {props.phone}
            </a>
          </h2>
        )}
        <div className="w-full text-center mb-6 font-medium">
          <a
            href="https://goo.gl/maps/rRxKsaxq82kMEnxB9"
            target="_blank"
            rel="noreferrer"
          >
            <h4>819 East North Street</h4>
            <h4>Greenvile, SC 29601</h4>
          </a>
        </div>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(handlePost)}
          name="Contact TF Law"
          method="POST"
          action="/success/"
          data-netlify="true"
          netlify-honeypot="got-ya"
        >
          <input
            type="hidden"
            name="form-name"
            value="Touma & Fedalei Contact Form"
          />
          <input
            type="hidden"
            name="formId"
            value="Touma & Fedalei Contact Form"
            {...register("formId")}
          />
          <input
            type="hidden"
            name="subject"
            value={`New website form submission`}
            {...register("subject")}
          />
          <div className="flex flex-col justify-between w-full">
            <label htmlFor="firstname">
              <p>First Name</p>
              {errors.firstname && (
                <span className="text-red-500">
                  <em>This field is required</em>
                </span>
              )}
              <input
                className="border border-gray-400 mb-4 h-12 px-2 w-full font-poppins"
                name="firstname"
                {...register("firstname", { required: true })}
              />
            </label>
            <label htmlFor="lastname">
              <p>Last Name</p>
              {errors.lastname && (
                <span className="text-red-500">
                  <em>This field is required</em>
                </span>
              )}
              <input
                className="border border-gray-400 mb-4 h-12 px-2 w-full font-poppins"
                name="lastname"
                {...register("lastname", { required: true })}
              />
            </label>
          </div>
          <div className="w-full">
            <label htmlFor="email">
              <p>Email</p>
              {errors.email && (
                <span className="text-red-500">
                  <em>Please format email correctly</em>
                </span>
              )}
              <input
                className="border border-gray-400 mb-4 h-12 w-full px-2 font-poppins"
                name="email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
              />
            </label>
          </div>
          <div className="w-full">
            <label htmlFor="phone">
              <p>Phone</p>
              <input
                className="border border-gray-400 mb-4 h-12 w-full px-2 font-poppins"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
              />
            </label>
          </div>
          <div className="w-full">
            <label htmlFor="message">
              <p>Message</p>
              <textarea
                className="border border-gray-400 mb-4 w-full p-2 font-poppins"
                rows="5"
                name="message"
                {...register("message")}
              />
            </label>
          </div>
          <label
            htmlFor="got-ya"
            style={{
              position: "absolute",
              overflow: "hidden",
              clip: "rect(0 0 0 0)",
              height: "1px",
              width: "1px",
              margin: "-1px",
              padding: "0",
              border: "0",
            }}
          >
            Don’t fill this out if you're human:
            <input tabIndex="-1" name="got-ya" {...register} />
          </label>
          <div>
            <button
              type="submit"
              className="border border-gray-400 p-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
