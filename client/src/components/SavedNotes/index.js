import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { REMOVE_NOTE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

//import { createNotification } from "../../utils/oneSignal";

const SavedNotes = () => {
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    email: "",
    savedNotes: [],
  });

  const { data } = useQuery(QUERY_ME, {
    onCompleted: () => {
      setUserData(data.me);
    },
  });

  console.log(userData);

  const [removeNote, { data: updatedData }] = useMutation(REMOVE_NOTE, {
    onCompleted: () => {
      setUserData(updatedData.removeNote);
    },
  });

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteNote = async (noteId) => {
    try {
      console.log(noteId);

      const { data } = await removeNote({
        variables: {
          noteId: noteId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved notes!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedNotes.length
            ? `Viewing ${userData.savedNotes.length} saved ${
                userData.savedNotes.length === 1 ? "note" : "notes"
              }:`
            : "You have no saved notes!"}
        </h2>

        <Row>
          {userData.savedNotes.map((note) => {
            return (
              <Col md="4">
                <Card key={note._id} border="dark">
                  <Card.Body>
                    <Card.Title>Title: {note.title}</Card.Title>
                    <Card.Text>Medicine: {note.medicine}</Card.Text>
                    <Card.Text>Start time: {note.startTime}</Card.Text>
                    <Card.Text>Period: {note.period}</Card.Text>
                    <Card.Text>Number of time: {note.numberOfTime}</Card.Text>
                    <Card.Text>Total: {note.total}</Card.Text>

                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteNote(note._id)}
                    >
                      Delete this Note!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedNotes;
