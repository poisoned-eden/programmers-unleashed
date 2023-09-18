import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { ADD_MED, UPDATE_MED } from '../../utils/mutations';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { QUERY_MEDS, QUERY_ME } from '../../utils/queries';


const MedForm = (props) => {
	console.log('MedForm');
	
	const { mutation, _id } = props;
	console.log(props);


	const defaultFormData = {
			medName: '',
			maxDailyDoses: '0',
			minTimeBetween: '4',
			remindersBool: 'off',
		};

	const [medFormData, setMedFormData] = useState(defaultFormData);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setMedFormData({ ...medFormData, [name]: value });
		console.log(medFormData);
	};

	const [addMed] = useMutation(ADD_MED, {
		// THIS IS COMMENTED OUT BECAUSE IT WAS NOT ALLOWING THE PAGE TO RELOAD WITH NEW DATA AUTOMATICALLY
		// -------------------------------------------------------
		// update(cache, { data: { addMed } }) {
		// 	try {
		// 		console.log('now adding');
		// 		const { meds } = cache.readQuery({ query: QUERY_MEDS });

		// 		cache.writeQuery({
		// 			query: QUERY_MEDS,
		// 			data: { meds: [...meds, addMed] },
		// 		});
		// 	} catch (e) {
		// 		console.error(e);
		// 	}

		// 	const { me } = cache.readQuery({ query: QUERY_ME });
		// 	cache.writeQuery({
		// 		query: QUERY_ME,
		// 		data: { me: { ...me, userMeds: [...me.userMeds, addMed] } },
		// 	});
		// },
		refetchQueries: [{ query: QUERY_MEDS }],
	});

	const [updateMed] = useMutation(UPDATE_MED, {
		// THIS IS COMMENTED OUT BECAUSE IT WAS NOT ALLOWING THE PAGE TO RELOAD WITH NEW DATA AUTOMATICALLY
		// -------------------------------------------------------
		// update(cache, { data: { updateMed } }) {
		// 	try {
		// 		console.log('now updateing');
		// 		const { meds } = cache.readQuery({ query: QUERY_MEDS });

		// 		let index;

		// 		for (var i = 0; i < meds.length; i++) {
		// 			var note = meds[i];
		// 			if (note._id === updateMed._id) {
		// 				index = i;
		// 			}
		// 		}

		// 		const prev = meds.slice(0, index);
		// 		const after = meds.slice(index + 1);

		// 		cache.writeQuery({
		// 			query: QUERY_MEDS,
		// 			data: { meds: [...prev, updateMed, ...after] },
		// 		});

		// 		const { me } = cache.readQuery({ query: QUERY_ME });

		// 		const userprev = me.userMeds.slice(0, index);
		// 		const userafter = me.userMeds.slice(index + 1);

		// 		cache.writeQuery({
		// 			query: QUERY_ME,
		// 			data: {
		// 				me: { ...me, userMeds: [...userprev, updateMed, ...userafter] },
		// 			},
		// 		});
		// 	} catch (e) {
		// 		console.error(e);
		// 	}
		// },
		refetchQueries: [{ query: QUERY_MEDS }],
	});
	// refetchQueries: [
	//   QUERY_MEDS, // DocumentNode object parsed with gql
	//   "Meds", // Query name
	// ],

	// if (error) {
	// 	console.error(error);
	// 	return 'Sorry, there was an error adding your medication. Please try again.';
	// };

	// console.log(medFormData);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// check if form has everything (as per react-bootstrap docs)
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		console.log(medFormData);
		const medSettings = medFormData;
		console.log(medSettings);
		if (medFormData.remindersBool === 'on') {
			medSettings.remindersBool = true;
		} else {
			medSettings.remindersBool = false;
		}

		medSettings.maxDailyDoses = Number(medSettings.maxDailyDoses);
		medSettings.minTimeBetween = Number(medSettings.minTimeBetween);
		console.log(medSettings);
		
		console.log(mutation);
		try {

			if (mutation === 'ADD_MED') {
				const { data } = await addMed({
					variables: { medSettings: medSettings },
				});

				console.log('med added');
				console.log(data);

				setMedFormData(defaultFormData);
			}

			if (mutation === 'UPDATE_MED') {
				medSettings.medId = _id;
				console.log(medSettings);
				const { data } = await updateMed({
					variables: {
						medData: { ...medSettings},
					},
				});

				console.log('med updated');
				console.log(data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='medform1'>
			<h3 className='medtitle'>What's your medication?</h3>

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
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Minimum time allowed between doses in hours</Form.Label>
					<Form.Control
						type="number"
						name="minTimeBetween"
						id="minTimeBetween-input"
						value={medFormData.minTimeBetween}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Would you like reminders for this medication?</Form.Label>
					<Form.Check
						type="switch"
						name="remindersBool"
						id="remindersBool-input"
						onChange={handleChange}
						label="Reminders"
					/>
				</Form.Group>
				{mutation === 'ADD_MED' ? (
					<Button type="sumbit" onClick={handleFormSubmit}>
						Add Medication
					</Button>
				) : (
					<Button type="sumbit" onClick={handleFormSubmit}>
						Update Medication
					</Button>
				)}
			</Form>
		</div>
	);
};

export default MedForm;
