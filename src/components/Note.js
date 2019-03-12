import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import uuid from "uuid";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import EditNoteModal from "./EditNoteModal";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

  modalOpen = () => {
    this.setState({ modalShow: true });
  };

  modalClose = e => {
    this.setState({ modalShow: false });
  };

  modalSaveAndClose = editedNote => {
    const { firestore, userID, note } = this.props;

    firestore.update(
      {
        collection: "notes",
        doc: userID,
        subcollections: [{ collection: "notes", doc: note.id }]
      },
      editedNote
    );

    this.setState({ modalShow: false });
  };

  render() {
    let { note } = this.props;

    return (
      <div>
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
              className="note-btn float-right"
              size="sm"
              variant="outline-dark"
              onClick={this.modalOpen}
            >
              <i className="fa fa-edit" />
            </Button>
          </Card.Body>
        </Card>
        <EditNoteModal
          editNoteModalShow={this.state.modalShow}
          editNoteModalClose={this.modalClose}
          editNoteModalSaveAndClose={this.modalSaveAndClose}
          noteID={note.id}
        />
      </div>
    );
  }
}

export default compose(
  withFirestore,
  connect(state => ({
    userNotes: state.firestore.ordered.userNotes,
    userNotesObject: state.firestore.data.userNotes,
    userID: state.firebase.auth.uid
  }))
)(Note);
