import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../utils/queries';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import Calendar from 'react-calendar';
import { Accordion, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import AddDoseButton from '../components/AddDoseButton';
import MedCards from '../components/MedCards';

import 'react-calendar/dist/Calendar.css';

const MedicationReminder = () => {
	const [calendarValue, setCalendarValue] = useState(dayjs());
	// const { loading, data } = useQuery(QUERY_ME);
	// const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);
	// if (loading) return 'loading your data...';

	//console.log(calendarValue);

	const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);

	dayjs.extend(customParseFormat);
	dayjs.extend(utc);
	console.log(dayjs().utcOffset());
	dayjs.extend(timezone);
	const zone = dayjs.tz.setDefault(dayjs.tz.guess());

	if (medsLoading) return 'loading your meds info...';

	const meds = medsData?.meds || [];
	const today = new Date(); // gets current datetime
	console.log(today);
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
	}

	function onChangeCalendar(nextValue) {
		setCalendarValue(dayjs(nextValue).format('YYYY-MM-DD'));
	}

	return (
		<main>
			<div className="card">
				<Container>
					<header>
						<h1 className="rem">Medication Reminder</h1>
					</header>
					<Row>
						<Col>
							<div className="loader-container" id="pill-image">
								<div className="loader"></div>
							</div>
							<h3 className="today">Todays Pills</h3>
							{meds.map((med) => (
								<MedCards med={med} calendarValue={calendarValue} today={today} />
							))}
						</Col>
						<div className="card2">
							<Col>
								<h3 className="taken">Medications taken on</h3>
								<Calendar onChange={onChangeCalendar} value={calendarValue} />
								<div className="reminder">
									{/* Add reminder component here */}
									{/* Example: <ReminderComponent /> */}
								</div>
								<ListGroup className="list">
									<ListGroup.Item>Medication 1: time logged</ListGroup.Item>
									<ListGroup.Item>Medication 2: time logged</ListGroup.Item>
									<ListGroup.Item>Medication 1: time logged</ListGroup.Item>
									<ListGroup.Item>Medication 2: time logged</ListGroup.Item>
									<ListGroup.Item>Medication 3: time logged</ListGroup.Item>
									<ListGroup.Item>Medication 3: time logged</ListGroup.Item>
									<ListGroup.Item>Medication 2: time logged</ListGroup.Item>
								</ListGroup>
							</Col>
						</div>
					</Row>
				</Container>
			</div>
		</main>
	);
};

export default MedicationReminder;
