export default function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-img"
      />

      <div className="product-info">
        <h3>{product.title}</h3>

        <p className="category">{product.category}</p>

        <p className="price">₹ {product.price}</p>

        <p className={product.stock > 0 ? "stock in" : "stock out"}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <button
          disabled={product.stock === 0}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}