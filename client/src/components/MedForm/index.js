import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { ADD_MED, UPDATE_MED } from "../../utils/mutations";
import { FIND_ME } from "../../utils/queries";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import { QUERY_MEDS } from '../../utils/queries';

const MedForm = (props) => {
  console.log(props.medFormData);
  const [addMed] = useMutation(ADD_MED);
  const [updateMed] = useMutation(UPDATE_MED);

  const handleChange = (event) => {
    const { name, value } = event.target;
    props.setMedFormData({ ...props.medFormData, [name]: value });
  };
	// const [addMed, { error }] = useMutation(ADD_MED, {
	// 	update(cache, { data: { addMed } }) {
	// 		try {
	// 		  const { meds } = cache.readQuery({ query: QUERY_MEDS });
	  
	// 		  cache.writeQuery({
	// 			query: QUERY_MEDS,
	// 			data: { meds: [addMed, ...meds] },
	// 		  });
	// 		} catch (e) {
	// 		  console.error(e);
	// 		}
	// 	},
	// 	refetchQueries: [
	// 		QUERY_MEDS, // DocumentNode object parsed with gql
	// 		'Meds' // Query name
	// 	],
	// });

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

    console.log(props.medFormData);
		// check if form has everything (as per react-bootstrap docs)
		// const form = event.currentTarget;
		// if (form.checkValidity() === false) {
		// 	event.preventDefault();
		// 	event.stopPropagation();
		// 	console.log('form not valid');
		// }

    try {
      console.log(props.mutation);

      if (props.mutation === "ADD_MED") {
        const { data } = await addMed({
          variables: { medSettings: props.medFormData },
        });
		// try {
		// 	if (medFormData.remindersBool === "on") {
		// 		setMedFormData({ ...medFormData, remindersBool: true });
		// 	}
		// 	const { data } = await addMed(
		// 		{
		// 			variables: { medSettings: medFormData },
		// 		},
		// 		{ 
		// 			refetchQueries: [
		// 				QUERY_MEDS, // DocumentNode object parsed with gql
		// 				'Meds' // Query name
		// 			],
		// 		}
		// 	);

        console.log("med added");
        console.log(data.addMed);

        props.setMedFormData({
          medId: "",
          medName: "",
          maxDailyDoses: "0",
          minTimeBetween: "4",
          remindersBool: "off",
        });
      }

      if (props.mutation === "UPDATE_MED") {
        const { data } = await updateMed({
          variables: {
            medData: props.medFormData,
          },
        });

        console.log("med updated");
        console.log(data.updateMed);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>What's your medication?</h3>

      <Form>
        <Form.Group>
          <Form.Label>Medication Name</Form.Label>
          <Form.Control
            type="text"
            name="medName"
            id="medName-input"
            value={props.medFormData.medName}
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
            value={props.medFormData.maxDailyDoses}
            onChange={handleChange}
            placeholder="0"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Minimum time allowed between doses in hours</Form.Label>
          <Form.Control
            type="number"
            name="minTimeBetween"
            id="minTimeBetween-input"
            value={props.medFormData.minTimeBetween}
            onChange={handleChange}
            placeholder="4"
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
        {props.mutation === "ADD_MED" ? (
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
