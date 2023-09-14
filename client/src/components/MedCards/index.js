import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';

import Calendar from 'react-calendar';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AddDoseButton from './AddDoseButton';

import 'react-calendar/dist/Calendar.css';

const MedCards = (props) => {
	// console.log(props)
	const { meds } = props;
	// console.log(meds);

	return (
		<>
			{meds.map((med) => (
				<Card key={med._id}>
					<Card.Title>{med.medName}</Card.Title>
					<Card.Body>
						<span className="medication-icon">
							{/* TODO add med.icon properly */}
						</span>
						<div className="doses">
							{med.doses.map((dose) => (
								<ul key={dose._id}>
									<li>Scheduled:{dose.doseScheduled}</li>
									<li>Logged:{dose.doseLogged}</li>
								</ul>
							))}
							<AddDoseButton medId={med._id} />
						</div>
					</Card.Body>
				</Card>
			))}
		</>
	);
};

export default MedCards;
