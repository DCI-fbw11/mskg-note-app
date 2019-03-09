import React, { Component } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

class AddNoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "text",
      title: "",
      text: "",
      createdAt: new Date(),
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

  saveAndClose = note => {
    // console.log(note)
    this.props.addNoteModalSaveAndClose(note);
    this.setState({ title: "", text: "" });
  };

  render() {
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
                value={this.state.title}
                onChange={this.onChange}
              />
            </InputGroup>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.saveAndClose(this.state)}>
              Save & Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default AddNoteModal;
