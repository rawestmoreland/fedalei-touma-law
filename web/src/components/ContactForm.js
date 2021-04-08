import React from 'react';
import { navigate } from 'gatsby';
import { useForm } from 'react-hook-form';

const ContactForm = (props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm();

	// Transforms the form data from the React Hook Form output to a format Netlify can read
	const encode = (data) => {
		return Object.keys(data)
			.map(
				(key) =>
					encodeURIComponent(key) +
					'=' +
					encodeURIComponent(data[key])
			)
			.join('&');
	};

	const watchFirstname = watch('firstname', props.firstname);
	const watchLastname = watch('lastname', props.lastname);

	// Handles the post process to Netlify so we can access their serverless functions
	const handlePost = (formData, event) => {
		fetch(`/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({ 'form-name': 'contact-form', ...formData }),
		})
			.then((response) => {
				navigate('/#top');
				reset();
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
		event.preventDefault();
	};

	return (
		<section id={props.anchor || ''} className='bg-white border-b py-8'>
			<div className='container max-w-lg mx-auto m-8 p-3 lg:p-0'>
				<form
					className='flex flex-col items-center'
					onSubmit={handleSubmit(handlePost)}
					name='Contact TF Law'
					method='POST'
					action='/success/'
					data-netlify='true'
					netlify-honeypot='got-ya'
				>
					<input
						type='hidden'
						name='form-name'
						value='Touma & Fedalei Contact Form'
					/>
					<input
						type='hidden'
						name='formId'
						value='Touma & Fedalei Contact Form'
						{...register('formId')}
					/>
					<input
						type='hidden'
						name='subject'
						value={`New website form submission from ${watchFirstname} ${watchLastname}`}
						{...register('subject')}
					/>
					<div className='flex flex-col md:flex-row justify-between w-full'>
						<label htmlFor='firstname'>
							<p>First Name</p>
							{errors.firstname && (
								<span className='text-red-500'>
									<em>This field is required</em>
								</span>
							)}
							<input
								className='border border-gray-400 mb-4 h-12 px-2 w-full'
								name='firstname'
								{...register('firstname', { required: true })}
							/>
						</label>
						<label htmlFor='lastname'>
							<p>Last Name</p>
							{errors.lastname && (
								<span className='text-red-500'>
									<em>This field is required</em>
								</span>
							)}
							<input
								className='border border-gray-400 mb-4 h-12 px-2 w-full'
								name='lastname'
								{...register('lastname', { required: true })}
							/>
						</label>
					</div>
					<div className='w-full'>
						<label htmlFor='email'>
							<p>Email</p>
							{errors.email && (
								<span className='text-red-500'>
									<em>Please format email correctly</em>
								</span>
							)}
							<input
								className='border border-gray-400 mb-4 h-12 w-full px-2'
								name='email'
								{...register('email', {
									required: true,
									pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
								})}
							/>
						</label>
					</div>
					<div className='w-full'>
						<label htmlFor='message'>
							<p>Message</p>
							<textarea
								className='border border-gray-400 mb-4 w-full p-2'
								rows='5'
								name='message'
								{...register('message')}
							/>
						</label>
					</div>
					<label
						htmlFor='got-ya'
						style={{
							position: 'absolute',
							overflow: 'hidden',
							clip: 'rect(0 0 0 0)',
							height: '1px',
							width: '1px',
							margin: '-1px',
							padding: '0',
							border: '0',
						}}
					>
						Don’t fill this out if you're human:
						<input tabIndex='-1' name='got-ya' {...register} />
					</label>
					<div>
						<button
							type='submit'
							className='border border-gray-400 p-2'
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ContactForm;
