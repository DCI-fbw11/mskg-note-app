import React, { Component } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import ColorPicker from "./ColorPicker";

class EditNoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    const { noteID, userNotesObject } = props;

    let note;
    if (noteID) {
      if (userNotesObject[noteID]) {
        note = userNotesObject[noteID];
      } else {
        note = {};
      }
    }
    return { ...note };
  }

  deleteNote = () => {
    const { firestore, userID, noteID } = this.props;

    firestore.delete({
      collection: "notes",
      doc: userID,
      subcollections: [{ collection: "notes", doc: noteID }]
    });
    this.close();
  };

  close = () => {
    this.props.editNoteModalClose();
  };

  saveAndClose = note => {
    const editedNote = {
      type: note.type,
      title: this.refs.title.value,
      text: this.refs.text.value,
      createdAt: note.createdAt,
      editedAt: new Date(),
      pinned: note.pinned,
      color: note.color
    };
    this.props.editNoteModalSaveAndClose(editedNote);
  };

  changeColor = color => {
    this.setState({ color });
  };

  render() {
    return (
      <div>
        <Modal
          size="lg"
          show={this.props.editNoteModalShow}
          onHide={this.close}
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" />
            <InputGroup className="mb-3">
              <FormControl
                placeholder="note title"
                aria-label="note title"
                aria-describedby="basic-addon1"
                name="title"
                ref="title"
                defaultValue={this.state.title}
              />
            </InputGroup>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                name="text"
                ref="text"
                defaultValue={this.state.text}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <ColorPicker changeColor={this.changeColor} />
            <Button variant="danger" onClick={this.deleteNote}>
              <i className="fa fa-trash" />
            </Button>
            <Button
              variant="success"
              onClick={() => this.saveAndClose(this.state)}
            >
              Save & Close
            </Button>
          </Modal.Footer>
        </Modal>
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
)(EditNoteModal);
