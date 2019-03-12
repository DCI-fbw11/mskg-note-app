import React, { Component } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import ColorPicker from "./ColorPicker";

class EditNoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.userNotesObject[this.props.noteID] };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

  saveAndClose = () => {
    const editedNote = {
      ...this.state,
      editedAt: new Date()
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
                onChange={this.onChange}
                value={this.state.title}
              />
            </InputGroup>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                name="text"
                onChange={this.onChange}
                value={this.state.text}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <i
                class="fas fa-palette"
                style={{
                  fontSize: "1.6rem",
                  color: this.state.color,
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)"
                }}
              />
            </div>
            <ColorPicker changeColor={this.changeColor} />
            <Button variant="danger" onClick={this.deleteNote}>
              <i className="fa fa-trash" />
            </Button>
            <Button variant="success" onClick={this.saveAndClose}>
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
