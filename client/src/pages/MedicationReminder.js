import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../utils/queries';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import MedCards from '../components/AddDoseButton';
import Calendar from 'react-calendar';
import { Accordion, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import AddDoseButton from '../components/AddDoseButton';

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
	}

	return (
		<main>
			<Container>
				<div className="card">
					<header>
						<h1 className="rem">Medication Reminder</h1>
					</header>
					<Row>
						<Col>
							<div className="loader-container" id="pill-image">
								<div className="loader"></div>
							</div>
							{meds.map((med) => (
								<Card key={med._id}>
									<Card.Title>{med.medName}</Card.Title>
									<Card.Body>
										<span className="medication-icon">
											{/* @Myra-k, did I see on your previous work you want to add a few different icons for different types of medication? I think that's a good idea.  I didn't mean to delete it, sorry, just haven't managed to implement it in the meds.map.  If you find the icons and link to them at the top of this component, I can set it in the backend to make it a choice stored in the db.  From Lil */}
										</span>
										<ListGroup variant="flush">
											<ListGroup.Item>
												Doses today: {med.doses.count || 0}
												{med.maxDailyDoses > 0 && `/${med.maxDailyDoses}`}
											</ListGroup.Item>
											{med.mostRecentTime && (
												<>
													<ListGroup.Item>
														Last taken at: {dayjs(med.mostRecentTime).format('HH:mm')}
													</ListGroup.Item>
													<ListGroup.Item>
														Next scheduled:{' '}
														{dayjs(med.mostRecentTime, 'HH:mm')
															.add(med.minTimeBetween, 'h')
															.format('HH:mm')}
													</ListGroup.Item>
												</>
											)}
										</ListGroup>
										<AddDoseButton med={med} />
									</Card.Body>
									<Card.Footer>
										<Accordion>
											<Accordion.Header>Dose schedule</Accordion.Header>
											<Accordion.Body>
												<ul>
													{med.doses.map((dose) => (
														<li key={dose._id}>{dose.doseTime}</li>
													))}
												</ul>
											</Accordion.Body>
										</Accordion>
									</Card.Footer>
								</Card>
							))}
						</Col>
						<div className="card2">
							<Col>
								<Calendar onChange={onChangeCalendar} value={calendarValue} />
								<div className="reminder">
									{/* Add reminder component here */}
									{/* Example: <ReminderComponent /> */}
								</div>
								<h3>Medications taken on (date shown on calendar)</h3>
								<ListGroup>
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
				</div>
			</Container>
		</main>
	);
};

export default MedicationReminder;
