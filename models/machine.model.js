const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const machineSchema = new Schema(
  {
    make: { type: String, required: true, trim: true, minlength: 3 },
    model: { type: String, required: true, trim: true, minlength: 3 },
    year: { type: Number, required: true, trim: true, minlength: 3 },
    category: { type: String, required: true, trim: true, minlength: 3 },
    image: { type: String, data: Buffer },
    pricePerDay: { type: Number, required: true },
    status: { type: String, required: true, trim: true, minlength: 3 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Machine", machineSchema);
