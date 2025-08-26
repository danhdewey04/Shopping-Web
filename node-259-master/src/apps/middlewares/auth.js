exports.checkAdmin = async (req, res, next) => {
  // Nếu đăng nhập thường
  if (req.session.email && req.session.password) {
    return next();
  }
  // Nếu đăng nhập qua Passport (Google/Facebook)
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // Nếu chưa đăng nhập
  return res.redirect("/admin/login");
};
exports.checkLogin = async (req, res, next) => {
  if (req.session.email && req.session.password)
    return res.redirect("/admin/dashboard");
  next();
};
