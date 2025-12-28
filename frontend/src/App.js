import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/products")
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch("/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>🛒 E-Commerce App</h1>

      <h2>Products</h2>
      <ul>
        {products.map(p => <li key={p}>{p}</li>)}
      </ul>

      <h2>Orders</h2>
      <ul>
        {orders.map(o => <li key={o}>{o}</li>)}
      </ul>
    </div>
  );
}

export default App;
