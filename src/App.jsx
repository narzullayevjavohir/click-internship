import { useState, useEffect, useCallback } from "react";
import CartList from "./components/CartList";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }, []);

  useEffect(() => {
    window.addToCart = addToCart;
  }, [addToCart]);

  useEffect(() => {
    import("./vanilla/products.js").then((module) => {
      module.loadProducts();
    });
  }, []);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="app-wrapper">
      <div className="main-container">
        <section className="products-section">
          <h2 className="section-title">Products</h2>
          <div id="products-grid"></div>
        </section>

        <section className="cart-section">
          <h2 className="section-title">Cart</h2>
          <CartList
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
          <div className="cart-summary">
            <p>Total items: {totalItems}</p>
            <p>Total price: ${totalPrice}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
