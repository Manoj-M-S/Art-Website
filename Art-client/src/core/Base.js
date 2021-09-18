import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./navbar";

const Base = ({
  title = "My title",
  description = "My Description",
  className = " p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron  text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer  mt-auto py-3">
      <div className="container-fluid">
        <div className="row text-left">
          <div className="col-md-5 ">
            <h1 className="text-light">About Us</h1>
            <p className="text-muted">
              All artwork appearing on this website is the property of Manoj M S
              and is protected under India and International law. The artwork
              may not be reproduced, stored, or manipulated without the written
              permission of the artist.
            </p>
            <p className="pt-4 text-muted">
              Copyright @2019 All rights reserved | This is made by
              <span> MANOJ M S </span>
            </p>
          </div>
          <div className="col-md-5">
            <h4 className="text-light">Newsletter</h4>
            <p className="text-muted">Stay Updated</p>
            <form className="form-inline">
              <div className="input-group pr-5">
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  placeholder="Email"
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-2 col-sm-12">
            <h4 className="text-light">Follow Us</h4>
            <p className="text-muted">Let us be social</p>
            <div className="column">
              <ul>
                <li>
                  <a href="https://www.facebook.com/manoj_makarasu/">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/manoj_makarasu/">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/ManojMakarasu/">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Base;
