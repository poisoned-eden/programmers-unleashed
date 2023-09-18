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
				<Card className='pills-background'>
					<Row>
						<Col xs={12} md={8}>
							{/* <Image src={frontScreenshot} alt="Frontend Image" className="frontend-image" /> */}
							<div className="About">
								<h2>Welcome to MediMate</h2>
								<p className="mission">Your Trusted Medication Management Solution</p>
								<p className="description">
									At MediMate, we understand the vital role medications play in your health. Our mission
									is to simplify medication management, empowering you to take control of your health. We
									equip you with tools for effective and secure medication management.
								</p>
	
								<h3>Why Choose MediMate?</h3>
								<ul className="features">
									<li>
										<strong>Effortless Medication Tracking:</strong> Track all your medications
										seamlessly. No more bottle chaos or scheduling headaches. Our user-friendly platform
										ensures you never miss a dose.
									</li>
									<li>
										<strong>Personalised Medication Reminders:</strong> Life gets busy. We offer
										tailored reminders, guaranteeing timely doses.
									</li>
									<li>
										<strong>Health Insights:</strong> Stay informed about your well-being with
										insightful tracking. Monitor progress and make informed medication decisions.
									</li>
									<li>
										<strong>Data Security:</strong> Your health data is precious. At MediMate, data
										security is paramount.
									</li>
									<li>
										<strong>User-Friendly Interface:</strong> Manage your medications with ease. No tech
										expertise needed.
									</li>
								</ul>
	
								<p className="health-priority">
									Your Health, Your Priority. MediMate is here to support you on your health journey. We
									believe that managing your medications shouldn't be a hassle but a seamless part of your
									daily routine. With MediMate, you have a partner dedicated to helping you live a
									healthier life through better medication management.
								</p>
	
								<p className="commitment">
									Your health is paramount, and data security is our commitment. Join the fellow
									individuals who trust MediMate to make medication management simple, effective, and
									safe.
								</p>
	
								<p className="start-journey">Start your journey with us today!</p>
							</div>
						</Col>
						<Col xs={12} md={4}>
							<Card>
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
						</Col>
					</Row>
				</Card>
			</Container>
		</main>
	);
};

export default Login;
