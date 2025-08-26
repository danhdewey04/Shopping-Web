exports.test = (req, res, next) => {
  //
  if (!req.session.email) {
    return res.send("Authentication required!");
  }
  next();
};
