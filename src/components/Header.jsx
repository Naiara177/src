import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext, useState, useRef, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { SessionContext } from "../context/SessionContext";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { cart } = useContext(CartContext);
  const { session } = useContext(SessionContext);

  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const cartRef = useRef(null);
  const adminRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false);
      if (adminRef.current && !adminRef.current.contains(e.target)) setAdminOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const subtotal = cart.reduce((total, product) => total + (product.price || 0) * (product.quantity || 0), 0);
  const formattedSubtotal = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotal);

  return (
    <div className={styles.container}>
      <div>
        <Link to="/" className={styles.link}>
          <h1>TJA Megastore</h1>
        </Link>

        {session && (
          <div className={styles.userRow}>
            <Link to="/user" className={styles.welcomeMessage}>
              Olá, {session.user.user_metadata.username}
            </Link>

            {session.user.user_metadata.admin && (
              <div ref={adminRef} className={styles.adminMenu}>
                <button
                  className={styles.adminButton}
                  onClick={() => setAdminOpen((s) => !s)}
                  aria-expanded={adminOpen}
                >
                  Admin ▾
                </button>

                {adminOpen && (
                  <div className={styles.adminDropdown} role="menu">
                    <Link to="/user" className={styles.adminLink}>Minha Conta</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {!session && (
          <>
            <Link to="/signin" className={styles.link}>Sign In</Link>
            <Link to="/register" className={styles.link}>Register</Link>
          </>
        )}

        <ThemeToggle />

        <div
          ref={cartRef}
          className={styles.cartWrapper}
          onMouseEnter={() => setCartOpen(true)}
          onMouseLeave={() => setCartOpen(false)}
        >
          <Link to="/cart" className={styles.link}>
            <div className={styles.cartInfo}>
              <div className={styles.cartIcon}>
                <ShoppingBasket size={28} />
                {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
              </div>
              <p className={styles.cartText}>
                {totalItems === 0 ? "Carrinho vazio" : `${formattedSubtotal}`}
              </p>
            </div>
          </Link>

          {cartOpen && (
            <div className={styles.cartPreview} role="dialog" aria-label="Visualização do carrinho">
              {cart.length === 0 ? (
                <div className={styles.cartEmpty}>Seu carrinho está vazio</div>
              ) : (
                <>
                  <ul className={styles.cartList}>
                    {cart.map((item) => (
                      <li key={item.id} className={styles.cartItem}>
                        <div className={styles.itemName}>{item.name}</div>
                        <div className={styles.itemMeta}>
                          <span>Qty: {item.quantity}</span>
                          <span>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format((item.price || 0) * (item.quantity || 0))}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.cartActions}>
                    <div className={styles.cartTotal}>Total: {formattedSubtotal}</div>
                    <div className={styles.cartButtons}>
                      <Link to="/cart" className={styles.buttonPrimary}>Ver Carrinho</Link>
                      <Link to="/checkout" className={styles.buttonSecondary}>Finalizar</Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}