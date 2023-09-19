import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useQuery } from '@apollo/client';

import { DateTimeContext } from '../../utils/DateTimeContext';
import { QUERY_DATE } from '../../utils/queries';
import { prettyDateTime } from '../../utils/dtUtils';

function Alert(props) {
	const dateTimeContext = useContext(DateTimeContext);
	console.log('Alert');
	
	console.log(props);
	const { meds, show, setShow } = props;
	console.log(dateTimeContext.now)

	const handleClose = () => setShow(false);

	// const medication = (doses) => {
	// 	const currentTime = new Date().getTime();
	// 	const coming = doses.filter((dose) => {
	// 		const doseTime = new Date(dose.doseLogged).getTime();

	// 		return doseTime < currentTime;
	// 	});
	// 	console.log(coming);
	// 	return coming;
	// };



	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Your upcoming medication</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					

					{meds.map((med) => (
							med.nextDoseDue < dateTimeContext.now.getTime() ? (
								<div className='danger'>
									{med.medName}  at  {prettyDateTime(Number(med.nextDoseDue))}
								</div>
							) : (
								<div>
									{med.medName}  at  {prettyDateTime(Number(med.nextDoseDue))}
								</div>
							)
						)
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}

export default Alert;
