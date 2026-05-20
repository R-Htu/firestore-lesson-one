import { useState } from "react";

const product = {
  name: "Mechanical Keyboard Pro",
  price: 129.99,
  description:
    "Tactile switches, RGB backlight, aluminum frame. Perfect for developers.",
  isBestseller: true,
  inStock: false,
};

function ProductDetails({ description }) {
  return (
    <div className="bg-slate-100 rounded-md p-3 mt-2">
      <p className="text-sm text-slate-700">{description}</p>
    </div>
  );
}

function ProductCardTw() {
  const [showDetails, setShowDetails] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <div className="max-w-sm mx-auto mt-10 font-sans border border-slate-200 rounded-xl p-6 bg-white shadow-sm">

      {/* Bestseller badge */}
      {product.isBestseller && (
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          ⭐ BESTSELLER
        </span>
      )}

      {/* Product name */}
      <h1 className="text-xl font-semibold text-slate-900 mb-2">
        {product.name}
      </h1>

      {/* Price */}
      <p className="text-2xl font-bold text-blue-600 mb-3">
        ${product.price.toFixed(2)}
      </p>

      {/* Out of stock label */}
      {!product.inStock && (
        <p className="text-red-600 font-semibold text-sm mb-3">
          ❌ Out of Stock
        </p>
      )}

      {/* Toggle details button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="px-4 py-2 mr-2 text-sm text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
      >
        {showDetails ? "🔼 Hide Details" : "🔽 Show Details"}
      </button>

      {/* Conditionally rendered details */}
      {showDetails && <ProductDetails description={product.description} />}

      {/* Add to cart / confirmation */}
      <div className="mt-4">
        {addedToCart ? (
          <p className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 font-semibold text-sm px-5 py-2.5 rounded-md border border-green-300">
            ✅ Added to cart!
          </p>
        ) : (
          <button
            onClick={() => setAddedToCart(true)}
            disabled={!product.inStock}
            className={`px-5 py-2.5 text-white text-sm font-semibold rounded-md border-0 transition-colors ${
              product.inStock
                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                : "bg-slate-400 cursor-not-allowed"
            }`}
          >
            🛒 Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCardTw;
