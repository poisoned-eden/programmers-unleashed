import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../utils/queries';

import MedCards from '../components/MedCards';
import Calendar from 'react-calendar';
import { Container, Row, Col, Card } from 'react-bootstrap';

import 'react-calendar/dist/Calendar.css';

const MedicationReminder = () => {
	const [calendarValue, setCalendarValue] = useState(new Date());
	// const { loading, data } = useQuery(QUERY_ME);
	// const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);
	// if (loading) return 'loading your data...';

	const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);
	if (medsLoading) return 'loading your meds info...';

	const meds = medsData?.meds || [];


	function onChangeCalendar(nextValue) {
		setCalendarValue(nextValue);
		console.log(calendarValue);
	};

	return (
		<main>
			<Container>
				<header>
					<h1>Medication Reminder</h1>
				</header>
				<Row>
					<Col>
						<div className="loader-container" id="pill-image">
							<div className="loader"></div>
						</div>
						<MedCards meds={meds}/>

						<ul className="medication-list">
							<li>
								Medication Type 2
								<span className="medication-icon">Icon 2</span>
							</li>
							<li>
								Medication Type 3
								<span className="medication-icon">Icon 3</span>
							</li>
							{/* Add more medication types and icons as needed */}
						</ul>
					</Col>
					<Col>
						<Calendar
							onChange={onChangeCalendar}
							value={calendarValue}
						/>
						<div className="reminder">
							{/* Add reminder component here */}
							{/* Example: <ReminderComponent /> */}
						</div>
					</Col>
				</Row>
			</Container>
		</main>
	);
};

export default MedicationReminder;
