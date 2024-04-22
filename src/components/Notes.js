import React, { useContext, useRef,useState } from 'react'
import noteContext from '../context/inotebook/noteContext';
import NoteIteam from './NoteIteam';

function Notes() {
  const NoteContexts = useContext(noteContext);
  const { notes,updateNote } = NoteContexts;
  const [note, setNote] = useState({ etitle: '',edescription: '', etag: '' ,id:''})
  const ref = useRef(null);
  const refClose = useRef(null);

  const UpdateNotefunction = (currentNote) => {
    ref.current.click();
    setNote({etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag, id:currentNote._id})
  }

  const onchange = (e) => {
      setNote({ ...note, [e.target.name]:e.target.value});
  }

  const handleSubmit = (PassedNote) => {
      updateNote(PassedNote.id,PassedNote.etitle,PassedNote.edescription,PassedNote.etag)
      refClose.current.click();
  }

  return (
    <>
      <button type="hidden" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" />
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" onChange={onchange} aria-describedby="emailHelp" value={note.etitle} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' onChange={onchange} value={note.edescription}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' onChange={onchange} value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose}className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.edescription.length < 5 || note.etitle.length < 3} type="button" className="btn btn-primary" onClick={()=>{handleSubmit(note)}}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {
          notes != '' ? notes.map((note) => {
            return <NoteIteam key={note._id} UpdateNotefunction={UpdateNotefunction} note={note} />

          }) : <p className='text-center'>No notes to display</p>
        }
      </div>
    </>
  )
}

export default Notes
