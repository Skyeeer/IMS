import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_MANUFACTURERS } from "../queries/manufacturerQueries";
import styles from "../styles/Products.module.css"
import { Link } from "react-router-dom";

const ManufacturerList = () => {
    const { loading, error, data } = useQuery(GET_ALL_MANUFACTURERS);
    
    useEffect(() => {
        if (error) {
            console.error(error);
        }
        if (loading) {
            console.log("Loading manufacturers...");
        }
        if (data) {
            console.log(data.getAllManufacturers);
        }
    }, [data, loading, error])

    const showManufacturers = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
    
        if (!data || !data.manufacturers || data.manufacturers.length === 0) {
          return <p>No brands found.</p>;
        }

        return (
            <div>
              <h2>Our brands</h2>
              <ul className={styles["products-list"]}>
                {data.manufacturers.map((manufacturer) => (
                  <Link style={{textDecoration: "none", color: "white"}} to={`/manufacturers/${manufacturer.id}`}>
                  <li className={styles["products-list-item"]} key={manufacturer.id}>
                    <p><strong>{manufacturer.name}</strong></p>
                    <p>Country: {manufacturer.country}</p>
                    
                  </li>
                  </Link>
                ))}
              </ul>
      
              <Link to="/">
              <button>Back</button>
              </Link>
            </div>
            
          );

}
return <div>{showManufacturers()}</div>;
}
export default ManufacturerList;