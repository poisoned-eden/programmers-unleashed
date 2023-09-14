import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MED } from '../../utils/mutations';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { QUERY_MEDS } from '../../utils/queries';

const MedForm = () => {
	const [medFormData, setMedFormData] = useState({
		medName: '',
		maxDailyDoses: 0,
		minTimeBetween: 4,
		remindersBool: false,
	});

	const [addMed, { error }] = useMutation(ADD_MED, {
		update(cache, { data: { addMed } }) {
			try {
			  const { meds } = cache.readQuery({ query: QUERY_MEDS });
	  
			  cache.writeQuery({
				query: QUERY_MEDS,
				data: { meds: [addMed, ...meds] },
			  });
			} catch (e) {
			  console.error(e);
			}
		},
		refetchQueries: [
			QUERY_MEDS, // DocumentNode object parsed with gql
			'Meds' // Query name
		],
	});

	if (error) {
		console.error(error);
		return 'Sorry, there was an error adding your medication. Please try again.';
	};

	console.log(medFormData);
	

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
			console.log('form not valid');
		}

		console.log(medFormData);

		try {
			if (medFormData.remindersBool === "on") {
				setMedFormData({ ...medFormData, remindersBool: true });
			}
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
			remindersBool: false,
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
