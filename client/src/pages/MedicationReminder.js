import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../utils/queries';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import MedCards from "../components/MedCards";
import Calendar from "react-calendar";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

import "react-calendar/dist/Calendar.css";

const MedicationReminder = () => {
	const [calendarValue, setCalendarValue] = useState(dayjs());
	// const { loading, data } = useQuery(QUERY_ME);
	// const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);
	// if (loading) return 'loading your data...';

  //console.log(calendarValue);

	const { loading: medsLoading, data: medsData } = useQuery(QUERY_MEDS);

	dayjs.extend(customParseFormat);
	dayjs.extend(utc);
	console.log(dayjs().utcOffset());
	dayjs.extend(timezone);
	const zone = dayjs.tz.setDefault(dayjs.tz.guess());


	if (medsLoading) return 'loading your meds info...';

  const meds = medsData?.meds || [];
  //   const today = dayjs(); // gets current datetime
  //   // TODO move all this to makeVar
  //   let timeframe = "";
  //   if (calendarValue.isBefore(today, "date")) {
  //     timeframe = "past";
  //     console.log(timeframe);
  //   } else if (calendarValue.isAfter(today, "date")) {
  //     timeframe = "future";
  //     console.log(timeframe);
  //   } else {
  //     timeframe = "today";
  //     console.log(timeframe);
  //   }

  function onChangeCalendar(nextValue) {
    setCalendarValue(dayjs(nextValue).format("YYYY-MM-DD"));
  }

	return (
		<main>
			<Container>
				<header>
					<h1>Medication Reminder</h1>
				</header>
				<Row>
					<Col>
						<div className="loader-container" id="pill-image">
							<div className="loader"></div>
						</div>
						{meds.map((med) => <MedCards
								med={med}
								calendarValue={calendarValue}
								today={today}
								dayjs={dayjs}
								// zone={zone}
							/>
						)}
					</Col>
					<Col>
						<Calendar
							onChange={onChangeCalendar}
							value={calendarValue}
						/>
						<div className="reminder">
							{/* Add reminder component here */}
							{/* Example: <ReminderComponent /> */}
						</div>
						<h3>Medications taken on (date shown on calendar)</h3>
						<ListGroup>
							<ListGroup.Item>
								Medication 1: time logged
							</ListGroup.Item>
							<ListGroup.Item>
								Medication 2: time logged
							</ListGroup.Item>
							<ListGroup.Item>
								Medication 1: time logged
							</ListGroup.Item>
							<ListGroup.Item>
								Medication 2: time logged
							</ListGroup.Item>
							<ListGroup.Item>
								Medication 3: time logged
							</ListGroup.Item>
							<ListGroup.Item>
								Medication 3: time logged
							</ListGroup.Item>
							<ListGroup.Item>
								Medication 2: time logged
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</main>
	);
};

export default MedicationReminder;
