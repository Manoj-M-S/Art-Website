import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getOrders } from "../core/helper/orderHelper";

const ManageOrders = () => {
  const [Orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage Orders here">
      <h2 className="mb-4 ">All Orders:</h2>
      <Link
        to="/admin/dashboard"
        className="btn btn-md btn-success mb-3 rounded"
      >
        Admin Home
      </Link>
      <div className="col-md-10 offset-md-1">
        <div className="card">
          <div className="card-header lead">Manage Orders</div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <h2 className="text-center">Total {Orders.length} Orders</h2>
                <br />
                <ul>
                  <div className="row text-center ">
                    <div className="col-4">
                      <h5>
                        <b>Order ID</b>
                      </h5>
                    </div>
                    <div className="col-4">
                      <h5>
                        <b>Status</b>
                      </h5>
                    </div>
                    <div className="col-4">
                      <h5>
                        <b>Details</b>
                      </h5>
                    </div>
                  </div>
                </ul>

                {Orders &&
                  Orders.map((order, index) => {
                    return (
                      <div key={index}>
                        <ul className="list-group">
                          <li className="list-group-item">
                            <div className="row text-center ">
                              <div className="col-4">
                                <h5>{order._id}</h5>
                              </div>
                              <div className="col-4">
                                <h5>{order.status}</h5>
                              </div>
                              <div className="col-4">
                                <Link
                                  className="btn btn-success rounded"
                                  to={`/admin/order/${order._id}`}
                                >
                                  <span>Details</span>
                                </Link>
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

export default ManageOrders;
