import React, { useContext, useState } from 'react'
import noteContext from '../context/inotebook/noteContext';
function AddNote() {
    const { addNote } = useContext(noteContext)
    const [note, setNote] = useState({ title: '', description: '', tag: '' })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addNote(note.title, note.description, note.tag);
            setNote({ title: '', description: '', tag: '' });
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]:e.target.value});
    }
    return (
        <div className='container my-3'>
            <h2>Add Notes</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onchange} value={note.title} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange} />
                </div>
                <button disabled={note.description.length < 5 || note.title.length < 3} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add note</button>
            </form>
        </div>
    )
}

export default AddNote
