import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_ALL_MANUFACTURERS } from '../queries/manufacturerQueries'; 
import { CREATE_PRODUCT } from '../mutations/productMutation';

const ProductForm = () => {
  const { data: manufacturersData, loading: manufacturersLoading, error: manufacturersError } = useQuery(GET_ALL_MANUFACTURERS);
  const [createProduct, { loading: createProductLoading, error: createProductError }] = useMutation(CREATE_PRODUCT);
  
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [errors, setErrors] = useState([]);

  if (manufacturersLoading) return <p>Loading brands...</p>;
  if (manufacturersError) return <p>Error loading brands: {manufacturersError.message}</p>;

  const manufacturers = manufacturersData?.manufacturers || [];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !category || !description || price <= 0 || amount <= 0 || !selectedManufacturer) {
      setErrors(["Please fill in all required fields."]);
      return;
    }

    try {
      const { data } = await createProduct({
        variables: {
          name,
          sku,
          category,
          description,
          price: parseFloat(price),
          amount: parseInt(amount, 10),
          manufacturer: selectedManufacturer,
        },
      });

     
      setName("");
      setSku("");
      setCategory("");
      setDescription("");
      setPrice(0);
      setAmount(0);
      setSelectedManufacturer("");
      setErrors([]);
      console.log("Product created:", data.createProduct);
    } catch (err) {
      console.error("Error creating product:", err.message);
      setErrors([err.message]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>SKU:</label>
        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea 
          value={description} 
          placeholder="Description of the product"
          onChange={(e) => setDescription(e.target.value)} required 
        />
      </div>
      <div>
        <label>Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
        <span>USD</span>
      </div>
      <div>
        <label>Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Manufacturer:</label>
        <select 
          value={selectedManufacturer} 
          onChange={(e) => setSelectedManufacturer(e.target.value)} 
          required
        >
          <option value="">Select a manufacturer</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button type="submit" disabled={createProductLoading}>
          {createProductLoading ? "Creating..." : "Create Product"}
        </button>
      </div>

      {createProductError && <p>Error: {createProductError.message}</p>}
    </form>
  );
};

export default ProductForm;
