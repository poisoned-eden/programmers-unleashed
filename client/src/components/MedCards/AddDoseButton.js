import React, { useState } from "react";
import { useQuery, useMutation, makeVar } from "@apollo/client";
import { QUERY_ME, QUERY_MEDS } from "../../utils/queries";
import { ADD_DOSE } from "../../utils/mutations";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

const AddDoseButton = ({ medId, maxDailyDoses, minTimeBetween }) => {
  const [addDose, { error }] = useMutation(ADD_DOSE);

  const getTimeArr = (maxDailyDoses, minTimeBetween) => {
    const timeArr = [];

    var dateCount = 0;
    var currentDate = new Date();
    var currentHour = new Date().getHours();

    for (var i = 0; i < 8; i++) {
      if (
        currentHour > 22 ||
        currentHour < 8 ||
        dateCount >= parseInt(maxDailyDoses)
      ) {
        currentDate.setDate(currentDate.getDate() + 1);
        currentHour = 8;
        dateCount = 0;
      }

      console.log(dateCount);

const AddDoseButton = ({ medId }) => {
	const [addDose, { error }] = useMutation(ADD_DOSE, {
			refetchQueries: [
			QUERY_MEDS, // DocumentNode object parsed with gql
			'Meds' // Query name
		],
	});

      currentHour += parseInt(minTimeBetween);
      dateCount += 1;
    }

    return timeArr;
  };

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
      });
    } catch (err) {
      console.error(err);
    }
  };;

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
