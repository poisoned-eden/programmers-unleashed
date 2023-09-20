import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Button } from 'react-bootstrap';

import Auth from '../../utils/auth';

const Header = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<header className="bg-primary text-light mb-4 py-3 flex-row align-center">
			<Navbar>
				{/* <Container className="container flex-row justify-space-between-lg justify-center align-center"> */}
				<Container className="justify-center">
					<div>
						<Link className="text-light" to="/">
							<h1 className="m-0">
								Medi<span>Mate</span>
							</h1>
						</Link>
						<p className="m-0"> Your Medication, Your Time, Your Health!</p>
					</div>
					<div>
						{Auth.loggedIn() ? (
							<>
								<Link className="btn-16" to="/">
									<Button>Dashboard</Button>
								</Link>
								<Link className="btn-16" to="/me">
									<Button>{Auth.getProfile().data.username}'s profile</Button>
								</Link>

								<Button className="btn-17" onClick={logout}>
									Logout
								</Button>
							</>
						) : (
							<>
								<Link className="btn btn-lg btn-info m-2" to="/login">
									Login
								</Link>
								<Link className="btn btn-lg btn-light m-2" to="/signup">
									Signup
								</Link>
							</>
						)}
					</div>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
