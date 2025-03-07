import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added Successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-4">
            <h4 className="text-primary fw-bold mb-3">Capture your thoughts instantly—add a note now! 📝</h4>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                    <input 
                        type="text" 
                        className="form-control border-0 shadow-sm p-2" 
                        id="title" 
                        name="title" 
                        onChange={onChange} 
                        value={note.title} 
                        minLength={5} 
                        required 
                        style={{ borderRadius: "6px" }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                    <textarea 
                        className="form-control border-0 shadow-sm p-2" 
                        id="description" 
                        name="description" 
                        rows="3" 
                        onChange={onChange} 
                        value={note.description} 
                        minLength={5} 
                        required 
                        style={{ borderRadius: "6px" }}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label fw-bold">Tag</label>
                    <input 
                        type="text" 
                        className="form-control border-0 shadow-sm p-2" 
                        id="tag" 
                        name="tag" 
                        onChange={onChange} 
                        value={note.tag} 
                        minLength={3} 
                        required 
                        style={{ borderRadius: "6px" }}
                    />
                </div>

                <button
                    disabled={note.title.length < 5 || note.description.length < 5}
                    type="submit"
                    className="btn btn-primary fw-bold"
                    style={{ borderRadius: "6px", padding: "10px 20px", fontSize: "16px", transition: "0.3s" }}
                    onClick={handleClick}
                >
                    ➕ Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;
