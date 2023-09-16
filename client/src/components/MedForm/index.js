import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { ADD_MED, UPDATE_MED } from "../../utils/mutations";
import { FIND_ME } from "../../utils/queries";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

const MedForm = (props) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [addMed] = useMutation(ADD_MED);
  const [updateMed] = useMutation(UPDATE_MED);

  const handleChange = (event) => {
    const { name, value } = event.target;
    props.setMedFormData({ ...props.medFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log(props.medFormData);

    try {
      console.log(props.mutation);

      if (props.mutation === "ADD_MED") {
        const { data } = await addMed({
          variables: { medSettings: props.medFormData },
        });

        console.log("med added");
        console.log(data.addMed);
        setIsUpdated(true);

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
        <Button type="sumbit" onClick={handleFormSubmit}>
          Add Medication
        </Button>
      </Form>
    </div>
  );
};

export default MedForm;
