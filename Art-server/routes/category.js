const express = require("express");
const router = express.Router();

//Importing all controllers
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category");
const {
  isSignedIn,
  isAdmin,
  isAuthenticated
} = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");

//Params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Actual routes

//Create routes
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//Read route
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update route
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//Delete route
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

//Exporting routes
module.exports = router;
