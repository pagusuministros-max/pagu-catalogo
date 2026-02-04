
src/
 ├─ components/
 │   ├─ Header.tsx
 │   ├─ ProductGrid.tsx
 │   ├─ SideCart.tsx
 ├─ data/
 │   └─ products.ts
 ├─ App.tsx
 ├─ main.tsx
 ├─ index.css
export const categories = [
  {
    title: "Carpetas 3 Solapas",
    products: [
      { id: 20007, name: "Carpeta 3 Solapas Fantasy (x12)", price: 29670, img: "https://images.unsplash.com/photo-1623150502742-6a849aa94be4?auto=format&fit=crop&q=80&w=800" },
      { id: 20004, name: "Carpeta Nº6 3 Solapas Frases (x8)", price: 29900, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?auto=format&fit=crop&q=80&w=800" },
    ],
  },
  {
    title: "Papelería & Separadores",
    products: [
      { id: 20000, name: "Separadores Nº3 (x6 hojas) 230g", price: 1610, img: "https://images.unsplash.com/photo-1600000882773-a630f5d139ca?auto=format&fit=crop&q=80&w=800" },
    ],
  },
];

export const formatPrice = (n: number) =>
  `$${n.toLocaleString("es-AR")}`;
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="py-24 text-center border-b">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl font-light tracking-tight"
      >
        PAGU
      </motion.h1>
      <p className="text-xs tracking-widest text-gray-400 mt-6">
        Distribuciones & Suministros 2026
      </p>
    </header>
  );
}
import { motion } from "framer-motion";
import { categories, formatPrice } from "../data/products";

export default function ProductGrid({ addToCart }: any) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      {categories.map(cat => (
        <section key={cat.title} className="mb-24">
          <h2 className="text-2xl mb-10">{cat.title}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {cat.products.map(p => (
              <motion.div
                whileHover={{ y: -5 }}
                key={p.id}
                onClick={() => addToCart(p)}
                className="cursor-pointer"
              >
                <img src={p.img} alt={p.name} className="mb-4" />
                <h4>{p.name}</h4>
                <p>{formatPrice(p.price)}</p>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { formatPrice } from "../data/products";

export default function SideCart({
  cart,
  isOpen,
  setIsOpen,
  updateQuantity,
  total,
  sendOrder,
}: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-10"
        >
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>

          <div className="mt-10 space-y-6">
            {cart.map((i: any) => (
              <div key={i.id} className="flex justify-between">
                <div>
                  <p>{i.name}</p>
                  <div className="flex gap-3">
                    <button onClick={() => updateQuantity(i.id, -1)}>
                      <Minus size={14} />
                    </button>
                    <span>{i.q}</span>
                    <button onClick={() => updateQuantity(i.id, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <p>{formatPrice(i.price * i.q)}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-4">Total: {formatPrice(total)}</p>
            <button
              onClick={sendOrder}
              className="w-full bg-black text-white py-3"
            >
              Enviar por WhatsApp
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import { useState } from "react";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import SideCart from "./components/SideCart";

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (p: any) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, q: i.q + 1 } : i);
      return [...prev, { ...p, q: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev
        .map(i => (i.id === id ? { ...i, q: Math.max(0, i.q + delta) } : i))
        .filter(i => i.q > 0)
    );
  };

  const total = cart.reduce((s, i) => s + i.price * i.q, 0);

  const sendOrder = () => {
    let msg = "¡Hola PAGU! Este es mi pedido:\n\n";
    cart.forEach(i => {
      msg += `• ${i.name} (x${i.q})\n`;
    });
    msg += `\nTotal: $${total}`;
    window.location.href = `https://wa.me/5491154045070?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <Header />
      <ProductGrid addToCart={addToCart} />
      <SideCart
        cart={cart}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        total={total}
        sendOrder={sendOrder}
      />
    </>
  );
}
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
@tailwind base;
@tailwind components;
@tailwind utilities;
npm install framer-motion lucide-react
npm run dev
