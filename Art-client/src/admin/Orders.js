import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
//import { isAuthenticated } from "../auth/helper";
import { getOrder } from "../core/helper/orderHelper";

const OrderDetails = ({ match }) => {
  const [Order, setOrder] = useState([]);

  //const { user, token } = isAuthenticated();

  const preload = (orderId) => {
    getOrder(orderId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrder(data);
      }
    });
  };

  useEffect(() => {
    preload(match.params.orderId);
  }, []);

  const name = Order && Order.products ? Order.products[0].name : null;

  return (
    <Base title="Welcome admin" description="Manage Orders here">
      <Link
        to="/admin/dashboard"
        className="btn btn-md btn-success mb-3 rounded"
      >
        Admin Home
      </Link>
      <div className="col-md-8 offset-md-2">
        <div className="card ">
          <h4 className="card-header ">Order Details</h4>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-5">
                    <h5>
                      <b>Product :</b>
                    </h5>
                  </div>
                  <div className="col-5">
                    <h5> {`${name}`} </h5>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-1"></div>

                  <div className="col-5">
                    <h5>
                      <b>Order Id : </b>
                    </h5>
                  </div>
                  <div className="col-5">
                    <h5> {Order._id} </h5>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-1"></div>

                  <div className="col-5">
                    <h5>
                      <b>Transaction Id : </b>
                    </h5>
                  </div>
                  <div className="col-5">
                    <h5> {Order.transaction_id} </h5>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-1"></div>

                  <div className="col-5">
                    <h5>
                      <b>Status : </b>
                    </h5>
                  </div>
                  <div className="col-5">
                    <h5> {Order.status} </h5>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-1"></div>

                  <div className="col-5">
                    <h5>
                      <b>Amount :</b>
                    </h5>
                  </div>
                  <div className="col-5">
                    <h5>
                      <i class="fas fa-rupee-sign"></i> {Order.amount}
                    </h5>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-1"></div>

                  <div className="col-5">
                    <h5>
                      <b>Created At : </b>
                    </h5>
                  </div>
                  <div className="col-5">
                    <h5> {Order.createdAt} </h5>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default OrderDetails;
