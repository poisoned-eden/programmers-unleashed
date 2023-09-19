import React, { useState, useContext } from 'react';
import { useQuery, useMutation, makeVar } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';
import { splitDate, addMinTimeBetween, splitTime, splitDateTime, prettyDateTime } from '../../utils/dtUtils';
import Calendar from 'react-calendar';
import { Container, Row, Col, Card, Button, Accordion, ListGroup, ButtonGroup } from 'react-bootstrap';
import { DateTimeContext, TodayContext } from '../../utils/DateTimeContext';
import AddDoseButton from '../AddDoseButton';
import 'react-calendar/dist/Calendar.css';
import { forEach } from 'lodash';

const MedCards = ({ med }) => {
	const dateTimeContext = useContext(DateTimeContext);
	// TODO add card for if no meds
	const past24hr = makeVar([]);
	// console.log('MedCards')
	const { _id, medName, maxDailyDoses, minTimeBetween, remindersBool, nextDoseDue, mostRecentDose, doses } = med;

	for (const key in doses) {
		// getTime of dose
		const doseMs = new Date(doses[key].doseLogged).getTime(); // TODO consider adding ms field to dose
		// console.log(doses[key].doseLogged);
		// console.log(doseMs)
		// console.log('doseMs ' + doseMs);

		if (doseMs > ( dateTimeContext.now.getTime() * (24 * 60 * 60 * 1000))) { // 24hr
			// put into array

			past24hr([...past24hr(), doses[key]]);
			// console.log(past24hr());
		}
		// console.log(doses[key]);
	}

	const numDosesToday = past24hr().length || 0;

	return (
		<Card className="card3" key={_id}>
			<i class="gg-pill"></i>
			<Card.Title>{medName}</Card.Title>
			<Card.Body>
				<span className="medication-icon"></span>
				<ListGroup variant="flush">
					<i class="gg-edit-contrast"></i>
					<ListGroup.Item className="dose">
						Doses today: {numDosesToday}
						{maxDailyDoses > 0 && `/${maxDailyDoses}`}
					</ListGroup.Item>
					{mostRecentDose ? (
						<>
							<ListGroup.Item>Last taken today at {mostRecentDose.doseTime}</ListGroup.Item>

							{minTimeBetween > 0 && (
								<ListGroup.Item>
									Next due: {splitTime(Number(nextDoseDue))} 
								</ListGroup.Item>
							)}
						</>
					) : (
						<></>
					)}
				</ListGroup>
				<AddDoseButton med={med} />
			</Card.Body>
			<Card.Footer>
				<Accordion className="schedule">
					<Accordion.Header>Dose schedule</Accordion.Header>
					<Accordion.Body>
						{doses ? (
							<ul>
								{doses.map((dose) => (
									<li key={dose._id}>
										{dose.doseDate} at {dose.doseTime}
									</li>
								))}
							</ul>
						) : (
							<em>Not taken in the past 24hrs'</em>
						)}
					</Accordion.Body>
				</Accordion>
			</Card.Footer>
		</Card>
	);
};

export default MedCards;
