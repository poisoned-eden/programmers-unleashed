import React, { useState } from 'react';
import { useQuery, useMutation, makeVar } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';

import Calendar from 'react-calendar';
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Accordion,
	ListGroup,
	ButtonGroup,
} from 'react-bootstrap';
import AddDoseButton from './AddDoseButton';
import 'react-calendar/dist/Calendar.css';

const MedCards = (props) => {
	const { med, calendarValue, today, dayjs, zone } = props;
	const { _id, minTimeBetween, maxDailyDoses, doses, mostRecentTime } = med;

	const numDosesToday = doses.count || 0;

	console.log(med);
	return (
		<Card key={med._id}>
			<Card.Title>{med.medName}</Card.Title>
			<Card.Body>
				<span className="medication-icon">
					{/* @Myra-k, did I see on your previous work you want to add a few different icons for different types of medication? I think that's a good idea.  I didn't mean to delete it, sorry, just haven't managed to implement it in the meds.map.  If you find the icons and link to them at the top of this component, I can set it in the backend to make it a choice stored in the db.  From Lil */}
				</span>
				<ListGroup variant="flush">
					<ListGroup.Item>
						Doses today: {numDosesToday}
						{maxDailyDoses > 0 && `/${maxDailyDoses}`}
					</ListGroup.Item>
					{mostRecentTime && 
						<>
							<ListGroup.Item>Last taken at: {dayjs(mostRecentTime).format('HH:mm')}</ListGroup.Item>
							<ListGroup.Item>Next scheduled: {dayjs(mostRecentTime, 'HH:mm').add(minTimeBetween, 'h').format('HH:mm')}</ListGroup.Item>
						</>
					}
				</ListGroup>
				<AddDoseButton med={med} numDosesToday={numDosesToday} />
			</Card.Body>
			<Card.Footer>
				<Accordion>
					<Accordion.Header>Dose schedule</Accordion.Header>
					<Accordion.Body>
						<ul>
							{med.doses.map((dose) => (
								<li  key={dose._id}>{dayjs.utc(dose.doseLogged).tz(zone).toString()}</li>
							))}
						</ul>
					</Accordion.Body>
				</Accordion>
			</Card.Footer>
		</Card>
	);
};

export default MedCards;
