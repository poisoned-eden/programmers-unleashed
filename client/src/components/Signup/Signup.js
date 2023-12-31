import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { Image, Card, Container, Row, Col } from 'react-bootstrap';
import Auth from '../../utils/auth';

//import { createUser } from "../utils/oneSignal";
//import { createUser } from "../utils/oneSignal";

const Signup = () => {
	const [formState, setFormState] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [addUser, { error, data }] = useMutation(ADD_USER);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);

		try {
			const { data } = await addUser({
				variables: { ...formState },
			});

			Auth.login(data.addUser.token);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			{data ? (
				<p>
					Success! You may now head <Link to="/">back to the homepage.</Link>
				</p>
			) : (
				<form onSubmit={handleFormSubmit}>
					<input
						className="form-input"
						placeholder="Your username"
						name="username"
						type="text"
						value={formState.name}
						onChange={handleChange}
					/>
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
					<button className="btn btn-block btn-primary" style={{ cursor: 'pointer' }} type="submit">
						Submit
					</button>
				</form>
			)}

			{error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
		</>
	);
};

export default Signup;
