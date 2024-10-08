import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Contacts = mongoose.model("myphonebook", ContactSchema);
