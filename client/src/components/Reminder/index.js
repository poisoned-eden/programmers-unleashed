import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_MED } from "../../utils/mutations";

import { ListGroup } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_BYDATE } from '../../utils/queries';

const Reminder = (props) => {
    const dateSelected = props.calendarValue

    console.log(dateSelected);

    const doseOutput = (medData) => {
        return medData
    }
  
	const { loading, data } = useQuery(QUERY_BYDATE, {
		variables: { 
			doseDate: dateSelected,
		}
	});

    if (loading) {
        return <p>It's loading ...</p>
    }

    const doses = data.dosesByDate;

  return (
    <ListGroup className="list">
    {
        doses.map(
            (dose) => {
                return <ListGroup.Item>{dose.medName} at {dose.doseTime}.</ListGroup.Item>						
            }
        )
    }	
								</ListGroup>
  )
};

export default Reminder;