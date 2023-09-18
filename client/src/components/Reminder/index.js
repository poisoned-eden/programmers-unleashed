import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_MED } from "../../utils/mutations";

import { ListGroup } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_BYDATE } from '../../utils/queries';

import MedForm from "../../components/MedForm";

const MedCard = (props) => {
    const dateSelected = props.calendarValue

    console.log(dateSelected);

    const doseOutput = (medData) => {
        return medData
    }
  
	const { loading, data, error } = useQuery(QUERY_BYDATE, {
		variables: { 
			doseDate: dateSelected,
		}
	});

    if (loading) {
        return <p>It's loading ...</p>
    }

    console.log(doseOutput(data))

  return (
    <ListGroup className="list">
									<ListGroup.Item>Medication 1: time logged</ListGroup.Item>
									<hr></hr>
									<ListGroup.Item>Medication 2: time logged</ListGroup.Item>
									<hr></hr>
									<ListGroup.Item>Medication 1: time logged</ListGroup.Item>
									<hr></hr>
									<ListGroup.Item>Medication 2: time logged</ListGroup.Item>
									<hr></hr>
									<ListGroup.Item>Medication 3: time logged</ListGroup.Item>
									<hr></hr>
									<ListGroup.Item>Medication 3: time logged</ListGroup.Item>
									<hr></hr>
									<ListGroup.Item>Medication 2: time logged</ListGroup.Item>
								</ListGroup>
  )
};

export default MedCard;