import React, { useContext, useEffect } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
import noteContext from "../context/inotebook/noteContext";
import { useNavigate } from "react-router-dom";

function Home() {
  var { fetchAddNotes } = useContext(noteContext);
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('Auth-Token') != ''){
      fetchAddNotes();
    }else{
      navigate("/login")
    }
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
