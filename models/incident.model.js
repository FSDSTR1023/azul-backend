const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incidentSchema = new Schema(
  {
    customId: {
      type: String,
      unique: true,
    },
    incident: { type: String, required: true, trim: true, minlength: 3 },
    type: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, required: true, trim: true, minlength: 3 },
    machine: { type: Schema.Types.ObjectId, ref: "Machine" },
    image: { type: String },
    status: { type: String, required: true, trim: true, minlength: 3 }, // en progreso, completado
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

incidentSchema.pre("save", async function (next) {
  try {
    if (!this.customId) {
      const maxCustomId = await this.constructor
        .findOne({}, "customId")
        .sort({ customId: -1 })
        .exec();
      const baseLetters = "INC";
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

module.exports = mongoose.model("Incident", incidentSchema);
