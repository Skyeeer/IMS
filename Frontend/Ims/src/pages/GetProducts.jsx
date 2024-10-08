
import { useQuery, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_ALL_MANUFACTURERS } from '../queries/manufacturerQueries';
import { GET_PRODUCTS_BY_MANUFACTURER, GET_ALL_PRODUCTS, GET_LOW_STOCK_PRODUCTS } from '../queries/productQueries';
import styles from '../styles/Products.module.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [selectedManufacturerId, setSelectedManufacturerId] = useState(null);
  const [showLowStock, setShowLowStock] = useState(false);

  // all product request
  const { loading: allLoading, error: allError, data: allData } = useQuery(GET_ALL_PRODUCTS);

  // all manufacturers request
  const { data: manufacturersData } = useQuery(GET_ALL_MANUFACTURERS);
  const manufacturers = manufacturersData?.manufacturers || [];

  const [getProductsByManufacturer, { loading: filterLoading, error: filterError, data: filterData }] = useLazyQuery(GET_PRODUCTS_BY_MANUFACTURER, {
    variables: { manufacturerId: selectedManufacturerId },
    skip: !selectedManufacturerId // if manufacturer is not selected, no request is made
  });

  const [getLowStockProducts, { loading: lowStockLoading, error: lowStockError, data: lowStockData }] = useLazyQuery(
    GET_LOW_STOCK_PRODUCTS,
    {
      variables: { limit: 10 },
    }
  );

  useEffect(() => {
    if (selectedManufacturerId) {
      getProductsByManufacturer();
    }
  }, [selectedManufacturerId]);

  // show all products
  const showProducts = () => {
    if (selectedManufacturerId) {
      // filtered products
      if (filterLoading) return <p>Loading filtered products...</p>;
      if (filterError) return <p>Error: {filterError.message}</p>;
      if (!filterData || !filterData.productsByManufacturer || filterData.productsByManufacturer.length === 0) {
        return <p>No products found for this manufacturer.</p>;
      }
      return (
        <div>
          <h2>Filtered products</h2>
          <ul className={styles['products-list']}>
            {filterData.productsByManufacturer.map((product) => (
              <Link
                key={product.id}
                style={{ textDecoration: "none", color: "white" }}
                to={`/products/${product.id}`}
              >
                <li className={styles['products-list-item']} key={product.id}>
                  <p><strong>{product.name}</strong></p>
                  <p>Price: {product.price} $</p>
                  <p>Category: {product.category}</p>
                  <p>Manufacturer: {product.manufacturer.name}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      );
    } else {
      // show all products
      if (allLoading) return <p>Loading all products...</p>;
      if (allError) return <p>Error: {allError.message}</p>;
      if (!allData || !allData.products || allData.products.length === 0) {
        return <p>No products found.</p>;
      }
      return (
        <div>
          <h2>All Products</h2>
          <ul className={styles['products-list']}>
            {allData.products.map((product) => (
              <Link
                key={product.id}
                style={{ textDecoration: "none", color: "white" }}
                to={`/products/${product.id}`}
              >
                <li className={styles['products-list-item']} key={product.id}>
                  <p><strong>{product.name}</strong></p>
                  <p>Price: {product.price} $</p>
                  <p>Category: {product.category}</p>
                  <p>Manufacturer: {product.manufacturer.name}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      );
    }
  };

  const showLowStockProducts = () => {
    if (lowStockLoading) return <p>Loading low stock products...</p>;
    if (lowStockError) return <p>Error: {lowStockError.message}</p>;
    if (!lowStockData || !lowStockData.lowStockProducts || lowStockData.lowStockProducts.length === 0) {
      return <p>No low stock products found.</p>;
    }
    return (
      <div>
        <h2>Low Stock Products</h2>
        <ul className={styles['products-list']}>
          {lowStockData.lowStockProducts.map((product) => (
            <Link
              key={product.id}
              style={{ textDecoration: "none", color: "white" }}
              to={`/products/${product.id}`}
            >
              <li className={styles['products-list-item']} key={product.id}>
                <p><strong>{product.name}</strong></p>
                <p>Price: {product.price} $</p>
                <p>Category: {product.category}</p>
                <p>Manufacturer: {product.manufacturer.name}</p>
                <p>Amount in Stock: {product.amountInStock}</p>
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


  return (
    <div>
      <div>
        <button
          onClick={() => setSelectedManufacturerId(null)}
          className={!selectedManufacturerId ? styles.selectedButton : ''}
        >
          All
        </button>
        {manufacturers.map((manufacturer) => (
          <button
            key={manufacturer.id}
            onClick={() => {
              setSelectedManufacturerId(manufacturer.id);
              setShowLowStock(false);
            }}
            className={selectedManufacturerId === manufacturer.id ? styles.selectedButton : ''}
          >
            {manufacturer.name}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedManufacturerId(null);
            setShowLowStock(true);
            getLowStockProducts();
          }}
          className={showLowStock ? styles.selectedButton : styles.lowStock}
        >
          Low in Stock
        </button>
      </div>
      {showLowStock ? showLowStockProducts() : showProducts()}
    </div>
  );
};

export default ProductList;
