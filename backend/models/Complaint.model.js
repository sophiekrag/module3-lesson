const { Schema, model } = require("mongoose");

const complaintSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required."],
    },
    copy: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      lowercase: true,
      trim: true,
      unique: false,
    },
    user: {
      type: String,
    },
    prio: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Complaint", complaintSchema);
