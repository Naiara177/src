import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";


export function Header() {
  const { cart } = useContext(CartContext);

  return (
  <>
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to="/">Produtos</Link></li>
          <li><Link to="/cart">Carrinho</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Cadastro</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
    </header>
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>
      <Link to="/cart" className={styles.link}>
        <div className={styles.cartInfo}>
          <ShoppingBasket size={32} />
          <div className={styles.cartIcon}>
            {cart.length > 0 && (
              <span className={styles.cartCount}>
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
          <p>
            Total: ${" "}
            {cart
              .reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  </>
);
}