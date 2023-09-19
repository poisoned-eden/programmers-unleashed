import React, { useContext, useState } from 'react';
import { useQuery, useMutation, makeVar } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';
import { setDoseLoggedTime, splitDate, splitTime, splitDateTime, dateTimeFormat } from '../../utils/dtUtils';
import { TodayContext } from '../../utils/TodayContext';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import { Button, InputGroup, Form, Alert } from 'react-bootstrap';

const AddDoseButton = ({ med }) => {
	// const { today, setToday } = useContext(TodayContext);
	const now = new Date();
	// console.log(nowTime);
	const nowDateTime = splitDateTime(now.getTime() - now.getTimezoneOffset() * 60000);

	const [inputDateTimeValue, setInputDateTimeValue] = useState(nowDateTime);

	setInterval(() => {
		const d = new Date();
		setInputDateTimeValue(splitDateTime(d.getTime() - d.getTimezoneOffset() * 60000));
	}, 60000);

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
		// TODO update query and makeVar in cache
	});

	const { _id, medName, minTimeBetween, maxDailyDoses, doses, mostRecentDose } = med;

	const handleChange = async (event) => {
		// console.log(event.target.value);
		await setInputDateTimeValue(event.target.value);
		// console.log(doseTime);
	};

	const handleDoseClick = async ({ event, nowBool }) => {
		event.preventDefault();
		// console.log(inputDateTimeValue);

		let doseLogged = nowDateTime;

		if (!nowBool) {
			doseLogged = inputDateTimeValue;
		}

		const doseDate = doseLogged.split('T')[0];
		const doseTime = doseLogged.split('T')[1];

		console.log({ doseLogged, doseDate, doseTime });

		let mostRecentBool = true;
		if (mostRecentDose && doseLogged.valueOf() < mostRecentDose.doseLogged.valueOf()) {
			mostRecentBool = false;
		}

		const doseData = {
			medId: _id,
			medName: medName,
			doseDate: doseDate,
			doseTime: doseTime,
			doseLogged: doseLogged,
		};

		console.log({ doseData, mostRecentBool });
		//  TODO set an alert to pop up if logging in the future

		try {
			const { data, loading: doseLoading } = await addDose({
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
				<Form.Control
					aria-label="The time of the dose"
					type="datetime-local"
					value={inputDateTimeValue}
					onChange={handleChange}
				/>
				<Button onClick={(event) => handleDoseClick({ event, nowBool: false })}>Log at time</Button>
			</InputGroup>
			{error && <Alert>Logging dose failed. Please try again.</Alert>}
		</>
	);
};

export default AddDoseButton;
