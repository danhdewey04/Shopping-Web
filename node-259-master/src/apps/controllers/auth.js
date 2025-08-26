const UserModel = require("../models/user");
const SettingModel = require("../models/setting");
exports.getLogin = async (req, res) => {
  const email = req.cookies.remember_email || '';
  const password = req.cookies.remember_password || '';
  const setting = await SettingModel.findOne() || {};
  res.render("admin/login", { email, password, error: null, setting });
};
exports.postLogin = async (req, res) => {
  const { email, password, remember } = req.body;
  const user = await UserModel.findOne({ email });
  const setting = await SettingModel.findOne() || {};
  let error;
  if (user && user.password === password) {
    req.session.email = email;
    req.session.password = password;
    if (remember) {
      res.cookie('remember_email', email, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie('remember_password', password, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    } else {
      res.clearCookie('remember_email');
      res.clearCookie('remember_password');
    }
    if (user.role === 1) {
      return res.redirect("/admin/dashboard");
    } else {
      return res.redirect("/admin/guest");
    }
  } else {
    error = !user ? "Email không hợp lệ!" : "Mật khẩu không hợp lệ!";
    return res.render("admin/login", { email: email || '', password: password || '', error, setting });
  }
};
exports.logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/admin/login");
};
