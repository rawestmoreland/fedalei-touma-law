import React from 'react';
import { graphql } from 'gatsby';
import {
	mapEdgesToNodes,
	filterOutDocsWithoutSlugs,
	filterOutDocsPublishedInTheFuture,
} from '../lib/helpers';
import BlogPostPreviewList from '../components/blog-post-preview-list';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import Container from '../components/container';
import { BsChevronDoubleUp as UpChevron } from 'react-icons/bs';

export const query = graphql`
	query BlogPageQuery {
		site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
			title
		}
		navMenu: sanityNavigationMenu {
			...NavMenu
		}
		posts: allSanityPost(
			limit: 6
			sort: { fields: [publishedAt], order: DESC }
			filter: {
				slug: { current: { ne: null } }
				publishedAt: { ne: null }
			}
		) {
			edges {
				node {
					id
					publishedAt
					mainImage {
						...SanityImage
						alt
					}
					title
					_rawExcerpt
					slug {
						current
					}
				}
			}
		}
	}
`;

const BlogPage = (props) => {
	const { data, errors } = props;

	if (errors) {
		return (
			<Layout>
				<GraphQLErrorList errors={errors} />
			</Layout>
		);
	}

	const site = (data || {}).site;
	const navMenu = (data || {}).navMenu;
	const postNodes = (data || {}).posts
		? mapEdgesToNodes(data.posts)
				.filter(filterOutDocsWithoutSlugs)
				.filter(filterOutDocsPublishedInTheFuture)
		: [];

	if (!site) {
		console.warn(
			'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
		);
	}

	const menuItems = navMenu && (navMenu.items || []);
	const navLogo = navMenu && (navMenu.logo || {});
	const replaceTitle = navMenu && (navMenu.replaceTitle || false);

	return (
		<Layout
			navMenuItems={menuItems}
			navLogo={navLogo}
			replaceTitle={replaceTitle}
			textWhite={false}
		>
			<SEO
				title={site.title || 'Missing title'}
				description={site.description || 'Missing description'}
				keywords={site.keywords || []}
			/>
			<Container>
				<h1 hidden>Welcome to {site.title}</h1>
				<div id='top' className=''>
					{postNodes && <BlogPostPreviewList nodes={postNodes} />}
				</div>
				<button
					id='scroll-btn'
					className='hidden fixed bottom-20 right-4 md:bottom-24 md:right-10 scroll-btn bg-white bg-opacity-80 p-1 rounded'
					title='Top'
					to='#top'
				>
					<UpChevron className='mx-auto' />
					<span className='font-bold'>To Top</span>
				</button>
			</Container>
		</Layout>
	);
};

export default BlogPage;
