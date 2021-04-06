import React from 'react';
import PortableText from './portableText';
import clientConfig from '../../client-config';
import CTALink from './CTALink';

import { getFluidGatsbyImage } from 'gatsby-source-sanity';
const maybeImage = (illustration) => {
	let img = null;
	if (
		illustration &&
		illustration.image &&
		illustration.image.asset &&
		!illustration.disabled
	) {
		const fluidProps = getFluidGatsbyImage(
			illustration.image.asset._id,
			{ maxWidth: 960 },
			clientConfig.sanity
		);

		img = (
			<img
				className='w-screen'
				src={fluidProps.src}
				alt={illustration.image.alt}
			/>
		);
	}
	return img;
};

function Hero(props) {
	const img = maybeImage(props.illustration);
	return (
		<div className='relative w-screen h-screen mx-auto flex flex-wrap flex-col md:flex-row items-center'>
			<div className='from-transparent to-white bg-gradient-to-b sm:relative md:absolute top-0 left-0'>
				{img}
			</div>
			{/* Left col */}
			<div className='flex flex-col p-4 bg-white w-full sm:mx-auto md:mx-20 bg-opacity-60 rounded-md justify-between items-center z-50'>
				<h1 className='text-blueGrey-800 text-5xl font-bold leading-tight text-center'>
					{props.heading}
				</h1>
				<div className='leading-normal text-2xl text-center mb-8'>
					<PortableText blocks={props.tagline} />
				</div>
				{props.cta && props.cta.title && (
					<CTALink
						{...props.cta}
						buttonActionClass='mx-auto ml-4 hover:underline bg-white text-blueGray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg'
					/>
				)}
			</div>
			{/* Right col */}
			{/* <div className='w-full md:w-3/5 py-6 text-center'>{img}</div> */}
		</div>
	);
}

export default Hero;
