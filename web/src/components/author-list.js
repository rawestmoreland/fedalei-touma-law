import React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';

const AuthorList = ({ items, title }) => {
	return (
		<div className='border-b border-t'>
			<h2 className='mt-3 font-medium'>{title}</h2>
			<ul>
				{items.map(({ author, _key }) => {
					const authorName = author && author.name;
					return (
						<li key={_key} className='flex items-center my-4'>
							<div>
								<div className='avatar'>
									{author &&
										author.image &&
										author.image.asset && (
											<img
												src={imageUrlFor(
													buildImageObj(author.image)
												)
													.width(100)
													.height(100)
													.fit('crop')
													.url()}
												alt={author.image.alt || ''}
											/>
										)}
								</div>
							</div>
							<div className='ml-2'>
								<div>{authorName || <em>Missing name</em>}</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default AuthorList;
