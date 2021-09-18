const express = require("express");
const router = express.Router();

//Controllers
const {
  getProductById,
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  photo,
  getAllUniqueCategory
} = require("../controllers/product");

const {
  isSignedIn,
  isAdmin,
  isAuthenticated
} = require("../controllers/authentication");

const { getUserById } = require("../controllers/user");

//Params
router.param("userId", getUserById);
router.param("productId", getProductById);

//Routes

//Post route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//Read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
router.get("/products", getAllProduct);

router.get("/products/categories", getAllUniqueCategory);
//Update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//Delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//Exporting the Routes
module.exports = router;
