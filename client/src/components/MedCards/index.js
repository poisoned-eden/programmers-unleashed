import React, { useState, useContext } from 'react';
import { useQuery, useMutation, makeVar } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';
import { splitDate, addMinTimeBetween, splitTime } from '../../utils/dtUtils';
import Calendar from 'react-calendar';
import { Container, Row, Col, Card, Button, Accordion, ListGroup, ButtonGroup } from 'react-bootstrap';
import { TodayContext } from '../../utils/TodayContext';
import AddDoseButton from '../AddDoseButton';
import 'react-calendar/dist/Calendar.css';

const MedCards = ({ med }) => {
	const { today } = useContext(TodayContext);
	const { _id, medName, maxDailyDoses, minTimeBetween, remindersBool, mostRecentDose, mostRecentTime, doses } = med;

	const numDosesToday = doses.length || 0;

	console.log(splitTime(new Date()));

	return (
		<Card className="card3" key={_id}>
			<Card.Title>{medName}</Card.Title>
			<Card.Body>
				<span className="medication-icon">Icon 1/2/3</span>
				<ListGroup variant="flush">
					<ListGroup.Item>
						Doses today: {numDosesToday}
						{maxDailyDoses > 0 && `/${maxDailyDoses}`}
					</ListGroup.Item>
					{numDosesToday > 0 ? 
						(<>
							<ListGroup.Item>Last taken Today at {mostRecentDose.doseTime}</ListGroup.Item>

							{minTimeBetween > 0 && (
								<ListGroup.Item>
									Next due: {addMinTimeBetween(mostRecentDose.doseLogged, minTimeBetween)}
								</ListGroup.Item>
							)}
						</>) : (<>
							
					</>)}

				</ListGroup>
				<AddDoseButton med={med} today={today} />
			</Card.Body>
			<Card.Footer>
				<Accordion>
					<Accordion.Header>Dose schedule</Accordion.Header>
					<Accordion.Body>
						<ul>
							{doses.map((dose) => (
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
