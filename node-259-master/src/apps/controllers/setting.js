const SettingModel = require("../models/setting");

exports.getSetting = async (req, res) => {
  const setting = await SettingModel.findOne() || {};
  res.render("admin/setting", {
    setting,
    currentPath: req.path
  });
};

exports.postSetting = async (req, res) => {
  let setting = await SettingModel.findOne();
  // Lấy đường dẫn file upload nếu có
  const logoPath = req.files && req.files.logo && req.files.logo[0] ? 
    "/static/" + req.files.logo[0].filename : req.body.logo || (setting ? setting.logo : "");
  const footerPath = req.files && req.files.footer && req.files.footer[0] ? 
    "/static/" + req.files.footer[0].filename : req.body.footer || (setting ? setting.footer : "");
  if (!setting) {
    setting = new SettingModel({
      logo: logoPath,
      footer: footerPath,
    });
  } else {
    setting.logo = logoPath;
    setting.footer = footerPath;
  }
  await setting.save();
  res.redirect("/admin/setting");
};
