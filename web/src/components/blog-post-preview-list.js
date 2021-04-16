import { Link } from 'gatsby';
import React from 'react';
import BlogPostPreview from './blog-post-preview';

const BlogPostPreviewList = (props) => {
	return (
		<div className='flex justify-center'>
			{props.title && <h2>{props.title}</h2>}
			<ul className='grid grid-cols-1 gap-8'>
				{props.nodes &&
					props.nodes.map((node) => (
						<li key={node.id}>
							<BlogPostPreview {...node} isInList />
						</li>
					))}
			</ul>
			{props.browseMoreHref && (
				<div>
					<Link to={props.browseMoreHref}>Browse more</Link>
				</div>
			)}
		</div>
	);
};

export default BlogPostPreviewList;
