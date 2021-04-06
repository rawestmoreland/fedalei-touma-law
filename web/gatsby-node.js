async function createLandingPages(
	pathPrefix = '/',
	graphql,
	actions,
	reporter
) {
	const { createPage } = actions;
	const result = await graphql(`
		{
			allSanityRoute(
				filter: {
					slug: { current: { ne: null } }
					page: { id: { ne: null } }
				}
			) {
				edges {
					node {
						id
						slug {
							current
						}
					}
				}
			}
		}
	`);

	if (result.errors) throw result.errors;

	const routeEdges = (result.data.allSanityRoute || {}).edges || [];
	routeEdges.forEach((edge) => {
		const { id, slug = {} } = edge.node;
		const path = [pathPrefix, slug.current, '/'].join('');
		reporter.info(`Creating landing page: ${path}`);
		createPage({
			path,
			component: require.resolve('./src/templates/page.js'),
			context: { id },
		});
	});
}

exports.createPages = async ({ graphql, actions, reporter }) => {
	await createLandingPages('/', graphql, actions, reporter);
};
