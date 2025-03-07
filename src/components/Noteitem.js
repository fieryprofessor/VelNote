import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
            <div
        className="card my-3 shadow border"
        style={{
            borderRadius: "10px",
            transition: "transform 0.2s ease-in-out",
            background: "#fff8e1", // Pale Yellow Background
            border: "2px solid #008080", // Teal Border
            borderWidth: "2px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5
              className="card-title text-dark fw-bold"
              style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {note.title}
            </h5>
            <div>
              <i
                className="far fa-edit mx-2"
                style={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "#0d6efd",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0243a5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0d6efd")}
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
              <i
                className="far fa-trash-alt mx-2"
                style={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "#dc3545",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a71d2a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#dc3545")}
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
              ></i>
            </div>
          </div>
          <p className="card-text text-secondary">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
