import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_MEDS } from "../../utils/queries";
import { ADD_DOSE } from "../../utils/mutations";

import Calendar from "react-calendar";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Accordion,
  ListGroup,
  ButtonGroup,
} from "react-bootstrap";
import AddDoseButton from "./AddDoseButton";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

const MedCards = (props) => {
  console.log(props);
  const { meds, calendarValue, today } = props;

  return (
    <>
      {meds.map((med) => (
        <Card key={med._id}>
          <Card.Title>{med.medName}</Card.Title>
          <Card.Body>
            <span className="medication-icon">
              {/* @Myra-k, did I see on your previous work you want to add a few different icons for different types of medication? I think that's a good idea.  I didn't mean to delete it, sorry, just haven't managed to implement it in the meds.map.  If you find the icons and link to them at the top of this component, I can set it in the backend to make it a choice stored in the db.  From Lil */}
            </span>
            <AddDoseButton
              medId={med._id}
              maxDailyDoses={med.maxDailyDoses}
              minTimeBetween={med.minTimeBetween}
            />
          </Card.Body>
          <Card.Footer>
            <Accordion>
              <Accordion.Header>Dose schedule</Accordion.Header>
              <Accordion.Body>
                {med.doses.map((dose) => (
                  <ButtonGroup key={dose._id}>
                    <Button>
                      Scheduled: {dose.doseDate} {dose.doseTime} o'clock
                    </Button>
                  </ButtonGroup>
                ))}
              </Accordion.Body>
            </Accordion>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
};

export default MedCards;
