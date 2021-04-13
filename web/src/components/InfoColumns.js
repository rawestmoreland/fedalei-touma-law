import React from 'react';
import PortableText from './portableText';

//import { getFluidGatsbyImage } from 'gatsby-source-sanity';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
//import clientConfig from '../../client-config';

const maybeImage = (image) => {
	let img = null;
	if (image && image.disabled !== true && image.asset) {
		// const fluidProps = getFluidGatsbyImage(
		// 	image.asset._id,
		// 	{ maxWidth: 350 },
		// 	clientConfig.sanity
		// );

		img = (
			<img
				className='w-full'
				src={imageUrlFor(buildImageObj(image)).url()}
				alt={image.alt}
			/>
		);
	}
	return img;
};

const InfoColumnPhoto = (props) => {
	const img = maybeImage(props.image);
	let caption = null;
	if (props.image && props.image.caption !== '') {
		caption = props.image.caption;
	}
	return (
		<div className='w-1/3'>
			{img && <div className={'w-full'}>{img}</div>}
			{caption && (
				<div className='text-center pt-2 font-bold'>{caption}</div>
			)}
		</div>
	);
};

const InfoColumnText = (props) => {
	return (
		<div className='w-1/3 text-center p-4'>
			<PortableText blocks={props.text} />
		</div>
	);
};

const InfoColumns = (props) => {
	const width = props.columns ? Math.round(props.columns / 100) : 0;
	const contentRows = (props.columns || [])
		.filter((r) => !r.disabled)
		.map((r) => {
			return r.image ? (
				<InfoColumnPhoto key={r._key} {...r} width={width} />
			) : (
				<InfoColumnText key={r._key} {...r} width={width} />
			);
		});

	return (
		<section
			id={props.anchor || ''}
			className='container mx-auto mx-8 py-8 border-b'
		>
			<div className=''>
				<h1 className='w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800'>
					{props.title}
				</h1>
				<div className='w-full mb-4'>
					<div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
				</div>
				<div className='flex items-center'>{contentRows}</div>
			</div>
		</section>
	);
};

export default InfoColumns;
