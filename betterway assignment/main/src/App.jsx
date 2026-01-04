import { useEffect, useMemo, useState } from "react";
import ProductList from "./components/productlist";
import Filters from "./components/filters";
import Cart from "./components/cart";
import "./style.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search)
      list = list.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );

    if (category !== "all")
      list = list.filter(p => p.category === category);

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, category, sort]);

  const addToCart = product => {
    setCart(prev => {
      const qty = prev[product.id]?.qty || 0;
      if (qty >= product.stock) return prev;

      return {
        ...prev,
        [product.id]: { product, qty: qty + 1 }
      };
    });
  };

  const updateQty = (id, qty) => {
    setCart(prev => {
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: { ...prev[id], qty } };
    });
  };

  return (
    <div className="container">
      <h1>Mini E-Commerce</h1>

      <Filters
        products={products}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <div className="layout">
        <ProductList products={filteredProducts} addToCart={addToCart} />
        <Cart cart={cart} updateQty={updateQty} />
      </div>
    </div>
  );
}