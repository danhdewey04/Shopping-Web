const ProductModel = require("../models/product");
const SettingModel = require("../models/setting");
const CommentModel = require("../models/comment");
const paginate = require("../../common/paginate");
const fs = require("fs");
const slug = require("slug");
exports.index = async (req, res) => {

  const setting = (await SettingModel.findOne()) || {};
  const comments = await CommentModel.find().populate('prd_id'); 
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = page * limit - limit;
  const totalRows = await ProductModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);
  const products = await ProductModel.find().countDocuments()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
    return res.render("admin/comment", {
        products,
        comments,
        paginate: paginate(totalPages, limit, page),
        prev: page - 1,
        next: page + 1,
        page,
        totalPages, 
        currentPath: req.path,
        setting
    });
};

exports.del = async (req, res) => {
  const { id } = req.params;
  await CommentModel.deleteOne({ _id: id });
  return res.redirect("/admin/comment");
};

