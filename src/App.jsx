import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { CartProvider } from "./service/CartContext";
import { Login } from "./components/Login";
import { Cadastro } from "./components/Cadastro";
import { GerenciadorProdutos } from "./components/Gerenciador";

export default function App() {

  return (
    <>
      <CartProvider>
        <Header />
        <div style={{ paddingTop: "1rem" }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/gerenciar" element={<GerenciadorProdutos />} />
          </Routes>
        </div>
      </CartProvider>
    </>
  );
}
