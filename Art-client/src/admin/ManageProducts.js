import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteMyProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link
        to="/admin/dashboard"
        className="btn btn-md btn-success mb-3 rounded"
      >
        Admin Home
      </Link>
      <div className="col-md-8 offset-md-2">
        <div className="card">
          <div className="card-header lead">Manage products</div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <h2 className="text-center">
                  Total {products.length} products
                </h2>

                {products &&
                  products.map((product, index) => {
                    return (
                      <div key={index}>
                        <ul className="list-group">
                          <li className="list-group-item">
                            <div className="row text-center ">
                              <div className="col-4">
                                <h5>{product.name}</h5>
                              </div>
                              <div className="col-4">
                                <Link
                                  className="btn btn-success rounded"
                                  to={`/admin/product/update/${product._id}`}
                                >
                                  <span>Update</span>
                                </Link>
                              </div>
                              <div className="col-4">
                                <button
                                  onClick={() => {
                                    deleteMyProduct(product._id);
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

export default ManageProducts;
