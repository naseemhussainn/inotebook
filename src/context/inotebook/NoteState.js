import { useState } from "react";
import noteContext from "./noteContext";
import { toast } from "sonner";

const Notestate = (props) => {
    const urlStatic = "http://localhost:5000/api/";
    const [notes, setNotes] = useState([]);

    const fetchAddNotes = async () => {
        let url = `${urlStatic}notes/fetch-all-notes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjYwYWRiMTA1NDJmYzI5YmMxNzlhZWIxIiwiaWF0IjoxNzExOTkzNjg5fQ.fCcSfkGZ2AF2KUcUu4i4ORMC5TFMpzzht6oTtzQhSMQ",
            },
        });
        var fetchnotes = await response.json();
        setNotes(fetchnotes);
    };

    const addNote = async(title, description, tag = "default") => {
        let url = `${urlStatic}notes/add-notes`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":
                        "eyJhbGciOiJIUzI1NiIsInRd5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjYwYWRiMTA1NDJmYzI5YmMxNzlhZWIxIiwiaWF0IjoxNzExOTkzNjg5fQ.fCcSfkGZ2AF2KUcUu4i4ORMC5TFMpzzht6oTtzQhSMQ",
                },
                body: JSON.stringify({
                    title:title, description : description, tag :tag
                }),
            });

            if (response.ok) {
                const dataResponse = await response.json();
                const note = {
                    _id: dataResponse._id,
                    user: dataResponse.user,
                    title: dataResponse.title,
                    description: dataResponse.description,
                    tag: dataResponse.tag,
                    date: dataResponse.date,
                    __v: dataResponse.__v,
                };
                setNotes(notes.concat(note));
                toast.success(`Successfully added a note with title: ${note.title}`, {
                    duration: 3000,
                });
                console.log(`note added with id: ${note._id}`);
            } else {
                const json = await response.json();
                toast.error(json.errors[0].msg);
            }
            
        } catch (error) {
            toast(error, {
                duration: 3000,
            });
            return '';
        }



    };



    const deleteNote = async(id) => {
        let url = `${urlStatic}notes/delete-notes/${id}`;
        console.log(url)
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjYwYWRiMTA1NDJmYzI5YmMxNzlhZWIxIiwiaWF0IjoxNzExOTkzNjg5fQ.fCcSfkGZ2AF2KUcUu4i4ORMC5TFMpzzht6oTtzQhSMQ",
                "Content-Type": "application/json"
            },
        });
        var dataResponse = await response;
        if((dataResponse.status == 200)){
            let newNotes = notes.filter((note) => {
                return note._id !== id;
            });
            setNotes(newNotes);
            toast.success(`Successfully deleted a note`, {
                duration: 3000,
            });
        }else{
            toast.error('An error occured while deleting note');
        }

    };

    const updateNote = async (id, title, description, tag) => {
        let url = `${urlStatic}notes/update-notes/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjYwYWRiMTA1NDJmYzI5YmMxNzlhZWIxIiwiaWF0IjoxNzExOTkzNjg5fQ.fCcSfkGZ2AF2KUcUu4i4ORMC5TFMpzzht6oTtzQhSMQ",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title:title, description : description, tag :tag
            }),
        });
        var dataResponse = await response;
        console.log(dataResponse);
        if((dataResponse.status == 200)){
            var newnote = JSON.parse(JSON.stringify(notes))
            console.log('before');
            console.log(newnote);
            for (let i = 0; i < notes.length; i++) {
                var element = newnote[i];
                if (element._id === id) {
                    newnote[i].title = title;
                    newnote[i].description = description;
                    newnote[i].tag = tag;
                    break;
                }
            }
            console.log('after');
            console.log(newnote);
            setNotes(newnote);  
            toast.success(`Successfully updated a note`, {
                duration: 3000,
            });
        }else{
            toast.error('An error occured while editing note');
        }

    };

    return (
        <noteContext.Provider
            value={{ notes, addNote, updateNote, deleteNote, fetchAddNotes }}
        >
            {props.children}
        </noteContext.Provider>
    );
};

export default Notestate;
