const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rentSchema = new Schema(
  {
    machine: { type: Schema.Types.ObjectId, ref: "Machine" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    dateRentStart: {
      type: Date,
      required: true,
      trim: true,
      default: Date.now(),
    },
    dateRentEnd: {
      type: Date,
      required: true,
      trim: true,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rent", rentSchema);
