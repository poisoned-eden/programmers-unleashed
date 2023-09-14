import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MED } from '../../utils/mutations';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const MedForm = () => {
	const [medFormData, setMedFormData] = useState({
		medName: '',
		maxDailyDoses: 0,
		minTimeBetween: 4,
		remindersBool: true,
	});

	const [addMed] = useMutation(ADD_MED);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setMedFormData({ ...medFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// check if form has everything (as per react-bootstrap docs)
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		console.log(medFormData);

		try {
			const { data } = await addMed({
				variables: { medSettings: medFormData },
			});

			console.log('med added');
			console.log(data);
		} catch (err) {
			console.error(err);
		}

		setMedFormData({
			medName: '',
			maxDailyDoses: 0,
			minTimeBetween: 4,
			remindersBool: true,
		});
	};

	return (
		<div>
			<h3>What's your medication?</h3>

			<Form>
				<Form.Group>
					<Form.Label>Medication Name</Form.Label>
					<Form.Control
						type="text"
						name="medName"
						id="medName-input"
						value={medFormData.medName}
						onChange={handleChange}
						placeholder="Enter the medication name"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Maximum doses per day</Form.Label>
					<Form.Control
						type="number"
						name="maxDailyDoses"
						id="maxDailyDoses-input"
						value={medFormData.maxDailyDoses}
						onChange={handleChange}
						placeholder="0"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Minimum time allowed between doses</Form.Label>
					<Form.Control
						type="number"
						name="minTimeBetween"
						id="minTimeBetween-input"
						value={medFormData.minTimeBetween}
						onChange={handleChange}
						placeholder="4"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Would you like reminders for this medication?
					</Form.Label>
					<Form.Check
						type="switch"
						name="remindersBool"
						id="remindersBool-input"
						value={medFormData.remindersBool}
						onChange={handleChange}
						label="Reminders"
					/>
				</Form.Group>
				<Button type="sumbit" onClick={handleFormSubmit}>
					Add Medication
				</Button>
			</Form>
		</div>
	);
};

export default MedForm;
