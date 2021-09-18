const User = require("../models/user");
const Order = require("../models/order");

//middleware
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "No user found!",
      });
    }
    req.profile = user;

    next();
  });
};

exports.getUser = (req, res) => {
  //todo : get back here for password
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find().exec((error, users) => {
    if (error || !users) {
      return res.status(400).json({
        error: "No users found!",
      });
    }
    res.json(users);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (error, user) => {
      if (error) {
        res.status(400).json({
          error: "Updating the database failed ",
        });
      }
      user.salt = undefined;
      user.entry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((error, order) => {
      if (error) {
        return res.status(400).json({
          error: "No order in this account",
        });
      }
      return res.json(order);
    });
};

//middleware
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //store in database
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (error, purchases) => {
      if (error) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
