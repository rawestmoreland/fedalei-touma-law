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
		title: `Gatsby Starter Tailwind`,
		description: `Gatsby starter styled with Tailwind`,
		author: `@taylorbryant`,
	},
	plugins: [
		`gatsby-plugin-eslint`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-tailwind`,
				short_name: `starter`,
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
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [
					`Cinzel`, // you can also specify font weights and styles
				],
				display: 'swap',
			},
		},
		`gatsby-plugin-offline`,
	],
};
