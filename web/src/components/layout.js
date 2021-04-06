import PropTypes from 'prop-types';
import React from 'react';

import Header from './header';

function Layout(props) {
	const { children, navMenuItems, siteTitle } = props;

	return (
		<div className='flex flex-col min-h-screen font-cinzel text-gray-900'>
			<Header navMenuItems={navMenuItems} siteTitle={siteTitle} />

			<main className='flex-1 w-full'>{children}</main>

			<footer className='bg-transparent'>
				<nav className='flex justify-between max-w-4xl p-4 mx-auto text-sm md:p-8'>
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

					<p className='text-blueGrey-800'>
						&copy; Touma & Fedalei LLP 2021
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
