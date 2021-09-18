const express = require("express");
const router = express.Router();

//Using controllers
const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/authentication");
const { check } = require("express-validator");

//routes
router.post(
  //Route
  "/signup",
  [
    //Validation
    check("name", "Name should be atleast 3 Characters").isLength({
      min: 3,
    }),
    check("email", "Enter valid email adress").isEmail(),
    check("password", "Password should be of minimun 5 Characters ").isLength({
      min: 5,
    }),
  ], //Controller
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required ").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.authentication);
});

//Exporting the routes
module.exports = router;
