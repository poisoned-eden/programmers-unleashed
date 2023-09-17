import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_MEDS } from "../../utils/queries";
import { ADD_DOSE } from "../../utils/mutations";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";

import "react-calendar/dist/Calendar.css";

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

      timeArr.push({
        medId: medId,
        doseDate: currentDate.toISOString().split("T")[0],
        doseTime: currentHour.toString(),
        doseLogged: new Date().toString(),
      });

      currentHour += parseInt(minTimeBetween);
      dateCount += 1;
    }

    return timeArr;
  };

  const handleDoseClick = async (medId) => {
    console.log(medId);
    try {
      const timeArr = getTimeArr(maxDailyDoses, minTimeBetween);
      console.log(timeArr);

      timeArr.map(async (timeData) => {
        const { data } = await addDose({
          variables: {
            doseData: timeData,
          },
        });

        console.log(data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (error)
    return (
      <Button onClick={() => handleDoseClick(medId)} className="btn-danger">
        Log failed
      </Button>
    );

  return (
    // <ButtonGroup>
    //   <Button>Last taken: 12.45</Button>
    //   <Button onClick={() => handleDoseClick(medId)}>Next due: 16.45</Button>;
    // </ButtonGroup>
    <Button onClick={() => handleDoseClick(medId)}>Log success</Button>
  );
};

export default AddDoseButton;
