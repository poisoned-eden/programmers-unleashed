import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Image, Card, Container, Row, Col } from 'react-bootstrap';
import frontScreenshot from '../images/frontscreenshot.jpeg';
import Auth from '../utils/auth';

import '../index.css'; // Import the new CSS file

const Login = (props) => {
	const [formState, setFormState] = useState({ email: '', password: '' });
	const [login, { error, data }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);
		try {
			const { data } = await login({
				variables: { ...formState },
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setFormState({
			email: '',
			password: '',
		});
	};

	return (
		<main className="flex-row justify-center mb-4">
			<Container className="Container">
				<Card className="pills-background">
					<h4 className="card-header bg-dark text-light p-2">Login</h4>
					<Card.Body>
						{data ? (
							<p>
								Success! You may now head <Link to="/">back to the homepage.</Link>
							</p>
						) : (
							<form onSubmit={handleFormSubmit}>
								<input
									className="form-input"
									placeholder="Your email"
									name="email"
									type="email"
									value={formState.email}
									onChange={handleChange}
								/>
								<input
									className="form-input"
									placeholder="******"
									name="password"
									type="password"
									value={formState.password}
									onChange={handleChange}
								/>
								<button
									className="btn btn-block btn-primary"
									style={{ cursor: 'pointer' }}
									type="submit"
								>
									Submit
								</button>
							</form>
						)}

						{error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
};

export default Login;
