import React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/graphql-error-list';
import BlogPost from '../components/blog-post';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { toPlainText } from '../lib/helpers';
import { BsChevronDoubleUp as UpChevron } from 'react-icons/bs';

export const query = graphql`
	query BlogPostTemplateQuery($id: String!) {
		navMenu: sanityNavigationMenu {
			...NavMenu
		}
		post: sanityPost(id: { eq: $id }) {
			id
			publishedAt
			categories {
				_id
				title
			}
			mainImage {
				...SanityImage
				alt
			}
			title
			slug {
				current
			}
			_rawExcerpt(resolveReferences: { maxDepth: 5 })
			_rawBody(resolveReferences: { maxDepth: 5 })
			authors {
				_key
				author {
					image {
						crop {
							_key
							_type
							top
							bottom
							left
							right
						}
						hotspot {
							_key
							_type
							x
							y
							height
							width
						}
						asset {
							_id
						}
					}
					name
				}
			}
		}
		site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
			title
			keywords
			openGraph {
				title
				description
				keywords
				image {
					...SanityImage
				}
			}
		}
	}
`;

const BlogPostTemplate = (props) => {
	const { data, errors } = props;
	const post = data && data.post;
	const navMenu = (data || {}).navMenu;

	const menuItems = navMenu && (navMenu.items || []);
	const navLogo = navMenu && (navMenu.logo || {});
	const replaceTitle = navMenu && (navMenu.replaceTitle || false);

	return (
		<Layout
			navMenuItems={menuItems}
			navLogo={navLogo}
			replaceTitle={replaceTitle}
			textWhite={true}
		>
			{errors && <SEO title='GraphQL Error' />}
			{post && (
				<SEO
					title={post.title || 'Untitled'}
					description={toPlainText(post._rawExcerpt)}
					image={post.mainImage}
					keywords={data.site.keywords}
				/>
			)}

			{errors && (
				<div>
					<GraphQLErrorList errors={errors} />
				</div>
			)}

			{post && <BlogPost {...post} />}
			<button
				id='scroll-btn'
				className='hidden fixed bottom-20 right-4 md:bottom-24 md:right-10 scroll-btn bg-white bg-opacity-80 p-1 rounded'
				title='Top'
				to='#top'
			>
				<UpChevron className='mx-auto' />
				<span className='font-bold'>To Top</span>
			</button>
		</Layout>
	);
};

export default BlogPostTemplate;
