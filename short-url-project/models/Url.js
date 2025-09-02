const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      require: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      require: true,
    },
    visitHistory: [{ timestamp: { type: String } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
