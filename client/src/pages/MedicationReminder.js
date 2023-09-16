import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../utils/queries';
import dayjs from 'dayjs';

import MedCards from '../components/MedCards';
import Calendar from 'react-calendar';
import { Container, Row, Col, Card } from 'react-bootstrap';

import 'react-calendar/dist/Calendar.css';

const MedicationReminder = () => {
	const [calendarValue, setCalendarValue] = useState(dayjs());
	// const { loading, data } = useQuery(QUERY_ME);
	// const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);
	// if (loading) return 'loading your data...';

	const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);
	if (medsLoading) return 'loading your meds info...';

	const meds = medsData?.meds || [];
	const today = dayjs(); // gets current datetime
	// TODO move all this to makeVar
	let timeframe = '';
	if (calendarValue.isBefore(today, 'date')) {
		timeframe = 'past';
		console.log(timeframe);
	} else if (calendarValue.isAfter(today, 'date')) {
		timeframe = 'future';
		console.log(timeframe);
	} else {
		timeframe = 'today';
		console.log(timeframe);
	}

	function onChangeCalendar(nextValue) {
		setCalendarValue(dayjs(nextValue));
		console.log(calendarValue);
		console.log(typeof calendarValue);
		
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
						<MedCards meds={meds} calendarValue={calendarValue} today={today} />
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
