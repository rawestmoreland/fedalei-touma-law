const sanityClient = require('@sanity/client');
const client = sanityClient({
	projectId: process.env.GATSBY_SANITY_PROJECT_ID,
	dataset: process.env.GATSBY_SANITY_DATASET,
	token: process.env.GATSBY_SANITY_TOKEN,
	useCdn: false,
});

exports.handler = async function (event, context, callback) {
	// Pulling out the payload from the body
	const { payload } = JSON.parse(event.body);

	// Checking which form has been submitted
	const isContactForm =
		payload.data.formId === 'Touma & Fedalei Contact Form';

	// Build the document JSON and submit it to SANITY
	if (isContactForm) {
		const contact = {
			_type: 'contact',
			firstname: payload.data.firstname,
			lastname: payload.data.lastname,
			email: payload.data.email,
			phone: payload.data.phone,
			message: payload.data.message,
		};

		const result = await client
			.create(contact)
			.catch((err) => console.log(err));
	}

	callback(null, {
		statusCode: 200,
	});
};
