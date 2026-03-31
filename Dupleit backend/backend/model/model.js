import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  question: String,
  options: [
    {
      text: String,
      votes: { type: Number, default: 0 }
    }
  ],
  expiresAt: Date
});

export const Poll = mongoose.model("Poll", PollSchema);