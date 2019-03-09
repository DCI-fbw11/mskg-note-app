import React, { Component } from "react";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  ListGroup,
  Form
} from "react-bootstrap";
import uuid from "uuid";

class AddListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "list",
      title: "",
      list: [],
      createdAt: new Date(),
      editedAt: "",
      pinned: false,
      color: "white",
      listItemText: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addListItem = e => {
    e.preventDefault();
    let newListItem = {
      text: this.state.listItemText,
      isDone: false,
    };

    

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

  close = () => {
    this.props.addNoteModalClose("list");
    this.setState({ title: "", list: [] });
  };

  saveAndClose = note => {
    let refs = this.refs;

    let newNote = {
      ...note,
      list: note.list.map((listItem, index) => {
        return { text: refs[`item${index}`].value, isDone: listItem.isDone };
      })
    };

    this.props.addListModalSaveAndClose(newNote);
    this.setState({ title: "", list: [] });
  };

  render() {
    const { list } = this.state;

    return (
      <div>
        <Modal
          size="lg"
          show={this.props.addListModalShow}
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
            <Button onClick={() => this.saveAndClose(this.state)}>
              Save & Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default AddListModal;
