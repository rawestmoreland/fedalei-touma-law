// See https://tailwindcss.com/docs/configuration for details
module.exports = {
	purge: ['./src/**/*.js'],
	// https://github.com/tailwindlabs/tailwindcss-forms
	plugins: [require('@tailwindcss/forms')],
	theme: {
		extend: {
			colors: {
				'mine-shaft': '#272727',
			},
			fontFamily: {
				sans: ['ui-sans-serif', 'system-ui'],
				serif: ['ui-serif', 'Georgia'],
				mono: ['ui-monospace', 'SFMono-Regular'],
				display: ['Oswald'],
				body: ['Open Sans'],
				cinzel: ['Cinzel', 'ui-serif', 'Georgia'],
			},
		},
	},
};
