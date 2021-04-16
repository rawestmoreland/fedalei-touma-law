import PropTypes from 'prop-types';
import React from 'react';

import Header from './header';

function Layout(props) {
	const { children, navMenuItems, navLogo, siteTitle, replaceTitle } = props;

	return (
		<div className='flex flex-col min-h-screen font-cinzel text-gray-900'>
			<Header
				navMenuItems={navMenuItems}
				navLogo={navLogo}
				siteTitle={siteTitle}
				replaceTitle={replaceTitle}
			/>

			<main className='flex-1 w-full'>{children}</main>

			<footer className='w-full bg-transparent'>
				<nav className='flex flex-col items-center lg:flex-row lg:justify-between p-4 mx-auto text-xs lg:text-sm md:p-8'>
					<p className='text-blueGrey-800'>
						&copy; Touma & Fedalei LLP 2021
					</p>
					<p className='text-blueGrey-800'>
						Created by{` `}
						<a
							className='font-bold no-underline'
							href='https://richardawestmoreland.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							Richard Westmoreland
						</a>
					</p>
				</nav>
			</footer>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
