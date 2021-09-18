import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to Art store">
      <div className=" text-center">
        <div className="lined-heading">
          <h2>Our Collection</h2>
        </div>
        <div className="container mt-4">
          <div className="card-deck">
            <div className="row justify-content-center">
              {products.map((product, index) => {
                return (
                  <div key={index} className="col-md-4 col-12">
                    <Card product={product} />
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
