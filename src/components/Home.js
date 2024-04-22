import React, { useContext, useEffect } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
import noteContext from "../context/inotebook/noteContext";

function Home() {
  var { fetchAddNotes } = useContext(noteContext);
  useEffect(() => {
    fetchAddNotes();
  }, [])
  return (
    <>
      <AddNote />
      <div className='container my-3'>
        <h2>Your Notes</h2>
        <Notes/>
      </div>
    </>
  )
}

export default Home;
