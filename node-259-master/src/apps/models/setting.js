const mongoose = require("mongoose");
const SettingSchema = new mongoose.Schema({
  logo: { type: String, default: "" },
  footer: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Setting", SettingSchema);
