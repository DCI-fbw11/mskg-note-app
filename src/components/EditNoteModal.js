import React, { Component } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import ColorPicker from "./ColorPicker";
import moment from "moment";

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
    this.setState({
      title: this.props.userNotesObject[this.props.noteID].title,
      text: this.props.userNotesObject[this.props.noteID].text,
      color: this.props.userNotesObject[this.props.noteID].color
    });
  };

  saveAndClose = () => {
    const editedNote = {
      ...this.state,
      editedAt: Date.now()
    };
    this.props.editNoteModalSaveAndClose(editedNote);
    this.setState({ editedAt: Date.now() });
  };

  changeColor = color => {
    this.setState({ color });
  };

  render() {
    const { title, text, createdAt, editedAt, color } = this.state;

    let editedAtMoment;
    if (editedAt !== "") {
      editedAtMoment = moment(editedAt).calendar();
    }
    let createdAtMoment = moment(createdAt).calendar();

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
                value={title}
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
                value={text}
              />
            </InputGroup>
            <span className="float-right noteTimestamp">
              {editedAtMoment ? "Edited:" : "Created:"}{" "}
              {editedAtMoment ? editedAtMoment : createdAtMoment}
            </span>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: color }}>
            <ColorPicker changeColor={this.changeColor} />
            <Button variant="dark" onClick={this.deleteNote}>
              <i className="fa fa-trash" />
            </Button>
            <Button variant="dark" onClick={this.saveAndClose}>
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
