import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Row, Container } from "react-bootstrap";
import uuid from "uuid";

import AddNoteModal from "./AddNoteModal";
import AddListModal from "./AddListModal";
import Note from "./Note";
import List from "./List";
import Spinner from "../layout/Spinner";

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNoteModalShow: false,
      addListModalShow: false
    };
  }

  // add note modal functions
  addNoteModalClose = type => {
    if (type === "note") {
      this.setState({ addNoteModalShow: false });
    } else {
      this.setState({ addListModalShow: false });
    }
  };

  addNoteModalSaveAndClose = newNote => {
    const { firestore, userID } = this.props;

    firestore.add(
      {
        collection: "notes",
        doc: userID,
        subcollections: [{ collection: "notes" }]
      },
      newNote
    );

    this.setState({ addNoteModalShow: false });
  };

  // add list modal functions
  addListModalSaveAndClose = newNote => {
    const { firestore, userID } = this.props;

    firestore.add(
      {
        collection: "notes",
        doc: userID,
        subcollections: [{ collection: "notes" }]
      },
      newNote
    );

    this.setState({ addListModalShow: false });
  };

  render() {
    let { userNotes } = this.props;

    if (userNotes) {
      return (
        <Container className="notesPage" fluid>
          <Row id="notesButtons">
            <Button
              variant="outline-success"
              className="m-2"
              onClick={() => this.setState({ addNoteModalShow: true })}
            >
              <i className="fas fa-plus" /> Add Note &nbsp;
              <i className="far fa-sticky-note" />
            </Button>
            <Button
              variant="outline-success"
              className="m-2"
              onClick={() => this.setState({ addListModalShow: true })}
            >
              <i className="fas fa-plus" /> Add List &nbsp;
              <i className="fas fa-list" />
            </Button>
          </Row>
          <Row className="notesContent mt-3">
            {userNotes
              .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
              .map(note => {
                if (note.type === "text") {
                  return (
                    <Note note={note} editNote={this.editNote} key={uuid()} />
                  );
                } else {
                  return (
                    <List note={note} editList={this.editList} key={uuid()} />
                  );
                }
              })}
          </Row>
          <AddNoteModal
            addNoteModalShow={this.state.addNoteModalShow}
            addNoteModalClose={this.addNoteModalClose}
            addNoteModalSaveAndClose={this.addNoteModalSaveAndClose}
          />
          <AddListModal
            addListModalShow={this.state.addListModalShow}
            addNoteModalClose={this.addNoteModalClose}
            addListModalSaveAndClose={this.addListModalSaveAndClose}
          />
        </Container>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(({ firebase }) => {
    return [
      {
        collection: "notes",
        doc: firebase.auth().O,
        subcollections: [{ collection: "notes" }],
        storeAs: "userNotes"
      }
    ];
  }),
  connect((state, props) => ({
    userNotes: state.firestore.ordered.userNotes,
    userNotesObject: state.firestore.data.userNotes,
    userID: state.firebase.auth.uid
  }))
)(Notes);
