import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';

import Calendar from 'react-calendar';
import { Container, Row, Col, Card } from 'react-bootstrap';

import 'react-calendar/dist/Calendar.css';

const MedCards = (props) => {

	console.log(props)
	const { meds } = props;

	console.log(meds);
	console.log(meds[0].doses);
	
	return (
		<>	
			{meds.map((med) => 
				<Card key={med._id}>
					<Card.Title>
						{med.medName}	
					</Card.Title>
					<Card.Body>
						{/* TODO add med.icon properly */}
						<span className="medication-icon"></span>
							{med.doses.map((dose) => 
						<ul key={dose._id}>
								<li>Scheduled:{dose.doseScheduled}</li>
								<li>Logged:{dose.doseLogged}</li>
						</ul>
							)}
					</Card.Body>
				</Card>
			)}

		</>
	)
};

export default MedCards;
