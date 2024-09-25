import { Link } from "react-router-dom"
import styles from "./styles/Navbar.module.css"

export default function Navbar() {

    return (
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <Link to="/"><li className={styles["menu-item"]}>Home</li></Link>
                <Link to="/products"><li className={styles["menu-item"]}>Shop</li></Link>
                <Link to="/manufacturers"><li className={styles["menu-item"]}>Brands</li></Link>
                <Link to="/createproduct"><li className={styles["menu-item"]}>New Product</li></Link>
            </ul>
        </nav>
    )
}