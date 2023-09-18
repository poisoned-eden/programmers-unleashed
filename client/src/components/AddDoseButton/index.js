import React, { useContext, useState } from 'react';
import { useQuery, useMutation, makeVar } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';
import { setDoseLoggedTime, splitDate, splitTime, dateTimeFormat } from '../../utils/dtUtils';
import { TodayContext } from '../../utils/TodayContext';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import { Button, InputGroup, Form, Alert } from 'react-bootstrap';

const AddDoseButton = ({ med }) => {
	const { today, setToday } = useContext(TodayContext);

	const [addDose, { error }] = useMutation(ADD_DOSE, {
		refetchQueries: ['Meds'],
		// update(cache, { data: { addDose } }) {
		// 	try {
		// 		const { doses } = cache.readQuery({ query: QUERY_MEDS });

		// 		cache.writeQuery({
		// 			query: QUERY_MEDS,
		// 			data: { meds: [addDose, ...meds] },
		// 		});
		// 	} catch (e) {
		// 		console.error(e);
		// 	}
		// },
	});

	const [doseTime, setDoseTime] = useState(splitTime());

	const { _id, minTimeBetween, maxDailyDoses, doses, mostRecentDose } = med;

	const handleChange = async (event) => {
		// console.log(event.target.value);
		await setDoseTime(event.target.value);
		// console.log(doseTime);
	};

	const handleDoseClick = async ({ event, nowBool }) => {
		event.preventDefault();
		let doseLogged = setDoseLoggedTime(doseTime);
		if (nowBool) {
			doseLogged = new Date().toISOString();
		}
		const doseDate = today;
		console.log({ doseLogged, doseDate });
		let mostRecentBool = true;
		if (mostRecentDose && doseLogged.valueOf() < mostRecentDose.doseLogged.valueOf()) {
			mostRecentBool = false;
		}

		const doseData = {
			medId: _id,
			doseDate: doseDate,
			doseTime: doseTime,
			doseLogged: doseLogged,
		};

		console.log(doseData);

		try {
			const { data } = await addDose({
				variables: {
					doseData: doseData,
					mostRecentBool: mostRecentBool,
				},
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
				<Button onClick={(event) => handleDoseClick({ event, nowBool: true })}>Log now</Button>
				<Form.Control aria-label="The time of the dose" type="time" value={doseTime} onChange={handleChange} />
				<Button onClick={(event) => handleDoseClick({ event, nowBool: false })}>Log at time</Button>
			</InputGroup>
			{error && <Alert>Logging dose failed. Please try again.</Alert>}
		</>
	);
};

export default AddDoseButton;
