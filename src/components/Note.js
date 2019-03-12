import React from "react";
import { Card, Button } from "react-bootstrap";
import uuid from "uuid";

const Note = props => {
  let { note, editNote } = props;

  return (
    <Card
      style={{ width: "20rem", backgroundColor: note.color }}
      key={uuid()}
      className="m-3"
    >
      <Card.Body>
        <Card.Title style={note.title === "" ? { color: "#dddddd" } : null}>
          {note.title === "" ? "no title" : note.title}
        </Card.Title>
        <Card.Text>{note.text}</Card.Text>
        <Button
          className="float-right"
          size="sm"
          variant="outline-secondary"
          onClick={() => editNote(note.id)}
        >
          <i className="fa fa-edit" />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Note;
