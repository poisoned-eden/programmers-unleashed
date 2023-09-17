import React, { useState } from 'react';
import { useQuery, useMutation, makeVar } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import  timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import {
	Container,
	Row,
	Col,
	Card,
	Button,
	ButtonGroup,
	SplitButton,
	InputGroup,
	Form,
} from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';

const AddDoseButton = ({ med }) => {
	const [addDose, { error }] = useMutation(ADD_DOSE, {
		refetchQueries: [
			QUERY_MEDS, // DocumentNode object parsed with gql
			'Meds', // Query name
		],
	});

	const [doseTime, setDoseTime] = useState(dayjs().format('HH:mm'));

	const { _id, minTimeBetween, maxDailyDoses, doses, mostRecentTime } = med;

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

	const handleChange = (event) => {
		console.log(event.target.value);
		setDoseTime(event.target.value);
	};

	const handleDoseClick = async () => {
		const logTime = dayjs(doseTime, 'HH:mm');
		const scheduleTime = dayjs(doseTime, 'HH:mm').add(minTimeBetween, 'h');
		console.log(logTime);
		console.log(scheduleTime);
		let medMostRecent = logTime;
		if (mostRecentTime && mostRecentTime > logTime) {
			medMostRecent = mostRecentTime;
		}
		console.log(dayjs(doseTime, 'HH:mm'));
		try {
			const { data } = await addDose({
				variables: {
					medId: _id,
					doseLogged: dayjs(doseTime, 'HH:mm').toDate(),
					// doseScheduled: scheduleTime.toDate(),
					mostRecentTime: medMostRecent,
				},
			});

			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	if (error)
		return (
			<Button onClick={() => handleDoseClick(_id)} className="btn-danger">
				Log failed
			</Button>
		);

	return (
		<InputGroup>
			<Button onClick={handleDoseClick}>Log now</Button>
			<Form.Control
				aria-label="The time of the dose"
				type="time"
				value={doseTime}
				onChange={handleChange}
			/>
			<Button onClick={handleDoseClick}>Log at time</Button>
		</InputGroup>
	);
};

export default AddDoseButton;
