const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const machineSchema = new Schema(
  {
    customId: {
      type: String,
      unique: true,
    },
    make: { type: String, required: true, trim: true, minlength: 3 },
    model: { type: String, required: true, trim: true, minlength: 3 },
    year: { type: Number, required: true, trim: true, minlength: 3 },
    category: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String },
    pricePerDay: { type: Number, required: true },
    image: { type: [String] },
    file: { type: [String] },
    status: { type: String, required: true, trim: true, minlength: 3 },
  },
  {
    timestamps: true,
  }
);

machineSchema.pre("save", async function (next) {
  try {
    if (!this.customId) {
      const maxCustomId = await this.constructor
        .findOne({}, "customId")
        .sort({ customId: -1 })
        .exec();
      const baseLetters = "MAQ";
      const numberLength = 3;
      const currentNumbers =
        maxCustomId && maxCustomId.customId
          ? parseInt(maxCustomId.customId.slice(baseLetters.length))
          : 0;
      const newCustomIdNumber = currentNumbers + 1;
      const paddedNumericPart = newCustomIdNumber
        .toString()
        .padStart(numberLength, "0");
      this.customId = baseLetters + paddedNumericPart;
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Machine", machineSchema);
