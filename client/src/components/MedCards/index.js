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
import { forEach } from 'lodash';

const MedCards = ({ med }) => {
	// TODO add card for if no meds
	// const { today } = useContext(TodayContext);
	const past24hr = makeVar([]);

	const { _id, medName, maxDailyDoses, minTimeBetween, remindersBool, mostRecentDose, mostRecentTime, doses } = med;

	const now = new Date(); // returns date time that's an hour early
	const nowMs = now.getTime(); // returns integer of ms
	const yesterdayMs = now - 1000 * 60 * 60 * 24;
	// console.log( 'now ' + now );
	// console.log( 'now datestring ' + now.toString() );  // returns an hour early
	// console.log( 'nowms datestring ' + new Date(nowMs).toString() ); // returns correct time
	// console.log( 'nowMs ' + nowMs);  // returns integer of ms
	// console.log( 'pastMs ' + yesterdayMs );  // returns integer of ms
	// console.log( 'pastMs string ' + new Date(yesterdayMs).toString() ); // returns correct time 1 day ago

	for (const key in doses) {
		// getTime of dose
		const doseMs = new Date(doses[key].doseLogged).getTime(); // TODO consider adding ms field to dose
		// console.log('doseMs ' + doseMs);

		if (doseMs > yesterdayMs) {
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
					<ListGroup.Item className='dose' >
					 Doses today: {numDosesToday}
						{maxDailyDoses > 0 && `/${maxDailyDoses}`}
					</ListGroup.Item>
					{mostRecentDose ? (
						<>
							<ListGroup.Item>Last taken Today at {mostRecentDose.doseTime}</ListGroup.Item>

							{minTimeBetween > 0 && (
								<ListGroup.Item>
									Next due: {addMinTimeBetween(mostRecentDose.doseLogged, minTimeBetween)}
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
				<Accordion className='schedule'>
					<Accordion.Header>Dose schedule</Accordion.Header>
					<Accordion.Body>
						{numDosesToday ? (
							<ul>
								{past24hr().map((dose) => (
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
