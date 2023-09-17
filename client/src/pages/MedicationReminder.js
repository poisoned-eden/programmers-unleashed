import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_THOUGHTS } from '../utils/queries';

import Calendar from 'react-calendar';
import { Container, Row, Col, Card } from 'react-bootstrap';

import 'react-calendar/dist/Calendar.css';

const MedicationReminder = () => {
	const { loading, data } = useQuery(QUERY_ME);
	const [calendarValue, setCalendarValue] = useState(new Date());

	const meds = data?.me.userMeds || [];

	function onChangeCalendar(nextValue) {
		setCalendarValue(nextValue);
		console.log(calendarValue);
	};

	if (loading) return 'loading your data...';

	return (
		<main>
			<Container>
				<div className="card">
				<header>
					<h1 className='rem'>Medication Reminder</h1>
				</header>
				<Row>
					<Col>
						<div className="loader-container" id="pill-image">
							<div className="loader"></div>
						</div>
							{meds.map((med) => 
								<Card key={med._id}>
									<Card.Title>
										{med.medName}	
									</Card.Title>
									<Card.Body>
										{/* TODO add med.icon properly */}
										<span className="medication-icon">Icon 1</span>
											{med.doses.map((dose) => 
										<ul key={dose._id}>
												<li>Scheduled:{dose.doseScheduled}</li>
												<li>Logged:{dose.doseLogged}</li>
										</ul>
											)}
									</Card.Body>
								</Card>
							)}

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
					<div className="card2">
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
					</div>
				</Row>
				</div>
			</Container>
		</main>
	);
};

export default MedicationReminder;
