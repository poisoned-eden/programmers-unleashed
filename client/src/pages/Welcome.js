import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Signup from '../components/Signup/Signup';
import Login from '../components/Login/Login';
import { Nav, Tab, Tabs, Image, Card, Container, Row, Col } from 'react-bootstrap';
import frontScreenshot from '../images/frontscreenshot.jpeg';
import Auth from '../utils/auth';

//import { createUser } from "../utils/oneSignal";
//import { createUser } from "../utils/oneSignal";

const Welcome = () => {
	const [loginSignupTab, setLoginSignupTab] = useState('signup');

	const handleClick = (event) => {
		const { name, value } = event.target;

		setLoginSignupTab(value);
	};

	return (
		<main className="flex-row justify-center mb-4">
			<Container>
				<Card>
					<Row>
						<Col>
							<Image src={frontScreenshot} alt="Frontend Image" className="frontend-image" />
						</Col>
						<Col>
							<Card>
								<Card.Header>
                                    <Nav variant="tabs" defaultActiveKey="signup">
                                        <Nav.Item>Sign Up</Nav.Item>
                                        <Nav.Item>Login</Nav.Item>
                                    </Nav>
                                </Card.Header>
                                <Card.Body>
                                    <Tabs defaultActiveKey="signup">
                                        <Tab>Sign Up</Tab>   
                                        <Tab>Login</Tab>
                                    </Tabs>
                                </Card.Body>
							</Card>
						</Col>
					</Row>
				</Card>
			</Container>
		</main>
	);
};

export default Signup;
