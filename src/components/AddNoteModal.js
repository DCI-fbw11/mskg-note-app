import React, { Component } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

class AddNoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "text",
      title: "",
      text: "",
      editedAt: "",
      pinned: false,
      color: "white"
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state)
  };

  close = () => {
    this.props.addNoteModalClose("note");
    this.setState({ title: "", text: "" });
  };

  saveAndClose = () => {
    let note = {
      ...this.state,
      createdAt: Date.now()
    };

    this.props.addModalSaveAndClose(note, "note");
    this.setState({ title: "", text: "" });
  };

  render() {
    const { title, text } = this.state;

    return (
      <div>
        <Modal
          size="lg"
          show={this.props.addNoteModalShow}
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
                value={title}
                onChange={this.onChange}
              />
            </InputGroup>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                placeholder="enter your note here"
                name="text"
                value={text}
                onChange={this.onChange}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.saveAndClose}>
              Save & Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default AddNoteModal;
