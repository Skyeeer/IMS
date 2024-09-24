import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_ALL_PRODUCTS } from "../queries/productQueries.js";
import { Link } from "react-router-dom";
import styles from "../styles/Products.module.css"

const ProductList = () => {
  console.log("GET_ALL_PRODUCTS", GET_ALL_PRODUCTS);
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    if (loading) {
      console.log("Loading products...");
    }
    if (error) {
      console.error("Error fetching products:", error.message);
    }
    if (data) {
      console.log(data.products);
    }
  }, [loading, error, data]);

  const showProducts = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!data || !data.products || data.products.length === 0) {
      return <p>No products found.</p>;
    }

    return (
      <div classname={styles["products-window"]}>
        <h2>Product List</h2>
        <ul className={styles["products-list"]}>
          {data.products.map((product) => (
            <Link style={{ textDecoration: "none", color: "white" }} to={`/products/${product.id}`}>
              <li className={styles["products-list-item"]} key={product.id}>
                <p><strong>{product.name}</strong></p>
                <p>Price: {product.price} $</p>
                <p>Category: {product.category}</p>
                <p>Manufacturer: {product.manufacturer.name}</p>

              </li>
            </Link>
          ))}
        </ul>

        <Link to="/">
          <button>Back</button>
        </Link>
      </div>

    );
  };

  return <div>{showProducts()}</div>;
};

export default ProductList;
