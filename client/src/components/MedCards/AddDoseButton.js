import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_MEDS } from '../../utils/queries';
import { ADD_DOSE } from '../../utils/mutations';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import 'react-calendar/dist/Calendar.css';

const AddDoseButton = ({ medId }) => {
	const [addDose, { error }] = useMutation(ADD_DOSE, {
			refetchQueries: [
			QUERY_MEDS, // DocumentNode object parsed with gql
			'Meds' // Query name
		],
	});

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

	const handleDoseClick = async (medId) => {
		console.log(medId);
		console.log(Date.now());
		console.log(typeof Date.now());
		try {
			const { data } = await addDose({
                variables: { 
					medId: medId,
					doseScheduled: Date.now().toString(),
					doseLogged: Date.now().toString(), 
				},
            })

			console.log(data);
		} catch (err) {
			console.error(err);
		}
	}

    if (error) return <Button onClick={() => handleDoseClick(medId)} className='btn-danger'>Log failed</Button>;

	return <Button onClick={() => handleDoseClick(medId)}>Log Dose</Button>;
};

export default AddDoseButton;
