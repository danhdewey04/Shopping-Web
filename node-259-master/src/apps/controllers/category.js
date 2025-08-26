const ProductModel = require("../models/product");
const SettingModel = require("../models/setting");
const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");
const fs = require("fs");
const slug = require("slug");
exports.index = async (req, res) => {
  //
  const setting = (await SettingModel.findOne()) || {};
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = page * limit - limit;
  const totalRows = await CategoryModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);
  const categories = await CategoryModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  // console.log(paginate(totalRows, limit, page));

  return res.render("admin/categories/category", {
    categories,
    paginate: paginate(totalPages, limit, page),
    prev: page - 1,
    next: page + 1,
    page,
    totalPages,
    currentPath: req.path,
    setting
  });
};

exports.create = async (req, res) => {
  const setting = (await SettingModel.findOne()) || {};
  const categories = await CategoryModel.find().sort({ _id: 1 });
  return res.render("admin/categories/add_category", { categories, currentPath: "/admin/categories/create", setting });
};
exports.store = async (req, res) => {
  const { body } = req;
  const category = new CategoryModel({
    title: body.title,
    slug: slug(body.title),
    description: body.description,
  });
  await category.save();
  return res.redirect("/admin/categories");
};
exports.edit = async (req, res) => {
  const { id } = req.params;
  const setting = (await SettingModel.findOne()) || {};
  const category = await CategoryModel.findById(id);
  return res.render("admin/categories/edit_category", { 
    category, 
    currentPath: "/admin/categories/edit" + id,
    setting
  });
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { body, file } = req;
  const category = {
    title: body.title,
    slug: slug(body.title),
    description: body.description,
  };
  await CategoryModel.updateOne({ _id: id }, { $set: category });
  return res.redirect("/admin/categories");
};
exports.del = async (req, res) => {
  const { id } = req.params;
  await CategoryModel.deleteOne({ _id: id });
  return res.redirect("/admin/categories");
};