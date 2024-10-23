import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Col, Button } from "react-bootstrap";

function ShowProducts() {
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const respponse = await fetch("/products.json");
      const data = await respponse.json();
      setCatalog(data);
      setFilteredCatalog(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const filterProducts = () => {
    const filtered = catalog.filter((product) => product.price < 10);
    setFilteredCatalog(filtered);
  };

  const showAllProducts = () => {
    setFilteredCatalog(catalog);
  };

  const filterByCategory = (category) => {
    const filtered = catalog.filter((product) => product.category === category);
    setFilteredCatalog(filtered);
  };

  return (
    <>
      <div className="d-flex">
        {/* Left Navigation Bar */}
        <div className="bg-light p-3" style={{ width: "200px" }}>
          <h5>Navigation</h5>
          <button
            className="btn btn-primary w-100 mb-2"
            onClick={filterProducts}
          >
            Show Products with Price &lt; 10
          </button>
          <button className="btn btn-secondary w-100" onClick={showAllProducts}>
            Show All Products
          </button>
          <button
            className="btn btn-info w-100 mb-2"
            onClick={() => filterByCategory("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-info w-100 mb-2"
            onClick={() => filterByCategory("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-info w-100 mb-2"
            onClick={() => filterByCategory("jewelery")}
          >
            Jewelry
          </button>
          <button
            className="btn btn-info w-100 mb-2"
            onClick={() => filterByCategory("electronics")}
          >
            Electronics
          </button>
        </div>
      </div>
      {/* Main Content - Product Cards */}
      <div className="row">
        {filteredCatalog.map((product) => {
          return (
            <div key={product.id} className="col-md-4">
              <div className="card mb-4">
                <img
                  src={product.image}
                  className="card-img-top"
                  style={{ width: "150px", margin: "auto", paddingTop: "20px" }}
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.price} <br />
                    <strong>Description:</strong> {product.description} <br />
                    <strong>Category:</strong> {product.category} <br />
                    <strong>Rating:</strong> {product.rating.rate} (
                    {product.rating.count} reviews)
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <ShowProducts />
  </div>
);
