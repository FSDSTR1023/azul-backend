const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rentSchema = new Schema(
  {
    customId: {
      type: String,
      unique: true,
    },
    machine: { type: Schema.Types.ObjectId, ref: "Machine" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, required: true, trim: true, minlength: 3 }, // Devuelto, Averiado, Enviado
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

rentSchema.pre("save", async function (next) {
  try {
    if (!this.customId) {
      const maxCustomId = await this.constructor
        .findOne({}, "customId")
        .sort({ customId: -1 })
        .exec();
      const baseLetters = "ALQ";
      const numericPartLength = 3;
      const currentNumericPart =
        maxCustomId && maxCustomId.customId
          ? parseInt(maxCustomId.customId.slice(baseLetters.length))
          : 0;
      const newCustomIdNumber = currentNumericPart + 1;
      const paddedNumericPart = newCustomIdNumber
        .toString()
        .padStart(numericPartLength, "0");
      this.customId = baseLetters + paddedNumericPart;
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Rent", rentSchema);
