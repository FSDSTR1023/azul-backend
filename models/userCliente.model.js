const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userClienteSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    lastName: { type: String, required: true, trim: true, minlength: 3 },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      unique: true,
    },
    password: { type: String, required: true, trim: true, minlength: 3 },
    street: { type: String, required: true, trim: true, minlength: 3 },
    city: { type: String, required: true, trim: true, minlength: 3 },
    zipCode: { type: Number, required: true, trim: true, minlength: 3 },
    image: { type: String, data: Buffer },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserCliente", userClienteSchema);
