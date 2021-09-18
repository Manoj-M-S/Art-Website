import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const UserDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const UserInfo = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-3">Name :</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-3">Email :</span> {email}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to User area"
      description=""
      className="container  p-4"
    >
      <div className="col-md-8 offset-md-2">{UserInfo()}</div>
    </Base>
  );
};

export default UserDashBoard;
