import React from 'react';
import { graphql } from 'gatsby';

import Hero from '../components/hero';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';

export const query = graphql`
	query PageTemplateQuery($id: String!) {
		route: sanityRoute(id: { eq: $id }) {
			slug {
				current
			}
			useSiteTitle
			page {
				...PageInfo
			}
		}
		site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
			title
			openGraph {
				title
				description
				image {
					...SanityImage
				}
			}
		}
	}
`;

const Page = (props) => {
	const { data, errors } = props;

	if (errors) {
		return (
			<Layout>
				<GraphQLErrorList errors={errors} />
			</Layout>
		);
	}

	const site = (data || {}).site;

	if (!site) {
		throw new Error(
			'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
		);
	}

	const page = data.page || data.route.page;

	const content = (page._rawContent || [])
		.filter((c) => !c.disabled)
		.map((c) => {
			let el = null;
			switch (c._type) {
				case 'hero':
					el = <Hero key={c._key} {...c} />;
					break;
				default:
					el = null;
			}
			return el;
		});

	const menuItems = page.navMenu && (page.navMenu.items || []);
	const pageTitle = data.route && !data.route.useSiteTitle && page.title;

	return (
		<Layout navMenuItems={menuItems}>
			<SEO
				title={pageTitle}
				description={site.description}
				keywords={site.keywords}
			/>
			{content}
		</Layout>
	);
};

export default Page;
