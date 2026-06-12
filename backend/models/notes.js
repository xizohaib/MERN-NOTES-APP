import mongoose from "mongoose";
const NotesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    textfield: { type: String, required: true },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // name of User model
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notes", NotesSchema);
