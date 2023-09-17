import React, { useState } from 'react';
import { useQuery, useMutation, makeVar } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';

import Calendar from 'react-calendar';
import { Container, Row, Col, Card, Button, Accordion, ListGroup, ButtonGroup } from 'react-bootstrap';
import AddDoseButton from '../AddDoseButton';
import 'react-calendar/dist/Calendar.css';

const MedCards = (props) => {
	const { med, calendarValue, today, dayjs, zone } = props;
	const { _id, minTimeBetween, maxDailyDoses, doses, mostRecentTime } = med;
  
	const numDosesToday = doses.count || 0;

	return (
		<Card className="card3" key={med._id}>
			<Card.Title>{med.medName}</Card.Title>
			<Card.Body>
				<span className="medication-icon">Icon 1/2/3</span>
				<ListGroup variant="flush">
					<ListGroup.Item>
						Doses today: {med.doses.count || 0}
						{med.maxDailyDoses > 0 && `/${med.maxDailyDoses}`}
					</ListGroup.Item>
					{med.mostRecentTime && (
						<>
							<ListGroup.Item>Last taken at: {dayjs(med.mostRecentTime).format('HH:mm')}</ListGroup.Item>
							<ListGroup.Item>
								Next scheduled:{' '}
								{dayjs(med.mostRecentTime, 'HH:mm').add(med.minTimeBetween, 'h').format('HH:mm')}
							</ListGroup.Item>
						</>
					)}
				</ListGroup>
				<AddDoseButton med={med} today={today} />
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
	);
};

export default MedCards;
