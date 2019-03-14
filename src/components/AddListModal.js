import React, { Component } from "react";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  ListGroup,
  Form
} from "react-bootstrap";

class AddListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "list",
      title: "",
      list: [],
      editedAt: "",
      pinned: false,
      color: "white",
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

  close = () => {
    this.props.addNoteModalClose("list");
    this.setState({ title: "", list: [] });
  };

  saveAndClose = () => {
    let note = {
      ...this.state,
      createdAt: Date.now()
    };

    this.props.addModalSaveAndClose(note, "list");
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
                  required
                />
                <InputGroup.Append>
                  <Button type="submit" variant="outline-success">
                    Add Item
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
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
export default AddListModal;
