import { useState, useEffect, createContext } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
  // Context to manage the products state
  products: [],
  loading: false,
  error: null,
  // Context to manage the cart state
  cart: [],
  addToCart: () => { },
  updateQtyCart: () => { },
  clearCart: () => { },
  // Context to manage user session
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignUp: () => { },
  handleSignIn: () => { },
  handleSignOut: () => { }, 
});

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase
        .from('product_1v')
        .select('id, thumbnail, title, price, description');
      if (error) {
        setError(`Error fetching products: ${error.message}`);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProductsSupabse();

    // State to manage products
    //  var category = "smartphones";
    //  var limit = 10;
    //  var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;
    //
    //  async function fetchProducts() {
    //  try {
    //       const response = await fetch(apiUrl);
    //       const data = await response.json();
    //      setProducts(data.products);
    //    } catch (error) {
    //       setError(error);
    //     } finally {
    //       setLoading(false);
    //     }
    //  }
    //  fetchProducts();
  }, []);

  // State to manage the cart
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      updateQtyCart(product.id, existingProduct.quantity + 1);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function updateQtyCart(productId, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const [session, setSession] = useState(null);
  const [seetionLoading, setSessionLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionErro] = useState(null);

    async function handleSingnUp (email, password, username){
      setSessionLoading(true);
      setSessionMessage(null);
      setSessionErro(null);
      
      try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            admin: false,
          },
          emailRedirectTo: `{window.location.origin}/signin`
        },
      });
      if (error) throw error;

      if (data.user) {
       setSessionMessage("Registration sucessful! Check your email to confirm your account.");
      window.location.href = "/signin"; }
      } catch (error) {
        setSessionErro(error.message);
      } finally {
        setSessionLoading(false);
    }
  }
    async function handleSingnIn (email, password){setSessionLoading(true) }
      setSessionLoading(true);
      setSessionMessage(null);
      setSessionErro(null);
      
       try {
        const {data, error} = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        if (data.session) {
          setSession(data.session);
          setSessionMessage("Sing in successful!");
        }

      } catch (error) {
        setSessionErro(error.message);
      } finally {
        setSessionLoading(false);
    }

    async function handleSingnOut (){
      setSessionLoading(true);
      setSessionMessage(null);
      setSessionErro(null);
      
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
      setSession(null);
      window.location.href = "/";

      } catch (error) {
        setSessionErro(error.message);
      } finally {
        setSessionLoading(false);
    }
  }
  const context = {
    products: products,
    loading: loading,
    error: error,
    cart: cart,
    addToCart: addToCart,
    updateQtyCart: updateQtyCart,
    clearCart: clearCart,

  session: session,
  sessionLoading: seetionLoading,
  sessionMessage: sessionMessage,
  sessionError: sessionError,
  handleSignUp: handleSingnUp,
  handleSignIn: handleSingnIn,
  handleSignOut: handleSingnOut, 
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
    }
