import React, { useState } from "react";
import { useQuery, useMutation, makeVar } from "@apollo/client";
import { QUERY_ME, QUERY_MEDS } from "../../utils/queries";
import { ADD_DOSE } from "../../utils/mutations";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

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
import { async } from "regenerator-runtime";

// const AddDoseButton = ({ medId, maxDailyDoses, minTimeBetween }) => {
//   const [addDose, { error }] = useMutation(ADD_DOSE);

//   const getTimeArr = (maxDailyDoses, minTimeBetween) => {
//     const timeArr = [];

//     var dateCount = 0;
//     var currentDate = new Date();
//     var currentHour = new Date().getHours();

//     for (var i = 0; i < 8; i++) {
//       if (
//         currentHour > 22 ||
//         currentHour < 8 ||
//         dateCount >= parseInt(maxDailyDoses)
//       ) {
//         currentDate.setDate(currentDate.getDate() + 1);
//         currentHour = 8;
//         dateCount = 0;
//       }

//       console.log(dateCount);

const AddDoseButton = ({ med }) => {
	const [addDose, { error }] = useMutation(ADD_DOSE, {
			refetchQueries: [
			QUERY_MEDS, // DocumentNode object parsed with gql
			'Meds' // Query name
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


//       currentHour += parseInt(minTimeBetween);
//       dateCount += 1;
//     }

//     return timeArr;
//   };

	const handleChange = async (event) => {
		console.log(event.target.value);
		await setDoseTime(event.target.value);
		console.log(doseTime);
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
		// TODO set up new mutations for 'newest dose' or 'previous dose' 
		// so I can use different cache updating techniques for them both
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
    //   });
    	} catch (err) {
      		console.error(err);
    	};
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
