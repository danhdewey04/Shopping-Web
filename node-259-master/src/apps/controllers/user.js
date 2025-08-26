const UserModel = require("../models/user");
const SettingModel = require("../models/setting");
const paginate = require("../../common/paginate");
const fs = require("fs");
const slug = require("slug");
exports.index = async (req, res) => {
  //
  const setting = (await SettingModel.findOne()) || {};
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = page * limit - limit;
  const totalRows = await UserModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);
  const users = await UserModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  // console.log(paginate(totalRows, limit, page));

  return res.render("admin/users/user", {
    users,
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
  const users = await UserModel.find().sort({ _id: 1 });
  return res.render("admin/users/add_user", { users, currentPath: req.path, setting });
};

exports.store = async (req, res) => {
  const { body } = req;
  const user = new UserModel({
    full_name: body.full_name,
    slug: slug(body.full_name),
    role: Number(body.role),
    email: body.email,
    password: body.password,
  });
  await user.save();
  return res.redirect("/admin/users");
};
exports.edit = async (req, res) => {
  const setting = (await SettingModel.findOne()) || {};
  const { id } = req.params;
  const user = await UserModel.findById(id);
  return res.render("admin/users/edit_user", {
    user,
    currentPath: "/admin/users/edit" + id,
    setting
  });
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const user = {
    full_name: body.fullname,
    slug: slug(body.fullname),
    role: Number(body.role),
    email: body.email,
    password: body.password,
  };
  await UserModel.updateOne({ _id: id }, { $set: user });
  return res.redirect("/admin/users");
};
exports.del = async (req, res) => {
  const { id } = req.params;
  await UserModel.deleteOne({ _id: id });
  return res.redirect("/admin/users");
};