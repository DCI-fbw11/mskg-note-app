import React, { Component } from "react";
import { Card } from "react-bootstrap";
import uuid from "uuid";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import EditListModal from "./EditListModal";

class List extends Component {
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

  pinNote = e => {
    e.stopPropagation();
    const { pinNote, note } = this.props;
    pinNote(note.id);
  };

  render() {
    let { note } = this.props;

    return (
      <div>
        <Card
          style={{ width: "20rem", backgroundColor: note.color }}
          className="megacard m-3"
          onClick={this.modalOpen}
        >
          <Card.Body>
            <Card.Title style={note.title === "" ? { color: "#dddddd" } : null}>
              {note.title === "" ? "no title" : note.title}
              <button
                className="fas fa-thumbtack note-btn float-right"
                onClick={this.pinNote}
              />
            </Card.Title>
            <ul>
              {note.list.map((listItem, index) => {
                if (listItem) {
                  return (
                    <li
                      style={
                        listItem.isDone
                          ? { textDecoration: "line-through" }
                          : null
                      }
                      key={uuid()}
                    >
                      {listItem.text}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          </Card.Body>
        </Card>
        <EditListModal
          editListModalShow={this.state.modalShow}
          editListModalClose={this.modalClose}
          editListModalSaveAndClose={this.modalSaveAndClose}
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
)(List);
