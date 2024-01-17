const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incidentSchema = new Schema(
  {
    incident: { type: String, required: true, trim: true, minlength: 3 },
    type: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, required: true, trim: true, minlength: 3 },
    machine: { type: Schema.Types.ObjectId, ref: "Machine" },
    image: { type: String, data: Buffer },
    status: { type: String, required: true, trim: true, minlength: 3 },
    dateReported: {
      type: Date,
      required: true,
      trim: true,
      default: Date.now(),
    },
    dateResolved: {
      type: Date,
      trim: true,
    },
    userClient: { type: Schema.Types.ObjectId, ref: "User" },
    userAT: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Incident", incidentSchema);
