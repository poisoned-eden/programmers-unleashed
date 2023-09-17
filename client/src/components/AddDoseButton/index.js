import React, { useState } from 'react';
import { useQuery, useMutation, makeVar } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import { Button, InputGroup, Form, Alert } from 'react-bootstrap';

const AddDoseButton = ({ med, today }) => {
	const [addDose, { error }] = useMutation(ADD_DOSE, {
		refetchQueries: [
			QUERY_MEDS, // DocumentNode object parsed with gql
			'Meds', // Query name
		],
	});

	const [doseTime, setDoseTime] = useState(dayjs().format('HH:mm'));

	console.log(new Date());
	console.log(new Date().getHours());
	console.log(new Date().getMinutes());

	const { _id, minTimeBetween, maxDailyDoses, doses, mostRecentDose, mostRecentTime } = med;

	// , {
	// 	update(cache, { data: { addDose } }) {
	// 		try {
	// 		  const { doses } = cache.readQuery({ query: QUERY_MEDS });

	// 		  cache.writeQuery({
	// 			query: QUERY_MEDS,
	// 			data: { meds: [addMed, ...meds] },
	// 		  });
	// 		} catch (e) {
	// 		  console.error(e);
	// 		}
	// 	},
	// }

	const handleChange = async (event) => {
		console.log(event.target.value);
		await setDoseTime(event.target.value);
		console.log(doseTime);
	};

	const handleDoseClick = async (event) => {
		event.preventDefault();

		const hr = doseTime.split(':')[0];
		const mn = doseTime.split(':')[1];

		const doseLogged = today.setHours(hr, mn).toString();
		const doseDate = today.toString().split('T')[0];

		const doseData = {
			medId: _id,
			doseDate: doseDate,
			doseTime: doseTime,
			doseLogged: doseLogged
		}

		console.log(doseData);

		// 	const scheduleTime = dayjs(doseTime, 'HH:mm').add(minTimeBetween, 'h');
		// 	console.log(logTime);
		// 	console.log(scheduleTime);
		// 	let medMostRecent = logTime;
		// 	if (mostRecentTime && mostRecentTime > logTime) {
		// 		medMostRecent = mostRecentTime;
		// 	}
		// 	// TODO set up new mutations for 'newest dose' or 'previous dose'
		// 	// so I can use different cache updating techniques for them both
		// 	console.log(dayjs(doseTime, 'HH:mm'));
		try {
			const { data } = await addDose({
				variables: {
					doseData: doseData,
				}
			});

			console.log(data);
			//   });
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<InputGroup>
				<Button onClick={handleDoseClick}>Log now</Button>
				<Form.Control aria-label="The time of the dose" type="time" value={doseTime} onChange={handleChange} />
				<Button onClick={handleDoseClick}>Log at time</Button>
			</InputGroup>
				{error && <Alert>Logging dose failed. Please try again.</Alert>}
		</>
	);
};

export default AddDoseButton;
