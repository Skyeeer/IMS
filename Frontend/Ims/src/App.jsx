import ProductList from './pages/GetProducts'
import ProductDetails from './pages/ProductDetails'
import Homepage from './pages/Homepage'
import ManufacturerList from './pages/GetBrands'
import ManufacturerDetails from './pages/ManufacturerDetails'
import Navbar from './Navbar'
import { BrowserRouter, Routes, Route } from'react-router-dom'
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
<Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/manufacturers" element={<ManufacturerList />} />
        <Route path="/manufacturers/:manufacturerId" element={<ManufacturerDetails />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
