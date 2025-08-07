import "./styles/theme.css";
import "./styles/global.css";
import { Cart } from "./components/Cart";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router";
import { ProductList } from "./components/ProductList";
import { CartProvider } from "./service/CartContext";
import { Login } from "./service/Login";
import { LoginProvider } from "./service/LoginContext";
import { Register } from "./service/Register";
import { ProductAdmin } from "./service/ProductAdmin";
import { Link } from "react-router";

export default function App() {

  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
            <Route path="/" element={<ProductList />} />
             <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<ProductAdmin />} />
        </Routes>
      </CartProvider>
    </>
  );
}
