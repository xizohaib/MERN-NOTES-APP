import { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NotesDashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [textfield, setTextfield] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleAddNoteBtn = async () => {
    if (!title.trim() || !textfield.trim()) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const url = `http://localhost:5000/addNote`;

      await axios.post(
        url,
        {
          title,
          textfield,
        },
        {
          headers: {
            authorization: token,
          },
        },
      );

      alert("Note added successfully!");

      setTitle("");
      setTextfield("");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  const handleNewNote = () => {
    setTitle("");
    setTextfield("");
  };

  const handleViewNotes = () => {
    navigate("/viewNotes");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      {/* Colorful Navbar */}
      <nav className="colorful-navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon">📝</div>
            <div className="brand-text">
              <span className="brand-name">NoteMaster</span>
              <span className="brand-tagline">Your Ideas, Organized</span>
            </div>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="menu-icon">☰</span>
          </button>

          <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
            <button className="nav-link home-btn">
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </button>
            <button className="nav-link contact-btn">
              <span className="nav-icon">📧</span>
              <span>Contact</span>
            </button>
            <button className="nav-link logout-btn" onClick={handleLogout}>
              <span className="nav-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="Hero-container">
        <div className="sidebar-area">
          <button onClick={handleNewNote}>
            <span className="btn-icon">✨</span>
            Create New Note
          </button>

          <button onClick={handleViewNotes}>
            <span className="btn-icon">👁️</span>
            View Notes
          </button>
        </div>

        <div className="main-area">
          <input
            type="text"
            placeholder="📌 Title for your note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows="20"
            cols="50"
            placeholder="✍️ Write your note here..."
            value={textfield}
            onChange={(e) => setTextfield(e.target.value)}
          />

          <button onClick={handleAddNoteBtn} disabled={loading}>
            {loading ? "📤 Adding..." : "➕ Add Note"}
          </button>
        </div>
      </div>
    </>
  );
}
