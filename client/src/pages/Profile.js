import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { QUERY_ME, QUERY_MEDS } from '../utils/queries';

import MedForm from '../components/MedForm';
import MedCard from '../components/MedCard';

import Auth from '../utils/auth';

const Profile = () => {
	const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
	const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);
	
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
		<div>
			<div className="flex-row justify-center mb-3">
				{/* <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
					Viewing {userParam ? `${user.username}'s` : 'your'}{' '}
					settings.
				</h2> */}
				{/* TODO move MedForm into modal that opens when push button to add new med */}
				<MedForm mutation="ADD_MED" />
				{/* TODO Account Settings */}
				{medsData.meds.map((med) => (
					<MedCard
						medId={med._id}
						medName={med.medName}
						maxDailyDoses={med.maxDailyDoses}
						minTimeBetween={med.minTimeBetween}
						remindersBool={med.remindersBool}
					/>
				))}
			</div>
		</div>
	);
};

export default Profile;
