import ProductList from './pages/GetProducts'
import Navbar from './Navbar'
import { BrowserRouter, Routes, Route } from'react-router-dom'
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>

      <p>Welcome to our webshop!</p>
    </BrowserRouter>
  )
}

export default App
