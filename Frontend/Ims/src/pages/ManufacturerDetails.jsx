import { useQuery } from "@apollo/client";
import {useEffect} from "react"
import { useParams } from "react-router-dom";
import { GET_MANUFACTURER_DETAILS } from "../queries/manufacturerQueries";
import { Link } from "react-router-dom";

const ManufacturerDetails = () => {
    const { manufacturerId} = useParams();
    const { loading, error, data } = useQuery(GET_MANUFACTURER_DETAILS, {
        variables: { id: manufacturerId },
    });

    useEffect(() => {
        if (error) {
            console.error(error);
        }
        if (loading) {
            console.log("Loading...");
        }
        if (data) {
            console.log(data.manufacturer);
        }
    }, [loading, error, data])

    if (loading) return <p>Loading brands...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { manufacturer } = data;

  return (
    <div>
      <h1>{manufacturer.name}</h1>
      <p>{manufacturer.description}</p>
      <p>{manufacturer.country}</p>
      <p>{manufacturer.address}</p>
      <p>Contact: {manufacturer.contact.name}</p>
    <p> {manufacturer.contact.email}</p>
    <p> {manufacturer.contact.phone}</p>

    <Link to="/manufacturers">
        <button>Back</button>
        </Link>
    </div>
  )
}
export default ManufacturerDetails;