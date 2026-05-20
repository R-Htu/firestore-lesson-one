
import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "⌨️ Mechanical Keyboard", price: 89 },
  { id: 2, name: "🖱️ Wireless Mouse", price: 45 },
  { id: 3, name: "🖥️ 4K Monitor", price: 399 },
  { id: 4, name: "🎧 Noise-Cancelling Headphones", price: 199 },
];

// ---- Child: Product List ----
function ProductList({ onAddToCart }) {
  return (
    <div style={{ flex: 1 }}>
      <h2>🛍️ Products</h2>
      {PRODUCTS.map((product) => (
        <div key={product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>
          <span>{product.name}</span>
          <span style={{ marginRight: "12px", color: "#64748b" }}>${product.price}</span>
          <button onClick={() => onAddToCart(product)} style={{ padding: "6px 12px", cursor: "pointer" }}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

// ---- Child: Cart Summary ----
function CartSummary({ cart, onRemove }) {
  // YOUR CODE HERE: calculate total price from cart ↓
  const total = 0;

  return (
    <div style={{ width: "260px", background: "#f8fafc", padding: "16px", borderRadius: "8px" }}>
      <h2>🛒 Cart ({cart.length})</h2>

      {cart.length === 0 && <p style={{ color: "#94a3b8" }}>Your cart is empty.</p>}

      {/* YOUR CODE HERE: map over cart and show each item with a Remove button ↓ */}

      <hr />
      <p style={{ fontWeight: "bold", fontSize: "18px" }}>Total: ${total}</p>
    </div>
  );
}

// ---- Parent: Shopping App ----
function ShoppingApp7() {
  // YOUR CODE HERE: lift cart state here ↓
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    // YOUR CODE HERE: add product to cart (BONUS: handle duplicates with quantity) ↓
  }

  function handleRemove(productId) {
    // YOUR CODE HERE: remove item from cart ↓
  }

  return (
    <div style={{ maxWidth: "760px", margin: "40px auto", fontFamily: "sans-serif", display: "flex", gap: "24px" }}>
      <ProductList onAddToCart={handleAddToCart} />
      <CartSummary cart={cart} onRemove={handleRemove} />
    </div>
  );
}

export default ShoppingApp7;

