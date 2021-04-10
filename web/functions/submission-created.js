const sanityClient = require('@sanity/client');
const client = sanityClient({
	projectId: process,env.GATSBY_SANITY_PROJECT_ID,
	dataset: process.env.GATSBY_SANITY_DATASET,
	token: process.env.GATSBY_SANITY_TOKEN,
});

exports.handler = async function (event, context, callback) {
	const { payload } = JSON.parse(event.body);
	const result = await client.create({
		_type: 'contact',
		...payload,
	});
	callback(null, {
		statusCode: 200,
	});
};
