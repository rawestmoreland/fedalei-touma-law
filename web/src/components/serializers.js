import React from 'react';
import MainImage from './MainImage';

const AuthorReference = ({ node }) => {
	if (node && node.author && node.author.name) {
		return <span>{node.author.name}</span>;
	}
	return <></>;
};

const serializers = {
	types: {
		authorReference: AuthorReference,
		// eslint-disable-next-line react/display-name
		mainImage: ({ node }) => <MainImage mainImage={node} />,
	},
};

export default serializers;
