import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useQuery } from '@apollo/client';

import { QUERY_DATE } from '../../utils/queries';

function Alert(props) {
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);

	const medication = (doses) => {
		const currentTime = new Date().getTime();
		const coming = doses.filter((dose) => {
			const doseTime = new Date(dose.doseLogged).getTime();

			return doseTime > currentTime;
		});

		return coming;
	};

	const { loading, data, error } = useQuery(QUERY_DATE, {
		variables: {
			doseDate: props.value,
		},
	});

	if (error) console.log(error);

	if (loading) return <p>loading your doses info...</p>;

	setInterval(() => {
		setShow(true);
	}, 120000);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Your coming medication today</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{medication(data.dosesByDate).map((dose) => {
						return (
							<p>
								{dose.medName} at {dose.doseTime}
							</p>
						);
					})}
				</Modal.Body>
			</Modal>
		</>
	);
}

export default Alert;
