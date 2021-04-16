import { format } from 'date-fns';
import { Link } from 'gatsby';
import React from 'react';
import { buildImageObj, getBlogUrl } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import PortableText from './portableText';

function BlogPostPreview(props) {
	return (
		<Link
			className={props.isInList ? 'md:grid md:grid-cols-3 md:gap-8' : ''}
			to={getBlogUrl(props.slug.current)}
		>
			<div className='md:col-span-1'>
				{props.mainImage && props.mainImage.asset && (
					<img
						src={imageUrlFor(buildImageObj(props.mainImage))
							.width(600)
							.height(Math.floor((9 / 16) * 600))
							.auto('format')
							.url()}
						alt={props.mainImage.alt}
					/>
				)}
			</div>
			<div className='col-span-2'>
				<h3 className='mt-4 md:mt-0 mb-2 font-bold'>{props.title}</h3>
				{props._rawExcerpt && (
					<div className='font-poppins font-extralight text-sm my-2'>
						<PortableText blocks={props._rawExcerpt} />
					</div>
				)}
				<div className=''>
					{format(new Date(props.publishedAt), 'MMMM do, yyyy')}
				</div>
			</div>
		</Link>
	);
}

export default BlogPostPreview;
