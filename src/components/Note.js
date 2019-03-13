import React, { Component } from "react";
import { Card } from "react-bootstrap";
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

  pinNote = () => {
    const { pinNote, note } = this.props;
    pinNote(note.id);
  };

  render() {
    let { note } = this.props;

    return (
      <div>
        <Card
          style={{ width: "20rem", backgroundColor: note.color }}
          key={note.id}
          className="megacard m-3"
        >
          <Card.Body>
            <Card.Title style={note.title === "" ? { color: "#dddddd" } : null}>
              {note.title === "" ? "no title" : note.title}{" "}
              <i
                className="fas fa-thumbtack note-btn float-right"
                onClick={this.pinNote}
              />
            </Card.Title>
            <Card.Text onClick={this.modalOpen}>{note.text}</Card.Text>
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
