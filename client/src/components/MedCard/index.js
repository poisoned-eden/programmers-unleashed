import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MED } from '../../utils/mutations';

import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

import MedForm from '../../components/MedForm';

const MedCard = (props) => {
	console.log('MedCard');
	const [isUpdated, setIsUpdated] = useState(false);
	console.log(props);
	const { _id, medName, maxDailyDoses, minTimeBetween, remindersBool } = props.med;

	if (!isUpdated) {
		return (
			<Container key={_id}>
				<Card.Body>
					<Card.Title>{medName}</Card.Title>
					<Card.Text>Max. daily doses: {maxDailyDoses} times</Card.Text>
					<Card.Text>Min. time between: {minTimeBetween} hours</Card.Text>
					<Button
						variant="primary"
						onClick={() => {
							setIsUpdated(true);
						}}
					>
						Update
					</Button>
				</Card.Body>
			</Container>
		);
	} else {
		return (
			<Container key={_id}>
				<MedForm mutation="UPDATE_MED" _id={_id} />
				{/* <Button
          variant="primary"
          onClick={() => {
            setIsUpdated(false);
          }}
        >
          Save
        </Button> */}
			</Container>
		);
	}
};

export default MedCard;
