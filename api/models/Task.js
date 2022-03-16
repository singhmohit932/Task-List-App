const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    sharedUserId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    accepted: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
