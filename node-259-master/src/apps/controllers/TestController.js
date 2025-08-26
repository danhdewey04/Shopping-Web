const UserModel = require("../models/user");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
exports.test1 = async (req, res) => {
  req.session.email = "balhbalh";
  res.send("Test 1");
};
exports.test2 = async (req, res) => {
  res.send("Test 2");
};
