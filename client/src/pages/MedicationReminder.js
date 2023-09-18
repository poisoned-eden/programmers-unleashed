import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../utils/queries';
import { splitDate } from '../utils/dtUtils';

import { TodayContext } from '../utils/TodayContext';

import Calendar from 'react-calendar';
import { Accordion, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import AddDoseButton from '../components/AddDoseButton';
import MedCards from '../components/MedCards';
import Reminder from '../components/Reminder'

import 'react-calendar/dist/Calendar.css';

const MedicationReminder = () => {
	// const { today, setToday } = useContext(TodayContext);
	// console.log(today);
	const dateToday = splitDate(new Date());
	
	// setToday(dateToday);
	
	// console.log(today);
	const [calendarValue, setCalendarValue] = useState(dateToday);

	const { loading: medsLoading, data: medsData, error } = useQuery(QUERY_MEDS, {
		variables: { 
			today: dateToday,
		}
	});

	if (error) console.log(error);

	if (medsLoading) return 'loading your meds info...';

	const meds = medsData?.meds || [];
	console.log(meds);

	function onChangeCalendar(nextValue) {
		console.log(nextValue);
		setCalendarValue(splitDate(nextValue));
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
								<MedCards med={med} />
							))}
						</Col>
						<div className="card2">
							<Col>
								<h3 className="taken">Medications taken on</h3>
								<Calendar onChange={onChangeCalendar} />
								<div className="reminder">
									<Reminder calendarValue = {calendarValue}/>
								</div>								
							</Col>
						</div>
					</Row>
				</Container>
			</div>
		</main>
	);
};
export default MedicationReminder;
