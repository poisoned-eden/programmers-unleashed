import { gql } from '@apollo/client';

export const QUERY_MEDS = gql`
	query Meds {
		meds {
			_id
			medName
			maxDailyDoses
			minTimeBetween
			remindersBool
			nextDoseDue
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
			medName
			maxDailyDoses
			minTimeBetween
			remindersBool
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

export const QUERY_ME = gql`
	query Me {
		me {
			_id
			username
			email
			userMeds {
				_id
				medName
				maxDailyDoses
				minTimeBetween
				remindersBool
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
	}
`;

export const QUERY_DATE = gql`
	query dosesByDate($doseDate: String) {
		dosesByDate(doseDate: $doseDate) {
			_id
			medName
			doseDate
			doseTime
			doseLogged
		}
	}
`;
