import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_MED = gql`
	mutation addMed($medSettings: MedInput!) {
		addMed(medSettings: $medSettings) {
			_id
			medName
			maxDailyDoses
			minTimeBetween
			remindersBool
			nextDoseDue
		}
	}
`;

export const ADD_DOSE = gql`
	mutation AddDose($doseData: DoseInput!, $mostRecentBool: Boolean!) {
		addDose(doseData: $doseData, mostRecentBool: $mostRecentBool) {
			_id
			medName
			doseDate
			doseTime
			doseLogged
		}
	}
`;

export const UPDATE_MED = gql`
	mutation UpdateMed($medData: MedUpdate!) {
		updateMed(medData: $medData) {
			_id
			medName
			maxDailyDoses
			minTimeBetween
			remindersBool
			mostRecentDose {
				_id
				doseDate
				doseLogged
				doseTime
			}
			doses {
				_id
				doseDate
				doseTime
				doseLogged
			}
		}
	}
`;

export const UPDATE_DOSE = gql`
	mutation updateDose($doseData: DoseUpdate!) {
		updateDose(doseData: $doseData) {
			_id
			doseDate
			doseTime
			doseLogged
		}
	}
`;
