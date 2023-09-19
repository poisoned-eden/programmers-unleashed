import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../utils/queries';

import { splitDate, splitTime } from '../utils/dtUtils';
import { DateTimeContext } from '../utils/DateTimeContext';
import { splitDateTime } from '../utils/dtUtils';

import Calendar from 'react-calendar';
import { Accordion, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import AddDoseButton from '../components/AddDoseButton';
import MedCards from '../components/MedCards';
import Reminder from '../components/Reminder';
import Alert from '../components/Alert';

import 'react-calendar/dist/Calendar.css';

const MedicationReminder = () => {
	function DateTimeObj(newDate) {
		this.now = newDate;
		this.date = splitDate(newDate);
		this.time = splitTime(newDate);
		this.dateTimeString = `${this.date}T${this.time}`;
		this.ms = this.now.getTime();
		this.msMinus24hrInt = this.ms - ( 24 * 60 * 60 * 1000);
		this.minus24hrString = new Date(this.msMinus24hrInt).toString();
	}

	console.log('MedicationReminder');
	const now = new DateTimeObj(new Date());
	const [nowState, setNowState] = useState(now);
	console.log(nowState);

	setInterval(() => {
		setNowState(now);
		// TODO use this interval to check for reminders required.
	}, (60 * 1000));

	const [calendarValue, setCalendarValue] = useState(nowState.date);

	const {
		loading: medsLoading,
		data: medsData,
		error,
	} = useQuery(QUERY_MEDS, {
		variables: {
			today: nowState.date,
		},
	});

	if (error) console.log(error);

	if (medsLoading) return 'loading your meds info...';

	const meds = medsData?.meds || [];
	console.log(meds);

	function onChangeCalendar(nextValue) {
		setCalendarValue(splitDate(nextValue));
		console.log(calendarValue);
	}

	return (
		<main>
			<Alert />
			<div className="card">
				<Container>
					<header>
						<h1 className="rem">Medication Reminder</h1>
					</header>
					<DateTimeContext.Provider value={nowState}>
						<Row>
							
							<Col>
								<div className="loader-container" id="pill-image">
									<div className="loader"></div>
								</div>
								<h3 className="today">Todays Pills</h3>
								{meds.map((med) => (
									<MedCards med={med} />
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
									<hr className="cal"></hr>
									<Reminder value={calendarValue} />
								</Col>
							</div>
						</Row>
					</DateTimeContext.Provider>
				</Container>
			</div>
		</main>
	);
};

export default MedicationReminder;
