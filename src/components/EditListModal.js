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
import uuid from "uuid";

class EditListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItemText: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    if(props === state){
      return null
    } 

    console.log('hi')

    const { noteID, userNotesObject } = props;

    let note;
    if (noteID) {
      if (userNotesObject[noteID]) {
        note = userNotesObject[noteID];
      } else {
        note = {};
      }
    }
    return { ...state,...note };
  }

  onChange = e => {
    console.log('gsaadd')
    console.log(this.state)
    this.setState({ [e.target.name]: e.target.value });
  };

  addListItem = e => {
    e.preventDefault();
    let newListItem = {
      text: this.refs.listItemText.value,
      isDone: false
    };

    console.log(newListItem)
    console.log(this.state)

    this.setState({
      list: [...this.state.list, newListItem],
      listItemText: "",
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
    let refs = this.refs;
    let list = this.state.list;
    let listItem = this.state.list[index];
    let editedListItem = {
      text: refs[`item${index}`].value,
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
    this.setState({ listItemText: "" });
  };

  saveAndClose = note => {
    let refs = this.refs;

    let newNote = {
      ...note, editedAt: new Date(),
      list: note.list.map((listItem, index) => {
        return { text: refs[`item${index}`].value, isDone: listItem.isDone };
      })
    };

    this.props.editListModalSaveAndClose(newNote);
    this.setState({ listItemText: "" });
  };

  render() {
    let list

    if(this.state.list){
      list = this.state.list
    } else {
      list = []
    }
    

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
                defaultValue={this.state.title}
                ref="title"
              />
            </InputGroup>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {list.map((listItem, index) => {
                if (listItem) {
                  return (
                    <div key={uuid()}>
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
                          defaultValue={listItem.text}
                          ref={`item${index}`}
                          disabled={listItem.isDone ? true : false}
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
                  defaultValue={this.state.listItemText}
                  ref="listItemText"
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
          <Button variant="danger" onClick={this.deleteNote}>
              <i className="fa fa-trash" />
            </Button>
            <Button onClick={() => this.saveAndClose(this.state)}>
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
