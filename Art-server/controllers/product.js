const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fileSystem = require("fs");

//Middleware
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return res.status(400).json({
          error: "Product Not Found"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (error, fields, file) => {
    if (error) {
      return res.status(400).json({
        error: "Problem creating the file"
      });
    }

    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let product = new Product(fields);

    //Handling the file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fileSystem.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //saving to database
    product.save((error, product) => {
      if (error) {
        res.status(400).json({
          error: "Saving product failed"
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//Middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.getAllProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: "No product Found"
        });
      }
      res.json(products);
    });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (error, fields, file) => {
    if (error) {
      return res.status(400).json({
        error: "Problem updating the file"
      });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields);

    //Handling the file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fileSystem.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //saving to database
    product.save((error, product) => {
      if (error) {
        res.status(400).json({
          error: "Updation of product failed"
        });
      }
      res.json(product);
    });
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;

  product.remove((error, product) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to delete this product"
      });
    }
    res.json({
      message: ` ${product.name} product Successfull deleted `
    });
  });
};

exports.getAllUniqueCategory = (req, res) => {
  product.distinct("category", {}, (error, category) => {
    if (error) {
      res.status(400).json({
        error: "No category found"
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter: {
          _id: prod._id
        },
        update: {
          $inc: {
            stock: -prod.count,
            sold: +prod.count
          }
        }
      }
    };
  });
  Product.bulkWrite(myOperations, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "Bulk Operation failed"
      });
    }
    next();
  });
};
