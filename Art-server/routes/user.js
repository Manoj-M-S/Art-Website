const express = require("express");
const router = express.Router();

//accessing controllers
const {
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
  userPurchaseList
} = require("../controllers/user");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin
} = require("../controllers/authentication");

//my routes
router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.get("/users", getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

//exporting these routes
module.exports = router;
