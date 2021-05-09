import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { imageUrlFor } from '../lib/image-url';
import { buildImageObj } from '../lib/helpers';

function SEO({ description, lang, meta, keywords, title }) {
	console.log(keywords);
	return (
		<StaticQuery
			query={detailsQuery}
			render={(data) => {
				const metaDescription =
					description ||
					(data.site &&
						data.site.openGraph &&
						data.site.openGraph.description) ||
					'';
				const siteTitle = (data.site && data.site.title) || '';
				const siteAuthor =
					(data.site && data.site.author && data.site.author.name) ||
					'';
				const metaImage = data.site.openGraph
					? imageUrlFor(buildImageObj(data.site.openGraph.image))
							.width(1200)
							.url()
					: '';

				const pageTitle = title || siteTitle;

				return (
					<Helmet
						htmlAttributes={{
							lang,
						}}
						title={pageTitle}
						titleTemplate={
							pageTitle === siteTitle
								? siteTitle
								: `%s | ${siteTitle}`
						}
						meta={[
							{
								name: `description`,
								content: metaDescription,
							},
							{
								property: `og:title`,
								content:
									pageTitle === siteTitle
										? siteTitle
										: `%s | ${siteTitle}`,
							},
							{
								property: `og:description`,
								content: metaDescription,
							},
							{
								property: `og:type`,
								content: `website`,
							},
							{
								property: `og:image`,
								content: metaImage,
							},
							{
								name: `twitter:card`,
								content: `summary`,
							},
							{
								name: `twitter:creator`,
								content: siteAuthor,
							},
							{
								name: `twitter:title`,
								content: pageTitle,
							},
							{
								name: `twitter:description`,
								content: metaDescription,
							},
						]
							.concat(
								keywords.length > 0
									? {
											name: `keywords`,
											content: keywords.join(`, `),
									  }
									: []
							)
							.concat(meta)}
					/>
				);
			}}
		/>
	);
}

SEO.defaultProps = {
	lang: `en`,
	keywords: [],
	meta: [],
};

SEO.propTypes = {
	description: PropTypes.string,
	keywords: PropTypes.arrayOf(PropTypes.string),
	lang: PropTypes.string,
	meta: PropTypes.array,
	title: PropTypes.string,
};

export default SEO;

const detailsQuery = graphql`
	query DefaultSEOQuery {
		site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
			title
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
