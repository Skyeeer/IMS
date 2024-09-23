import { useQuery } from "@apollo/client";
import {useEffect} from "react"
import { useParams } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../queries/productQueries";
import { Link } from "react-router-dom";

const ProductDetails = () => {
    const { productId} = useParams();
    const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
        variables: { id: productId },
    });

    useEffect(() => {
        if (error) {
            console.error(error);
        }
        if (loading) {
            console.log("Loading...");
        }
        if (data) {
            console.log(data.product);
        }
    }, [loading, error, data])

    if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { product } = data;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.sku}</p>
      <p>Quantity: {product.amountInStock}</p>
      <p>Price:{product.price} $</p>

      <Link to="/products">
        <button>Back</button>
        </Link>
    </div>
  )
}
export default ProductDetails;