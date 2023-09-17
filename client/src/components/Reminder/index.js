import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_DOSES } from "../../utils/queries";

import { Modal, Button } from "react-bootstrap";

import dayjs from "dayjs";

const Reminder = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, data } = useQuery(QUERY_DOSES, {
    variables: { doseDate: "2023-09-18" },
  });
  if (loading) return "loading your doses info...";

  const doses = data?.dosesByDate || [];
  const dosesOutput = doses.map((med) => {
    const doseArr = med.doses;

    const newArr = doseArr
      .filter((dose) => dose.doseDate === "2023-09-18")
      .map((dose) => {
        return {
          doseDate: dose.doseDate,
          doseTime: dose.doseTime,
        };
      });

    return {
      medName: med.medName,
      doses: newArr,
    };
  });

  console.log(dosesOutput);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Button variant="primary" onClick={handleShow}>
        Open your notification
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Here is your medication today</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reminder;
