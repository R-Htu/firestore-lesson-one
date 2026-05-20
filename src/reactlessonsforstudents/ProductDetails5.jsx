
import { useState } from "react";

const product = {
  name: "Mechanical Keyboard Pro",
  price: 129.99,
  description: "Tactile switches, RGB backlight, aluminum frame. Perfect for developers.",
  isBestseller: true,
  inStock: true,
};

function ProductDetails5({ description }) {
  return (
    <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "6px", marginTop: "8px" }}>
      <p>{description}</p>
    </div>
  );
}

export default function ProductCard() {
  const [showDetails, setShowDetails] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

// showDetail = false
// addedToCart = false
  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "sans-serif", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>

      {/* YOUR CODE HERE: show "⭐ BESTSELLER" badge if product.isBestseller ↓ */}

      <h1>{product.name}</h1>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb" }}>${product.price}</p>

      {/* YOUR CODE HERE: show "❌ Out of Stock" label if not inStock ↓ */}

      {/* Toggle Details Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        style={{ padding: "8px 16px", marginRight: "8px", cursor: "pointer" }}
      >
        {/* YOUR CODE HERE: change button text based on showDetails ↓ */}
        Toggle Details
      </button>

      {/* YOUR CODE HERE: conditionally render <ProductDetails> ↓ */}

      <div style={{ marginTop: "16px" }}>
        {/* YOUR CODE HERE: show "Add to Cart" button OR "Added to cart!" message ↓ */}
        <button
          onClick={() => setAddedToCart(true)}
          style={{ padding: "10px 20px", background: "#16a34a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          🛒 Add to Cart
        </button>
      </div>

    </div>
  );
}


