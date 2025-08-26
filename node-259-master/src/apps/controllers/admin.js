const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const CommentModel = require("../models/comment");
const AdModel = require("../models/ad");
const SettingModel = require("../models/setting");

exports.dashboard = async (req, res) => {
  const users = await UserModel.find().countDocuments();
  const products = await ProductModel.find().countDocuments();
  const ads = await AdModel.find().countDocuments();
  const comments = await CommentModel.find().countDocuments();
  const setting = (await SettingModel.findOne()) || {};
  return res.render("admin/admin", {
    currentPath: req.path,
    users,
    products,
    ads,
    comments,
    setting,
  });
};
