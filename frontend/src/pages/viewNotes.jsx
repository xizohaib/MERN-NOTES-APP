// Updated ViewNotes component with proper CSS classes
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoteCard from "../components/NoteCard.jsx";
import "./viewNotes.css"; // Import the CSS file

export default function ViewNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/viewNotes", {
          headers: { authorization: token },
        });

        setNotes(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err.response?.data?.msg || "Failed to load notes");
      }
    };

    fetchNotes();
  }, [token]);

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/deleteNote/${id}`, {
        headers: {
          authorization: token,
        },
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

      alert("Note deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to delete note");
    }
  };

  const handleUpdateNote = async (updatedNote) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/updateNote/${updatedNote._id}`,
        {
          title: updatedNote.title,
          textfield: updatedNote.textfield,
        },
        {
          headers: {
            authorization: token,
          },
        },
      );

      setNotes((prev) =>
        prev.map((note) =>
          note._id === updatedNote._id ? response.data : note,
        ),
      );
      alert("Note updated successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to update note");
    }
  };

  const handleCreateNew = () => {
    navigate("/notesdashboard");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading your notes...</div>
      </div>
    );
  }

  return (
    <div className="view-notes-container">
      <div className="notes-header">
        <h2>📝 Your Notes</h2>
        <button
          className="back-button"
          onClick={() => navigate("/notesdashboard")}
        >
          ← Create New Note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📓</div>
          <h3>No notes yet</h3>
          <p>Start by creating your first note!</p>
          <button className="create-note-btn" onClick={handleCreateNew}>
            Create Your First Note →
          </button>
        </div>
      ) : (
        <>
          <div className="notes-stats">
            <div className="stats-info">
              Total Notes: <span>{notes.length}</span>
            </div>
            <div className="stats-info">
              {notes.length === 1 ? "1 note" : `${notes.length} notes`}{" "}
              available
            </div>
          </div>
          <div className="notes-grid">
            {notes.map((note, index) => (
              <NoteCard
                key={note._id}
                note={note}
                token={token}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
