import { gql } from '@apollo/client';

export const QUERY_MEDS = gql`
	query Meds($today: String) {
		meds(today: $today) {
			_id
			medName
			maxDailyDoses
			minTimeBetween
			remindersBool
			mostRecentTime
			mostRecentDose {
				_id
				doseDate
				doseTime
				doseLogged
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

export const QUERY_MED = gql`
	query Med($medId: ID) {
		med(medId: $medId) {
			_id
			userId
			medName
			maxDailyDoses
			minTimeBetween
			remindersBool
			mostRecentDose
			mostRecentTime
			doses {
				_id
				userId
				medId
				doseDate
				doseTime
				doseLogged
			}
		}
	}
`;

export const QUERY_ME = gql`
	query Me {
		me {
			_id
			username
			email
			password
			userMeds {
				_id
				userId
				medName
				maxDailyDoses
				minTimeBetween
				remindersBool
				mostRecentDose
				mostRecentTime
				doses {
					_id
					userId
					medId
					doseDate
					doseTime
					doseLogged
				}
			}
		}
	}
`;
