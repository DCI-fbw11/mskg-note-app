import React from "react";
import { Card, Button } from "react-bootstrap";
import uuid from "uuid";

const List = props => {
  let { note, editList } = props;

  return (
    <div>
    <Card style={{ width: "20rem" }} key={uuid()} className="m-3">
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        
          <ul>
          {note.list.map((listItem, index) => {
            if (listItem) {
              return (
                <li style={listItem.isDone? {"textDecoration": "line-through"}:null} key={uuid()}>{listItem.text}</li>
              );
            } else {
              return null;
            }
          })}
          </ul>
        
        <Button size="sm" variant="light" onClick={() => editList(note.id)}>
          <i className="fa fa-edit" /> Edit
        </Button>
      </Card.Body>
    </Card>
    </div>
  );
};

export default List;
