import ProductCard from "./productcard";

export default function ProductList({ products, addToCart }) {
  if (!products.length) return <p>No products found</p>;

  return (
    <div className="product-grid">
      {products.map(p => (
        <ProductCard
          key={p.id}
          product={p}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}