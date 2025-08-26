const CommentModel = require("../models/comment");
const SettingModel = require("../models/setting");
exports.index = async (req, res) => {
  const comments = await CommentModel.find({ status: true }).sort({ createdAt: -1 });
  const setting = await SettingModel.findOne() || {};
  res.render("admin/guest", { currentPath: req.path, comments, setting });
};
