import React, { Component } from "react";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  ListGroup,
  Form
} from "react-bootstrap";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import ColorPicker from "./ColorPicker";

class EditListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.userNotesObject[this.props.noteID].type,
      title: this.props.userNotesObject[this.props.noteID].title,
      list: this.props.userNotesObject[this.props.noteID].list,
      createdAt: this.props.userNotesObject[this.props.noteID].createdAt,
      editedAt: this.props.userNotesObject[this.props.noteID].editedAt,
      pinned: this.props.userNotesObject[this.props.noteID].pinned,
      color: this.props.userNotesObject[this.props.noteID].color,
      listItemText: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  listItemOnChange = (e, index) => {
    const list = [...this.state.list];
    list[index] = { ...list[index], text: e.target.value };
    this.setState({ list: [...list] });
  };

  addListItem = e => {
    e.preventDefault();
    let newListItem = {
      text: this.state.listItemText,
      isDone: false
    };

    this.setState({
      list: [...this.state.list, newListItem],
      listItemText: ""
    });
  };

  deleteListItem = index => {
    this.setState({
      list: [
        ...this.state.list.filter(
          listItem => this.state.list.indexOf(listItem) !== index
        )
      ]
    });
  };

  checkListItem = index => {
    let list = [...this.state.list];
    let listItem = this.state.list[index];
    let editedListItem = {
      text: listItem.text,
      isDone: !listItem.isDone
    };
    list[index] = editedListItem;

    this.setState({
      list: [...list]
    });
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
    this.props.editListModalClose();
    this.setState({
      title: this.props.userNotesObject[this.props.noteID].title,
      list: this.props.userNotesObject[this.props.noteID].list,
      listItemText: ""
    });
  };

  saveAndClose = () => {
    let newNote = {
      type: this.state.type,
      title: this.state.title,
      list: this.state.list,
      createdAt: this.state.createdAt,
      editedAt: new Date(),
      pinned: this.state.pinned,
      color: this.state.color
    };

    this.props.editListModalSaveAndClose(newNote);
    this.setState({ listItemText: "" });
  };

  changeColor = color => {
    console.log(color);
    this.setState({ color });
  };

  render() {
    return (
      <div>
        <Modal
          size="lg"
          show={this.props.editListModalShow}
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
            <ListGroup>
              {this.state.list.map((listItem, index) => {
                if (listItem) {
                  return (
                    <div key={index}>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Checkbox
                            aria-label="check if item is done"
                            onChange={() => this.checkListItem(index)}
                            checked={listItem.isDone ? true : false}
                          />
                        </InputGroup.Prepend>
                        <FormControl
                          aria-describedby="list item description"
                          name="listItemText"
                          value={listItem.text}
                          disabled={listItem.isDone ? true : false}
                          onChange={e => {
                            this.listItemOnChange(e, index);
                          }}
                          key={index}
                        />
                        <InputGroup.Append>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => this.deleteListItem(index)}
                          >
                            <i className="fa fa-trash" />
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </ListGroup>
            <Form onSubmit={this.addListItem}>
              <InputGroup>
                <FormControl
                  aria-label="add list item here"
                  name="listItemText"
                  placeholder="add a list item here"
                  value={this.state.listItemText}
                  onChange={this.onChange}
                />
                <InputGroup.Append>
                  <Button variant="outline-success" onClick={this.addListItem}>
                    Add Item
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
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
)(EditListModal);
