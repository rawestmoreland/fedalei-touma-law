import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

function NotFoundPage() {
	return (
		<Layout>
			<SEO title='404: Not found' />
			<div>
				<h2 className='text-2xl font-bold inline-block my-8 p-3'>
					Page not found.
				</h2>
			</div>
		</Layout>
	);
}

export default NotFoundPage;
