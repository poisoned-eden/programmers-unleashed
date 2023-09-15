import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_MEDS } from '../utils/queries';
import { ADD_MED } from '../utils/mutations';

import MedForm from '../components/MedForm';

import Auth from '../utils/auth';

const Profile = () => {

	//  FIXME

	const { loading, data } = useQuery(QUERY_ME);

	if (loading) {
		return <div>Loading...</div>;
	}

	const user = data.me;

	if (!user?.username) {
		return (
			<h4>
				You need to be logged in to see this. Use the navigation links
				above to sign up or log in!
			</h4>
		);
	}

	return (
		<div>
			<div className="flex-row justify-center mb-3">
				{/* <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
					Viewing {userParam ? `${user.username}'s` : 'your'}{' '}
					settings.
				</h2> */}
				{/* TODO move MedForm into modal that opens when push button to add new med */}
				<MedForm />
				{/* TODO Account Settings */}
				{/* TODO cards that show current med settings so they can be edited */}
			</div>
		</div>
	);
};

export default Profile;
