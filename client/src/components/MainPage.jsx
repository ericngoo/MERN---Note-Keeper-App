import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function MainPage(props) {
  const [notes, setNotes] = useState( [] );

  async function getAllNotes() {
    if(props.currentUser) {
      let res = await axios.post("/posts", { userID: props.currentUser})
      setNotes(res.data)
    }
  }

  useEffect(function() {
    if(props.currentUser) {
      getAllNotes()
    }
  }, [])

  async function addNote(note) {
   
    await axios.post("/post", {userID: props.currentUser, noteToAdd: note})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("Error supposed to be caught here (if any!)");
    })
    getAllNotes();
  
  }

  async function deleteNote(id) {
    await axios.post("/deleteNote", { userID: props.currentUser, Id: id })
    .then(function (response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log("Error occured while deleting note.");
    })

    getAllNotes();
  }

  return (
    <div>
      <Header sessionStatus={props.sessionStatus}/>
      <CreateArea onAdd={addNote} />
      {notes.map((inputNote, index) => {
        return (
          <Note
            key={index}
            id={inputNote._id}
            title={inputNote.title}
            content={inputNote.content}
            onDelete={deleteNote} />
        );
      })}
      <Footer />
    </div>
  );
}

export default MainPage;