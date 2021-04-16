import { format, distanceInWords, differenceInDays } from 'date-fns';
import React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import PortableText from './portableText';
import AuthorList from './author-list';

function BlogPost(props) {
	const {
		_rawBody,
		authors,
		categories,
		title,
		mainImage,
		publishedAt,
	} = props;
	return (
		<article>
			{mainImage && mainImage.asset && (
				<div>
					<img
						src={imageUrlFor(buildImageObj(mainImage))
							.width(1200)
							.height(Math.floor((9 / 16) * 1200))
							.fit('crop')
							.auto('format')
							.url()}
						alt={mainImage.alt}
					/>
				</div>
			)}
			<div>
				<div>
					<h1>{title}</h1>
					{_rawBody && <PortableText blocks={_rawBody} />}
				</div>
				<aside>
					{publishedAt && (
						<div>
							{differenceInDays(
								new Date(publishedAt),
								new Date()
							) > 3
								? distanceInWords(
										new Date(publishedAt),
										new Date()
								  )
								: format(
										new Date(publishedAt),
										'MMMM Do, yyyy'
								  )}
						</div>
					)}
					{authors && <AuthorList items={authors} title='Authors' />}
					{categories && (
						<div>
							<h3>Categories</h3>
							<ul>
								{categories.map((category) => (
									<li key={category._id}>{category.title}</li>
								))}
							</ul>
						</div>
					)}
				</aside>
			</div>
		</article>
	);
}

export default BlogPost;
