import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, CreateaProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    error: "",
    createdProduct: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    error,
    createdProduct,
    formData,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    CreateaProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-2"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} Created Successfully</h4>
    </div>
  );

  const warningMessage = () => (
    <div
      className="alert alert-success mt-2"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error} Failed</h4>
    </div>
  );

  const createProductForm = () => (
    <div className="card">
      <div className="card-header lead">Enter Category</div>
      <div className="card-body">
        <form>
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success rounded">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories &&
                categories.map((cate, index) => (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>

          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-success rounded mb-2"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <Base
      title="Add a product here"
      description="Welcome to product creation"
      className="container  p-4"
    >
      <Link
        to="/admin/dashboard"
        className="btn btn-md btn-success mb-3 rounded"
      >
        Admin Home
      </Link>

      <div className="col-md-8 offset-md-2">
        {successMessage()}
        {warningMessage()}
        {createProductForm()}
      </div>
    </Base>
  );
};

export default AddProduct;
