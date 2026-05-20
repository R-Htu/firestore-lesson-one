import { useState } from "react";

const PRODUCTS = [
  { id: 1, emoji: "⌨️", name: "Mechanical keyboard", price: 89 },
  { id: 2, emoji: "🖱️", name: "Wireless mouse", price: 45 },
  { id: 3, emoji: "🖥️", name: "4K monitor", price: 399 },
  { id: 4, emoji: "🎧", name: "Noise-cancelling headphones", price: 199 },
];

function ProductCard({ product, inCart, onAdd }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px",
      padding: "16px", display: "flex", flexDirection: "column", gap: "10px",
    }}>
      <div style={{ fontSize: "28px" }}>{product.emoji}</div>
      <div style={{ fontSize: "14px", fontWeight: 500 }}>{product.name}</div>
      <div style={{ fontSize: "15px", fontWeight: 500 }}>${product.price}</div>
      <button
        onClick={() => onAdd(product)}
        style={{
          marginTop: "auto", padding: "8px 0", fontSize: "13px", borderRadius: "8px",
          border: "1px solid", cursor: "pointer", width: "100%",
          background: inCart ? "#f0fdf4" : "transparent",
          borderColor: inCart ? "#86efac" : "#cbd5e1",
          color: inCart ? "#16a34a" : "#1e293b",
        }}
      >
        {inCart ? "✓ Added" : "+ Add to cart"}
      </button>
    </div>
  );
}

function CartItem({ item, onRemove, onChangeQty }) {
  return (
    <div style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
      <span style={{ fontSize: "20px" }}>{item.emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.name}
        </div>
        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "3px" }}>
          ${item.price} each {item.qty > 1 && <span style={{ background: "#f1f5f9", borderRadius: "4px", padding: "1px 6px" }}>${(item.price * item.qty).toFixed(2)}</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
          <button onClick={() => onChangeQty(item.id, -1)} style={{ width: 22, height: 22, border: "1px solid #e2e8f0", borderRadius: "4px", background: "transparent", cursor: "pointer", fontSize: "14px" }}>−</button>
          <span style={{ fontSize: "13px", fontWeight: 500, minWidth: 18, textAlign: "center" }}>{item.qty}</span>
          <button onClick={() => onChangeQty(item.id, 1)} style={{ width: 22, height: 22, border: "1px solid #e2e8f0", borderRadius: "4px", background: "transparent", cursor: "pointer", fontSize: "14px" }}>+</button>
        </div>
      </div>
      <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "18px", alignSelf: "flex-start" }}>×</button>
    </div>
  );
}

function CartPanel({ cart, onRemove, onChangeQty }) {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) {
    return (
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px" }}>
        <p style={{ fontSize: "13px", color: "#64748b" }}>Your cart label</p>
        <div style={{ textAlign: "center", padding: "24px 0", color: "#94a3b8" }}>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛒</div>
          <p style={{ fontSize: "13px" }}>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px" }}>
      <p style={{ fontSize: "13px", fontWeight: 500, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>Your cart</p>
      {cart.map(item => (
        <CartItem key={item.id} item={item} onRemove={onRemove} onChangeQty={onChangeQty} />
      ))}
      <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <span style={{ fontSize: "14px", color: "#64748b" }}>{totalQty} item{totalQty !== 1 ? "s" : ""}</span>
          <span style={{ fontSize: "18px", fontWeight: 500 }}>${total.toFixed(2)}</span>
        </div>
        <button style={{ width: "100%", padding: "10px", fontSize: "14px", fontWeight: 500, border: "none", borderRadius: "8px", background: "#0f172a", color: "#fff", cursor: "pointer" }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default function ShoppingApp() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function changeQty(id, delta) {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      if (item.qty + delta <= 0) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i);
    });
  }

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "24px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #e2e8f0" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 500 }}>Tech store</h1>
        <span style={{ fontSize: "14px", color: "#64748b" }}>🛒 {totalQty}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "20px", alignItems: "start" }}>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 500, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>Products</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
            {PRODUCTS.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                inCart={!!cart.find(i => i.id === p.id)}
                onAdd={addToCart}
              />
            ))}
          </div>
        </div>
        <CartPanel cart={cart} onRemove={removeFromCart} onChangeQty={changeQty} />
      </div>
    </div>
  );
}