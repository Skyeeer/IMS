import {Link} from "react-router-dom"
import styles from "./styles/Navbar.module.css"

export default function Navbar() {

    return (
        <nav className={styles.navbar}>
            <Link to="/">Home</Link>
            <Link to="/products">Shop</Link>
            <Link to="/manufacturers">Brands</Link>
            <Link to="/createproduct">New Product</Link>
        </nav>
    )
}