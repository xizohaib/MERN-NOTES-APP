import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  Signup,
  Signin,
  addNote,
  viewNotes,
  deleteNote,
  editNote,
} from "../controllers/index.js";

const router = express.Router();
router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/addNote", authMiddleware, addNote);
router.get("/viewNotes", authMiddleware, viewNotes);
router.delete("/:id", authMiddleware, deleteNote);
router.put("/:id", authMiddleware, editNote);

export default router;
