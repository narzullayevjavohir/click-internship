import CartItem from "./CartItem";

function CartList({ cartItems, removeFromCart, updateQuantity }) {
  if (cartItems.length === 0) {
    return <p>Savat bo'sh</p>;
  }
  return (
    <div className="cart-list">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
}

export default CartList;
