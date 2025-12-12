function CartItem({ item, removeFromCart, updateQuantity }) {
  console.log(item);

  return (
    <div className="cart-item">
      <div className="cart-info">
        <img src={item.image} alt={item.title} className="cart-img" />
        <h4>{item.title}</h4>
        <p>${item.price}</p>
      </div>

      <div className="cart-actions">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          -
        </button>

        <span>{item.quantity}</span>

        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          +
        </button>

        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
          O‘chirish
        </button>
      </div>
    </div>
  );
}

export default CartItem;
