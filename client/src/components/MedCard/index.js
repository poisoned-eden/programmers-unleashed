import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_MED } from "../../utils/mutations";

import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";

import MedForm from "../../components/MedForm";

const MedCard = (props) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [medFormData, setMedFormData] = useState({
    medId: props.medId,
    medName: props.medName,
    maxDailyDoses: props.maxDailyDoses,
    minTimeBetween: props.minTimeBetween,
    remindersBool: props.remindersBool,
  });

  if (!isUpdated) {
    return (
      <Container key={medFormData.medId}>
        <Card.Body>
          <Card.Title>{medFormData.medName}</Card.Title>
          <Card.Text>
            Max. daily doses: {medFormData.maxDailyDoses} times
          </Card.Text>
          <Card.Text>
            Min. time between: {medFormData.minTimeBetween} hours
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              setIsUpdated(true);
            }}
          >
            Update
          </Button>
        </Card.Body>
      </Container>
    );
  } else {
    return (
      <Container key={medFormData.medId}>
        <MedForm
          medFormData={medFormData}
          setMedFormData={setMedFormData}
          mutation="UPDATE_MED"
        />
        <Button
          variant="primary"
          onClick={() => {
            setIsUpdated(false);
          }}
        >
          Save
        </Button>
      </Container>
    );
  }
};

export default MedCard;
