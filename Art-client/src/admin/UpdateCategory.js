import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "../admin/helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError(false);
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => (
    <div className="mt-4">
      <Link
        className="btn btn-sm btn-success mb-4 rounded"
        to="/admin/categories"
      >
        Managa categories
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return (
        <div>
          <h4 className="text-success">Category Updated Succesfully!</h4>
        </div>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return (
        <div>
          <h4 className="text-success">Failed to Update Category </h4>
        </div>
      );
    }
  };

  const performRedirect = () => {
    if (success) {
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

  const UpdateCategoryForm = () => {
    return (
      <form>
        <div className="card">
          <div className="card-header lead">Enter Category</div>
          <div className="card-body">
            <div className="form-group">
              <p className="lead">Update Category</p>
              <input
                type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For Ex.Summer"
              />
              <button
                onClick={onSubmit}
                className="btn btn-outline-danger rounded"
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update a Category here"
      description="New category for photos"
      className="container  p-4"
    >
      <div className="col-md-8 offset-md-2">
        {successMessage()}
        {warningMessage()}
        {UpdateCategoryForm()}
        {goBack()}
        {performRedirect()}
      </div>
    </Base>
  );
};

export default UpdateCategory;
