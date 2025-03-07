import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      props.showAlert("Access Denied: Login First", "warning");
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Wrapped AddNote inside a stylish box */}
      <div
        className="container my-4 p-4 bg-white shadow-lg rounded"
        style={{
          maxWidth: "700px",
          border: "2px solid #007bff",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        }}
      >
        <div className="container text-center">
        <h2
  className="text-center text-primary fw-bold mb-3"
  style={{
    fontSize: "2rem", 
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    borderBottom: "3px solid #007bff",
    display: "inline-block",
    paddingBottom: "5px"
  }}
>

   Add a New Note
</h2>
</div>
        <AddNote showAlert={props.showAlert} />
      </div>

      {/* Modal Trigger Button */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal for Editing Notes */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-bold">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control border-primary"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-bold">
                    Description
                  </label>
                  <textarea
                    className="form-control border-primary"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    rows="3"
                    minLength={5}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label fw-bold">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control border-primary"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="container my-3 text-center">
        <h2
          className="text-center fw-bold text-uppercase text-dark"
          style={{
            color: "#333",
            fontSize: "2rem",
            letterSpacing: "1px",
            borderBottom: "3px solid #007bff",
            display: "inline-block",
            paddingBottom: "5px",
            marginBottom: "20px",
          }}
        >
          Your Notes
        </h2>

        {/* No Notes Message */}
        <div className="container mx-2 text-center text-muted">
          {notes.length === 0 && <p>No Notes to display</p>}
        </div>

        {/* Notes List */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {notes.map((note) => {
            return (
              <Noteitem
                key={note._id}
                updateNote={updateNote}
                note={note}
                showAlert={props.showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
