// Load variables from `.env` as soon as possible
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const clientConfig = require('./client-config');

const isProd = process.env.NODE_ENV === 'production';

const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
	siteMetadata: {
		title: `Touma and Fedalei LLP`,
		description: `Touma and Fedalei: Criminal Defense in South Carolina`,
		author: `Richard Westmoreland`,
		url: `https://tflawsc.com`,
	},
	plugins: [
		`gatsby-plugin-eslint`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-anchor-links`,
		`gatsby-plugin-no-index`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-tflaw`,
				short_name: `tflaw`,
				start_url: `/`,
				background_color: fullConfig.theme.colors.white,
				theme_color: fullConfig.theme.colors.green['500'],
				display: `minimal-ui`,
				icon: `src/images/tf-favicon.png`,
			},
		},
		{
			resolve: `gatsby-plugin-postcss`,
			options: {
				postCssPlugins: [
					require(`tailwindcss`)(tailwindConfig),
					require(`autoprefixer`),
					...(process.env.NODE_ENV === `production`
						? [require(`cssnano`)]
						: []),
				],
			},
		},
		{
			resolve: 'gatsby-source-sanity',
			options: {
				...clientConfig.sanity,
				token: process.env.SANITY_READ_TOKEN,
				watchMode: !isProd,
				overlayDrafts: !isProd,
			},
		},
		{
			resolve: 'gatsby-plugin-sanity-image',
			options: {
				// Sanity project info (required)
				projectId: 'kjlvm6up',
				dataset: 'production',
			},
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [
					`Cinzel\:400,500,600,700,800,900`,
					`Roboto\:200`,
					`Poppins\:200`,
				],
				display: 'swap',
			},
		},
		`gatsby-plugin-offline`,
	],
};
