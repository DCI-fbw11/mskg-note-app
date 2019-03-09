import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button } from "react-bootstrap";
import uuid from "uuid";

import AddNoteModal from "./AddNoteModal";
import EditNoteModal from "./EditNoteModal";
import AddListModal from "./AddListModal";
import EditListModal from "./EditListModal";
import Note from "./Note";
import List from "./List";
import Spinner from "../layout/Spinner";


class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNoteModalShow: false,
      editNoteModalShow: false,
      addListModalShow: false,
      editListModalShow: false,
      editNoteCache: null,
      noteTemplate: {
        type: "text",
        title: "",
        text: "",
        createdAt: new Date(),
        editedAt: "",
        pinned: false,
        color: "white"
      },
      listTemplate: {
        type: "list",
        title: "",
        list: [],
        createdAt: new Date(),
        editedAt: "",
        pinned: false,
        color: "white"
      }
    };
  }

  // add note modal functions
  addNoteModalClose = type => {
    console.log(`add ${type} modal closing`);
    if (type === "note") {
      this.setState({ addNoteModalShow: false });
    } else {
      this.setState({ addListModalShow: false });
    }
  };

  addNoteModalSaveAndClose = newNote => {
    const { firestore, userID } = this.props;

    firestore.add(
      {
        collection: "notes",
        doc: userID,
        subcollections: [{ collection: "notes" }]
      },
      newNote
    );

    this.setState({ addNoteModalShow: false });
  };

  // add list modal functions
  addListModalSaveAndClose = newNote => {
    const { firestore, userID } = this.props;

    firestore.add(
      {
        collection: "notes",
        doc: userID,
        subcollections: [{ collection: "notes" }]
      },
      newNote
    );

    this.setState({ addListModalShow: false });
  };

  // edit note modal functions
  editNote = id => {
    this.setState({ editNoteCache: id, editNoteModalShow: true });
  };

  editNoteModalClose = () => {
    console.log("edit note modal closing");
    this.setState({ editNoteModalShow: false, editNoteCache: null });
  };

  editNoteModalSaveAndClose = editedNote => {
    const { firestore, userID } = this.props;
    const { editNoteCache } = this.state;

    firestore.update(
      {
        collection: "notes",
        doc: userID,
        subcollections: [{ collection: "notes", doc: editNoteCache }]
      },
      editedNote
    );

    this.setState({ editNoteModalShow: false, editNoteCache: null });
  };

  // edit list modal functions
  editList = id => {
    console.log(id);
    this.setState({ editNoteCache: id, editListModalShow: true });
  };

  editListModalClose = () => {
    console.log("edit list modal closing");
    this.setState({ editListModalShow: false, editNoteCache: null });
  };

  editListModalSaveAndClose = editedNote => {
    console.log(editedNote)
    // const { firestore, userID } = this.props;
    // const { editNoteCache } = this.state;

    // firestore.update(
    //   {
    //     collection: "notes",
    //     doc: userID,
    //     subcollections: [{ collection: "notes", doc: editNoteCache }]
    //   },
    //   editedNote
    // );

    // 
      // THIS IS NOT WORKING
    //

    this.setState({ editListModalShow: false, editNoteCache: null });
  };

  logout = () => {
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    let { userNotes } = this.props;

    if (userNotes) {
      return (
        <div>
          <div className="container">
            <Button
              className="btn btn-success m-2"
              onClick={() => this.setState({ addNoteModalShow: true })}
            >
              <i className="fas fa-plus" /> Add Note
            </Button>
            <Button
              className="btn btn-success m-2"
              onClick={() => this.setState({ addListModalShow: true })}
            >
              <i className="fas fa-plus" /> Add List
            </Button>
            <Button onClick={this.logout} variant="info">
              Logout
            </Button>
          </div>
          <div
            className="container"
            style={{ display: "flex", flexFlow: "row wrap" }}
          >
            {userNotes
              .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
              .map(note => {
                if (note.type === "text") {
                  return (
                    <Note note={note} editNote={this.editNote} key={uuid()} />
                  );
                } else {
                  return (
                    <List note={note} editList={this.editList} key={uuid()} />
                  );
                }
              })}
          </div>
          <AddNoteModal
            addNoteModalShow={this.state.addNoteModalShow}
            addNoteModalClose={this.addNoteModalClose}
            addNoteModalSaveAndClose={this.addNoteModalSaveAndClose}
          />
          <EditNoteModal
            editNoteModalShow={this.state.editNoteModalShow}
            editNoteModalClose={this.editNoteModalClose}
            editNoteModalSaveAndClose={this.editNoteModalSaveAndClose}
            noteID={this.state.editNoteCache}
          />
          <AddListModal
            addListModalShow={this.state.addListModalShow}
            addNoteModalClose={this.addNoteModalClose}
            addListModalSaveAndClose={this.addListModalSaveAndClose}
          />
          <EditListModal
            editListModalShow={this.state.editListModalShow}
            editListModalClose={this.editListModalClose}
            editListModalSaveAndClose={this.editListModalSaveAndClose}
            noteID={this.state.editNoteCache}
          />
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(({ firebase }) => {
    return [
      {
        collection: "notes",
        doc: firebase.auth().O,
        subcollections: [{ collection: "notes" }],
        storeAs: "userNotes"
      }
    ];
  }),
  connect((state, props) => ({
    userNotes: state.firestore.ordered.userNotes,
    userNotesObject: state.firestore.data.userNotes,
    userID: state.firebase.auth.uid
  }))
)(Notes);
