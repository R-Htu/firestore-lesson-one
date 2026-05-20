import { useState } from "react";

const product = {
  name: "Mechanical Keyboard Pro",
  price: 129.99,
  description: "Tactile switches, RGB backlight, aluminum frame. Perfect for developers.",
  isBestseller: true,
  inStock: false,
};

function ProductDetails5({ description }) {
  return (
    <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "6px", marginTop: "8px" }}>
      <p>{description}</p>
    </div>
  );
}

function ProductCard5full() {
  const [showDetails, setShowDetails] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "sans-serif", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>

      {/* Bestseller badge */}
      {product.isBestseller && (
        <span style={{
          display: "inline-block",
          background: "#fef9c3",
          color: "#854d0e",
          fontSize: "12px",
          fontWeight: "600",
          padding: "4px 10px",
          borderRadius: "999px",
          marginBottom: "12px",
        }}>
          ⭐ BESTSELLER
        </span>
      )}

      <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>{product.name}</h1>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb", marginBottom: "12px" }}>
        ${product.price}
      </p>

      {/* Out of stock label */}
      {!product.inStock && (
        <p style={{
          color: "#dc2626",
          fontWeight: "600",
          fontSize: "14px",
          marginBottom: "12px",
        }}>
          ❌ Out of Stock
        </p>
      )}

      {/* Toggle Details Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        style={{ padding: "8px 16px", marginRight: "8px", cursor: "pointer", borderRadius: "6px", border: "1px solid #e2e8f0" }}
      >
        {showDetails ? "🔼 Hide Details" : "🔽 Show Details"}
      </button>

      {/* Conditionally render ProductDetails */}
      {showDetails && <ProductDetails5 description={product.description} />}

      {/* Add to Cart or Confirmed message */}
      <div style={{ marginTop: "16px" }}>
        {addedToCart ? (
          <p style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#f0fdf4",
            color: "#16a34a",
            fontWeight: "600",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "1px solid #86efac",
          }}>
            ✅ Added to cart!
          </p>
        ) : (
          <button
            onClick={() => setAddedToCart(true)}
            disabled={!product.inStock}
            style={{
              padding: "10px 20px",
              background: product.inStock ? "#16a34a" : "#94a3b8",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: product.inStock ? "pointer" : "not-allowed",
              fontWeight: "600",
            }}
          >
            🛒 Add to Cart
          </button>
        )}
      </div>

    </div>
  );
}

export default ProductCard5full;