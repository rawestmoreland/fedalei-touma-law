import { format, distanceInWords, differenceInDays } from 'date-fns';
import React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import PortableText from './portableText';
import AuthorList from './author-list';
import Container from './container';
import serializers from './serializers';

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
				<div className='w-screen'>
					<img
						src={imageUrlFor(buildImageObj(mainImage))
							.width(1200)
							.height(Math.floor((9 / 16) * 1200))
							.fit('crop')
							.auto('format')
							.url()}
						alt={mainImage.alt}
						className='w-full'
					/>
				</div>
			)}
			<Container>
				<div className='md:grid md:grid-cols-4 md:gap-8'>
					<div className='md:col-span-3'>
						<h1 className='text-3xl font-bold my-4'>{title}</h1>
						<div className='blog-content font-poppins text-sm md:text-base'>
							{_rawBody && (
								<PortableText
									blocks={_rawBody}
									serializers={{ serializers }}
								/>
							)}
						</div>
					</div>
					<aside>
						{publishedAt && (
							<div className='text-sm mt-8 mb-12'>
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
											'MMMM do, yyyy'
									  )}
							</div>
						)}
						{authors && (
							<AuthorList items={authors} title='Authors' />
						)}
						{categories.length > 0 && (
							<div>
								<h3 className='mb-4'>Categories</h3>
								<ul>
									{categories.map((category) => (
										<li key={category._id}>
											{category.title}
										</li>
									))}
								</ul>
							</div>
						)}
					</aside>
				</div>
			</Container>
		</article>
	);
}

export default BlogPost;
