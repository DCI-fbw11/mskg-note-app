import React from "react";
import { Card, Button } from "react-bootstrap";
import uuid from "uuid";

const Note = props => {
  let { note, editNote } = props;

  return (
    <Card style={{ width: "20rem" }} key={uuid()} className="m-3">
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.text}</Card.Text>
        <Button size="sm" variant="light" onClick={() => editNote(note.id)}>
          <i className="fa fa-edit" /> Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Note;
