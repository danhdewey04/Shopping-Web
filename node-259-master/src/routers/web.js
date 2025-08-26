const express = require("express");
const router = express.Router();
const passport = require("passport");
const TestController = require("../apps/controllers/TestController");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const GuestController = require("../apps/controllers/guest");
const HomeController = require("../apps/controllers/home");
const ProductController = require("../apps/controllers/product");
const UserController = require("../apps/controllers/user");
const CategoryController = require("../apps/controllers/category");
const AdController = require("../apps/controllers/ad");
const CommentController = require("../apps/controllers/comment");
const SettingController = require("../apps/controllers/setting");
const UploadMiddleware = require("../apps/middlewares/upload");
const AuthMiddleware = require("../apps/middlewares/auth");

/*router.get("/test1", TestController.test1);
router.get("/test2", TestMiddleware.test, TestController.test2);*/
// router.get("/form", TestController.Form);
// router.post("/form", TestController.Test);
router.post("/admin/setting", AuthMiddleware.checkAdmin, UploadMiddleware.fields([
  { name: "logo", maxCount: 1 },
  { name: "footer_img", maxCount: 1 }
]), SettingController.postSetting);
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);
router.post(
  "/admin/login",
  AuthMiddleware.checkLogin,
  AuthController.postLogin
);
router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);
router.get(
  "/admin/dashboard",
  AuthMiddleware.checkAdmin,
  AdminController.dashboard
);
router.get(
  "/admin/guest", 
  GuestController.index
);
router.get(
  "/admin/home", 
  HomeController.index
);

// Google OAuth2 login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/admin/dashboard');
  }
);

// Facebook OAuth2 login
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/admin/login' }),
  (req, res) => {
    res.redirect('/admin/dashboard');
  }
);

//Product
router.get(
  "/admin/products",
  AuthMiddleware.checkAdmin,
  ProductController.index
);
router.get(
  "/admin/products/create",
  AuthMiddleware.checkAdmin,
  ProductController.create
);
router.post(
  "/admin/products/store",
  AuthMiddleware.checkAdmin,
  UploadMiddleware.single("thumbnail"),
  ProductController.store
);
router.get(
  "/admin/products/edit/:id",
  AuthMiddleware.checkAdmin,
  ProductController.edit
);
router.post(
  "/admin/products/update/:id",
  AuthMiddleware.checkAdmin,
  UploadMiddleware.single("thumbnail"),
  ProductController.update
);
router.get(
  "/admin/products/delete/:id",
  AuthMiddleware.checkAdmin,
  ProductController.del
);

//User
router.get(
  "/admin/users",
  AuthMiddleware.checkAdmin,
  UserController.index
);

router.get(
  "/admin/users/create",
  AuthMiddleware.checkAdmin,
  UserController.create
);
router.post(
  "/admin/users/store",
  AuthMiddleware.checkAdmin,
  UserController.store
);
router.get(
  "/admin/users/edit/:id",
  AuthMiddleware.checkAdmin,
  UserController.edit
);
router.post(
  "/admin/users/update/:id",
  AuthMiddleware.checkAdmin,
  UserController.update
);
router.get(
  "/admin/users/delete/:id",
  AuthMiddleware.checkAdmin,
  UserController.del
);

//Category
router.get(
  "/admin/categories",
  AuthMiddleware.checkAdmin,
  CategoryController.index
);
router.get(
  "/admin/categories/create",
  AuthMiddleware.checkAdmin,
  CategoryController.create
);

router.post(
  "/admin/categories/store",
  AuthMiddleware.checkAdmin,
  CategoryController.store
);
router.get(
  "/admin/categories/edit/:id",
  AuthMiddleware.checkAdmin,
  CategoryController.edit
);
router.post(
  "/admin/categories/update/:id",
  AuthMiddleware.checkAdmin,
  UploadMiddleware.single("thumbnail"),
  CategoryController.update
);
router.get(
  "/admin/categories/delete/:id",
  AuthMiddleware.checkAdmin,
  CategoryController.del
);

//Ad
router.get(
  "/admin/ads",
  AuthMiddleware.checkAdmin,
  AdController.index
);

router.get(
  "/admin/ads/create",
  AuthMiddleware.checkAdmin,
  AdController.create
);

router.post(
  "/admin/ads/store",
  AuthMiddleware.checkAdmin,
  AdController.store
);
router.get(
  "/admin/ads/edit/:id",
  AuthMiddleware.checkAdmin,
  AdController.edit
);
router.post(
  "/admin/ads/update/:id",
  AuthMiddleware.checkAdmin,
  AdController.update
);
router.get(
  "/admin/ads/delete/:id",
  AuthMiddleware.checkAdmin,
  AdController.del
);
router.post("/admin/ads/status/:id", AuthMiddleware.checkAdmin, async (req, res) => {
  const AdModel = require("../apps/models/ad");
  await AdModel.findByIdAndUpdate(req.params.id, { status: req.body.status === 'true' });
  res.sendStatus(200);
});

//Comment
router.get(
  "/admin/comment",
  AuthMiddleware.checkAdmin,
  CommentController.index
);
router.post("/comment/store", async (req, res) => {
  const CommentModel = require("../apps/models/comment");
  const prd_id = req.body.prd_id;
  const full_name = req.body.full_name;
  const email = req.body.email;
  const body = req.body.body;
  if (!prd_id || !full_name || !email || !body) {
    return res.status(400).send("Thiếu thông tin bình luận!");
  }
  await CommentModel.create({ prd_id, full_name, email, body });
  return res.redirect("/admin/comment");
});
router.get(
  "/admin/comment/delete/:id",
  AuthMiddleware.checkAdmin,
  CommentController.del
);
router.post("/admin/comment/status/:id", AuthMiddleware.checkAdmin, async (req, res) => {
  const CommentModel = require("../apps/models/comment");
  await CommentModel.findByIdAndUpdate(req.params.id, { status: req.body.status === 'true' });
  res.sendStatus(200);
});

//Setting
router.get(
  "/admin/setting", 
  AuthMiddleware.checkAdmin,
  SettingController.getSetting,
);
router.post(
  "/admin/setting", 
  AuthMiddleware.checkAdmin,
  SettingController.postSetting,
);

module.exports = router;
