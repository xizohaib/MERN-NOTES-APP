import User from "../models/users.js";
import Notes from "../models/notes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(409).json({ msg: "user already registered" }); // 409 status   code is for duplicate data

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered Successfully!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "user doesnot exist" });

    const checkingPass = await bcrypt.compare(password, user.password);

    if (!checkingPass)
      return res.status(400).json({ msg: "Passwrod is wrong" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
export const addNote = async (req, res) => {
  try {
    const { title, textfield } = req.body;

    const newNote = new Notes({
      title: title,
      textfield: textfield,
      userId: req.user.id,
    });

    await newNote.save();
    res.status(201).json({ msg: "Note Added" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
export const viewNotes = async (req, res) => {
  try {
    const fetchedNotes = await Notes.find({ userId: req.user.id });
    res.json(fetchedNotes);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};
export const deleteNote = async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note deleted" });
  } catch (err) {
    res.status(500).send({ msg: err.msg });
  }
};
export const editNote = async (req, res) => {
  try {
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        textfield: req.body.textfield,
      },
      { new: true },
    );

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
