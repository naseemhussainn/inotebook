import React,{useContext} from 'react'
import noteContext from '../context/inotebook/noteContext';

function NoteIteam(props) {
  const {deleteNote} = useContext(noteContext)
  const { note,UpdateNotefunction } = props;
  return (
    <div className='col-md-12 my-2'>
      <div className="card">    
        <div className="card-body">
          <div className='col-sm-12 d-flex'>
            <div className='col-sm-11'>
              <h5 className="card-title">{note.title}</h5>
            </div>
            <div className='col-sm-1'>
              <i className="fa-solid fa-pen-to-square mx-4" onClick={()=>{
                UpdateNotefunction(note);
              }}></i>
              <i className="fa-solid fa-trash" onClick={()=>{
                deleteNote(note._id);
              }}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          <p className="card-text">tag: {note.tag}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteIteam
