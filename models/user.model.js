const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    lastName: { type: String, required: true, trim: true, minlength: 3 },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    password: { type: String, required: true, trim: true, minlength: 3 },
    street: { type: String, trim: true, minlength: 3 },
    city: { type: String, trim: true, minlength: 3 },
    zipCode: { type: Number, trim: true, minlength: 3 },
    role: { type: String, required: true, trim: true, minlength: 3 },
    image: { type: String },
    verified: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
