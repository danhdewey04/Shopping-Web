const AdModel = require("../models/ad");
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
  const totalRows = await AdModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);
  const ads = await AdModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  // console.log(paginate(totalRows, limit, page));

  return res.render("admin/ads/ad", {
    ads,
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
  const users = await AdModel.find().sort({ _id: 1 });
  const setting = (await SettingModel.findOne()) || {};
  return res.render("admin/ads/add_ad", { users, currentPath: "/admin/ads/create", setting });
};

exports.store = async (req, res) => {
  const { body } = req;
  let error = null;
  if (!body.name || !body.description || !body.link || !body.type) {
    return res.status(400).send("Thiếu dữ liệu bắt buộc!");
  }
 
  // Kiểm tra trùng position
  if (!error && body.position) {
    const exist = await AdModel.findOne({ position: Number(body.position), type: body.type });
    if (exist) {
      error = "Đã tồn tại quảng cáo với thứ tự hiển thị này!";
    }
  }
  if (error) {
    const setting = (await SettingModel.findOne()) || {};
    return res.render("admin/ads/add_ad", { error, currentPath: "/admin/ads/create", setting });
  } 

  const ad = new AdModel({
    name: body.name,
    description: body.description,
    link: body.link,
    status: body.status === "true" || body.status === "1" || body.status === "on" ? true : false,
    type: body.type,
    position: body.position ? Number(body.position) : 0,
    thumbnail: body.thumbnail || "",
    views: body.views ? Number(body.views) : 0,
  });
  await ad.save();
  const setting = (await SettingModel.findOne()) || {};
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = page * limit - limit;
  const totalRows = await AdModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);
  const ads = await AdModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  return res.render("admin/ads/ad", {
    ads,
    paginate: paginate(totalPages, limit, page),
    prev: page - 1,
    next: page + 1,
    page,
    totalPages,
    currentPath: "/admin/ads",
    setting
  });
};
exports.edit = async (req, res) => {
  const { id } = req.params;
  const ad = await AdModel.findById(id);
  const setting = (await SettingModel.findOne()) || {};
  return res.render("admin/ads/edit_ad", { 
    ad, 
    currentPath: "/admin/ads/edit" + id,
    setting
  });
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let error = null;

  // Kiểm tra trùng position (loại trừ chính quảng cáo đang sửa)
  if (body.position) {
    const exist = await AdModel.findOne({ 
      position: Number(body.position), 
      type: body.type, 
      _id: { $ne: id }
    });
    if (exist) {
      error = `Đã tồn tại quảng cáo với thứ tự hiển thị này!`;
    }
  }
  if (error) {
    const ad = await AdModel.findById(id);
    const setting = (await SettingModel.findOne()) || {};
    return res.render("admin/ads/edit_ad", { ad, error, currentPath: "/admin/ads/edit" + id, setting });
  }

  const ad = {
    name: body.name,
    description: body.description,
    link: body.link,
    status: body.status === "true" || body.status === "1" || body.status === "on" ? true : false,
    type: body.type,
    position: body.position ? Number(body.position) : 0,
    thumbnail: body.thumbnail || "",
    views: body.views ? Number(body.views) : 0,
  };
  await AdModel.updateOne({ _id: id }, { $set: ad });
  const setting = (await SettingModel.findOne()) || {};
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = page * limit - limit;
  const totalRows = await AdModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);
  const ads = await AdModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  return res.render("admin/ads/ad", {
    ads,
    paginate: paginate(totalPages, limit, page),
    prev: page - 1,
    next: page + 1,
    page,
    totalPages,
    currentPath: "/admin/ads",
    setting
  });
};
exports.del = async (req, res) => {
  const { id } = req.params;
  await AdModel.deleteOne({ _id: id });
  const setting = (await SettingModel.findOne()) || {};
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = page * limit - limit;
  const totalRows = await AdModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);                                              
  const ads = await AdModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  return res.render("admin/ads/ad", {
    ads,
    paginate: paginate(totalPages, limit, page),
    prev: page - 1,
    next: page + 1,
    page,
    totalPages,
    currentPath: "/admin/ads",
    setting
  });
};