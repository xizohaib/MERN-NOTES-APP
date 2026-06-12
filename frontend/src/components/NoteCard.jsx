import { useState } from "react";
import axios from "axios";

export default function NoteCard({ note, token, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.textfield);

  async function handleSave() {
    try {
      const res = await axios.put(
        `http://localhost:5000/updateNote/${note._id}`,
        { title, textfield: text },
        { headers: { Authorization: token } },
      );
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      alert("Update failed");
    }
  }

  return (
    <div style={styles.card}>
      {isEditing ? (
        <>
          {/* Form Fields Style */}
          <input
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            style={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Note details..."
          />

          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.btn, ...styles.saveBtn }}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              style={{ ...styles.btn, ...styles.cancelBtn }}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 style={styles.title}>{note.title}</h3>
          <p style={styles.text}>{note.textfield}</p>

          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.btn, ...styles.editBtn }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              style={{ ...styles.btn, ...styles.deleteBtn }}
              onClick={() => onDelete(note._id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e1e4e8",
    width: "280px",
    margin: "16px",
    display: "flex",
    flexDirection: "column",
    minHeight: "200px",
  },
  title: {
    marginTop: 0,
    fontSize: "1.2rem",
    color: "#1a1a1a",
    borderBottom: "2px solid #f8f9fa",
    paddingBottom: "8px",
    marginBottom: "12px",
  },
  text: {
    color: "#4a4a4a",
    lineHeight: "1.5",
    fontSize: "0.95rem",
    marginBottom: "20px",
    flexGrow: 1, // Ensures text area takes up available space
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #007bff",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    height: "100px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    resize: "none",
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "auto",
  },
  btn: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    flex: 1,
    transition: "opacity 0.2s",
  },
  editBtn: { backgroundColor: "#f0f2f5", color: "#1c1e21" },
  deleteBtn: {
    backgroundColor: "#fff0f0",
    color: "#dc3545",
    border: "1px solid #ffcccc",
  },
  saveBtn: { backgroundColor: "#28a745", color: "#fff" },
  cancelBtn: { backgroundColor: "#6c757d", color: "#fff" },
};
