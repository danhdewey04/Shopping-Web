const AdModel = require("../models/ad");
const SettingModel = require("../models/setting");
exports.index = async (req, res) => {
  const ads = await AdModel.find({ status: true }).sort({ createdAt: -1 });
  const setting = await SettingModel.findOne() || {};
  res.render("admin/index", { currentPath: req.path, ads, setting });
};
