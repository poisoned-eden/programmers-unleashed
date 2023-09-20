import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { QUERY_ME, QUERY_MEDS } from '../utils/queries';

import MedForm from '../components/MedForm';
import MedCard from '../components/MedCard';

import Auth from '../utils/auth';
import { Row, Col, Card } from 'react-bootstrap';

const Profile = () => {
	const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
	const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);
	console.log('Profile');

	if (medsLoading) return <h1>loading your meds info...</h1>;

	console.log(meData);

	if (meLoading) {
		return <div>Loading...</div>;
	}

	if (medsData) console.log(medsData);

	// const user = meData.me;

	if (!meData) {
		return <Navigate to="/" />;
	}

	return (
		<Row>
			<Col md={12} lg={6} className='mb-5'>
				{/* TODO Account Settings */}
				{medsData.meds.map((med) => (
					<MedCard med={med} />
				))}
			</Col>
			<Col md={12} lg={6}>
				<MedForm mutation="ADD_MED" />
			</Col>
		</Row>
	);
};

export default Profile;
