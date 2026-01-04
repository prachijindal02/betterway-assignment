export default function Cart({ cart, updateQty }) {
  const items = Object.values(cart);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce(
    (s, i) => s + i.qty * i.product.price,
    0
  );

  if (items.length === 0) {
    return (
      <div className="cart">
        <h3>🛒 Cart</h3>
        <p>Empty Cart</p>
      </div>
    );
  }

  return (
    <div className="cart sticky">
      <h3>🛒 Cart</h3>

      {items.map(({ product, qty }) => (
        <div key={product.id} className="cart-item">
          <div>
            <b>{product.title}</b>
            <p>₹ {product.price}</p>
          </div>

          <div className="qty">
            <button onClick={() => updateQty(product.id, qty - 1)}>
              −
            </button>

            <span>{qty}</span>

            <button
              onClick={() =>
                qty < product.stock &&
                updateQty(product.id, qty + 1)
              }
            >
              +
            </button>
          </div>

          {/* 🔴 REMOVE BUTTON */}
          <button
            className="remove-btn"
            onClick={() => updateQty(product.id, 0)}
          >
            Remove
          </button>
        </div>
      ))}

      <hr />

      <p>Total Items: <b>{totalItems}</b></p>
      <p>Total Price: <b>₹ {totalPrice}</b></p>
    </div>
  );
}