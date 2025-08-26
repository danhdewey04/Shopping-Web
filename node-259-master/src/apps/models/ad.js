const mongoose = require("../../common/database")();
// Tạo bản thiết kế Ad
const adSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: null,
    },
     position: {
       type: Number,
       default: 0,
     },
     thumbnail: {
       type: String,
       default: "",
     },
     views: {
       type: Number,
       default: 0,
     },
  },
  { timestamps: true }
);
// Tạo model Ad từ bản thiết kế trước đó
const AdModel = mongoose.model("Ads", adSchema, "ads");
module.exports = AdModel;
