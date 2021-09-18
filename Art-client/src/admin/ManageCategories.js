import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategories, deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage Categories here">
      <Link
        to="/admin/dashboard"
        className="btn btn-md btn-success mb-3 rounded"
      >
        Admin Home
      </Link>
      <div className="col-md-8 offset-md-2">
        <div className="card">
          <div className="card-header lead">Manage Category</div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <h2 className="text-center">
                  Total {categories.length} categories
                </h2>
                {categories.map((category, index) => {
                  return (
                    <div key={index}>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <div className="row text-center ">
                            <div className="col-4">
                              <h5>{category.name}</h5>
                            </div>
                            <div className="col-4">
                              <Link
                                className="btn btn-success rounded"
                                to={`/admin/category/update/${category._id}`}
                              >
                                <span>Update</span>
                              </Link>
                            </div>
                            <div className="col-4">
                              <button
                                onClick={() => {
                                  deleteThisCategory(category._id);
                                }}
                                className="btn btn-danger rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
