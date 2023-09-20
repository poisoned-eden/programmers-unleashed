import React, { useState, useContext, useEffect } from 'react';
import { makeVar, useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../utils/queries';

import { splitDate, splitTime } from '../utils/dtUtils';
import { DateTimeContext, DataContext } from '../utils/DateTimeContext';
import { splitDateTime } from '../utils/dtUtils';

import Calendar from 'react-calendar';
import { Accordion, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import AddDoseButton from '../components/AddDoseButton';
import MedCards from '../components/MedCards';
import Reminder from '../components/Reminder';
import Alert from '../components/Alert';

import 'react-calendar/dist/Calendar.css';

const MedicationReminder = () => {
	const { dataContext, setDataContext } = useContext(DataContext);
	const [show, setShow] = useState(true);
	const dueMeds = makeVar([]);

	function DateTimeObj(newDate) {
		this.now = newDate;
		this.date = splitDate(newDate);
		this.time = splitTime(newDate);
		this.dateTimeString = `${this.date}T${this.time}`;
		// this.ms = this.now.getTime();
		// this.msMinus24hrInt = this.ms - 24 * 60 * 60 * 1000;
		// this.minus24hrString = new Date(this.msMinus24hrInt).toString();
	}

	console.log('MedicationReminder');
	const now = new DateTimeObj(new Date());
	const [nowState, setNowState] = useState(now);
	const [dueState, setDueState] = useState(false);
	console.log(nowState);

	setInterval(() => {
		setNowState(now);
		// TODO use this interval to check for reminders required.
		dueMeds().forEach(med => {
			const minCheck = nowState.now.getTime() - (45 * 60 * 1000);
			const maxCheck = nowState.now.getTime() + (45 * 60 * 1000);
			if (med.nextDoseDue > minCheck && med.nextDoseDue < maxCheck ) {
				setShow(true);
				setDueState(true);
			}
		});
	}, 60 * 1000);

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

	for (const key in meds) {
		if (meds[key].nextDoseDue) {
			
			dueMeds([...dueMeds(), meds[key]]);
			console.log('dueMeds()');
			console.log(dueMeds());
		}
	}
	
	function onChangeCalendar(nextValue) {
		setCalendarValue(splitDate(nextValue));
		console.log(calendarValue);
	}

	return (
		<main>
			<Row>
				<DateTimeContext.Provider value={nowState}>
					<Alert meds={dueMeds()} show={show} setShow={setShow} dueState={dueState} />
					<Col sm={12} md={8}>
						<Card >
							<Card.Header>
								<h1 className="rem">Medication Reminder</h1>
							</Card.Header>
							<div className="loader-container" id="pill-image">
								<div className="loader"></div>
							</div>
							<h3 className="today">Todays Pills</h3>
							{meds.map((med) => (
								<MedCards med={med} />
							))}
						</Card>
					</Col>
					<Col>
						<Card className="card2">
								<h3 className="taken">Medications taken on</h3>
								<Calendar onChange={onChangeCalendar} value={calendarValue} />
								<hr className="cal"></hr>
							<Reminder value={calendarValue} />
						</Card>
					</Col>
				</DateTimeContext.Provider>
			</Row>
		</main>
	);
};

export default MedicationReminder;
