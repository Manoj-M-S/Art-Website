//importing REQUIRED DEPENDECIES
const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

require("dotenv").config();

//user signup route
exports.signup = (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array()[0].msg });
  }

  //Saving user
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.send(400).json({
        error: "User not saved",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

//user signin route
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array()[0].msg });
  }

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "Email does not exists",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    //CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

//user signout route
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User signout" });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "authentication",
});

//custom middlewares
//is the user allowed to modify this account.
exports.isAuthenticated = (req, res, next) => {
  let checker =
    req.profile &&
    req.authentication &&
    req.profile._id == req.authentication._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

//is the user is admin
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not admin ",
    });
  }
  next();
};
