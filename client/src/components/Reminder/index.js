import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_DATE } from '../../utils/queries';

import { ListGroup } from 'react-bootstrap';

const Reminder = (props) => {
	const { loading, data, error } = useQuery(QUERY_DATE, {
		variables: {
			doseDate: props.value,
		},
	});

	if (error) console.log(error);

	if (loading) return <p>loading your doses info...</p>;

	return (
		<ListGroup className="list">
			{data.dosesByDate.map((dose) => {
				return (
					<>
						<ListGroup.Item>
							{dose.medName} at {dose.doseTime}.
						</ListGroup.Item>
						<hr></hr>
					</>
				);
			})}
		</ListGroup>
	);
};

export default Reminder;
