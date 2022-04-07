const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    todo: {
      type: String,
      required: [true, "Please add a to-do item"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
