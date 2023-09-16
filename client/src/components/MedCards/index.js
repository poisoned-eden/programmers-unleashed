import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';

import Calendar from 'react-calendar';
import { Container, Row, Col, Card, Button, Accordion, ListGroup, ButtonGroup } from 'react-bootstrap';
import AddDoseButton from './AddDoseButton';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

const MedCards = (props) => {
	console.log(props)
	const { meds, calendarValue, today } = props;


	return (
		<>
			{meds.map((med) => (
				<Card key={med._id}>
					<Card.Title>{med.medName}</Card.Title>
					<Card.Body>
						<span className="medication-icon">
							{/* @Myra-k, did I see on your previous work you want to add a few different icons for different types of medication? I think that's a good idea.  I didn't mean to delete it, sorry, just haven't managed to implement it in the meds.map.  If you find the icons and link to them at the top of this component, I can set it in the backend to make it a choice stored in the db.  From Lil */}
						</span>

						<AddDoseButton medId={med._id} />
							<Accordion flush>
								<Accordion.Item>
									<Accordion.Header>
										Dose schedule
									</Accordion.Header>
									<Accordion.Body>
							{/* {med.doses.map((dose) => (
								<ul key={dose._id}>
									<li>Scheduled: {dose.doseScheduled}</li>
									<li>Logged: {dose.doseLogged}</li>
								</ul>
							))} */}
										<ListGroup>
											<ListGroup.Item>
												<ButtonGroup>
													<Button>Scheduled: 08.00</Button>
													<Button>Logged taken: 08.45</Button>
												</ButtonGroup>
											</ListGroup.Item>
											<ListGroup.Item>
												<ButtonGroup>
													<Button>Scheduled: 12.00</Button>
													<Button>Logged taken: 13.00</Button>
												</ButtonGroup>
											</ListGroup.Item>
											<ListGroup.Item> 
												<ButtonGroup>
													<Button>Scheduled: 16.00</Button>
													{/* @Myra-k, can you please make it so that an overdue dose makes the colour change to highlight it.  Thanks, from Lil */}
													<Button>Overdue</Button>
												</ButtonGroup>
											</ListGroup.Item>
											<ListGroup.Item>
												<ButtonGroup>
													<Button>Scheduled: 20.00</Button>
													<Button disabled>Not yet due</Button>
												</ButtonGroup>
											</ListGroup.Item>
										</ListGroup>
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
					</Card.Body>
				</Card>
			))}
		</>
	);
};

export default MedCards;
