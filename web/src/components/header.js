import { Link } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import React, { useState } from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';

const maybeImage = (logo) => {
	let img = null;
	if (logo && logo.image && logo.image.asset) {
		img = (
			<img
				className='max-h-10 md:max-h-24'
				src={imageUrlFor(buildImageObj(logo.image)).url()}
				alt={logo.image.alt}
			/>
		);
	}
	return img;
};

const Brand = (props) => {
	const img = maybeImage(props.navLogo);

	return img && props.replaceTitle ? (
		img
	) : (
		<h1>
			<span className='text-xl font-bold tracking-tight'>
				{props.siteTitle}
			</span>
		</h1>
	);
};

const Header = (props) => {
	const { navMenuItems } = props;
	const [isExpanded, toggleExpansion] = useState(false);

	return (
		<header id='top' className='bg-white'>
			<div className='flex flex-wrap items-center justify-between p-4 md:p-8'>
				<Link to='/'>
					<Brand {...props} />
				</Link>

				<button
					className='items-center block px-3 py-2 text-blueGrey-800 border border-white rounded md:hidden'
					onClick={() => toggleExpansion(!isExpanded)}
				>
					<svg
						className='w-3 h-3 fill-current'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>Menu</title>
						<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
					</svg>
				</button>

				<nav
					className={`${
						isExpanded ? `block` : `hidden`
					} md:text-xl md:block md:items-center w-full md:w-auto`}
				>
					{(navMenuItems || []).map((link) =>
						link.anchor ? (
							<AnchorLink
								key={link.title}
								to={`${link.route || ''}${link.anchor}`}
								title={link.title}
								className='stripped block mt-4 text-blueGrey-800 no-underline md:inline-block md:mt-0 md:ml-6'
							/>
						) : (
							<Link
								className='block mt-4 text-blueGrey-800 no-underline md:inline-block md:mt-0 md:ml-6'
								key={link.title}
								to={link.route}
							>
								{link.title}
							</Link>
						)
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
