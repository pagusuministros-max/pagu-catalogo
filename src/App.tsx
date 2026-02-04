import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Send, Check } from "lucide-react";

// --- TIPOS ---
interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

interface CartItem extends Product {
  q: number;
}

// --- PRODUCTOS PAGÚ (Aumento 15% ya sumado) ---
const PRODUCTS: { [key: string]: Product[] } = {
  "Carpetas 3 Solapas": [
    { id: 20007, name: "Carpeta 3 Solapas Fantasy (x12)", price: 29670, img: "https://images.unsplash.com/photo-1623150502742-6a849aa94be4?q=80&w=800" },
    { id: 20004, name: "Carpeta Nº6 Frases YTD (x8)", price: 29900, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?q=80&w=800" },
    { id: 20005, name: "Carpeta 3 Solapas Holográfica (x12)", price: 24564, img: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?q=80&w=800" },
    { id: 20017, name: "Carpeta 3 Solapas Pastel (x12)", price: 24564, img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=800" },
  ],
  "Escritura y Regalería": [
    { id: 7023, name: "Set Libreta + Bolígrafo Personajes (x18)", price: 62100, img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800" },
    { id: 3160, name: "Sellitos Personajes + Block (x18)", price: 62100, img: "https://images.unsplash.com/photo-1583244532610-2ca224767225?q=80&w=800" },
    { id: 7050, name: "Lápiz Punta Intercambiable (x48)", price: 35880, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800" },
    { id: 3163, name: "Sacabocados Medianos (x16)", price: 44160, img: "https://images.unsplash.com/photo-1590212151175-e58edd96d8f4?q=80&w=800" },
  ],
  "Gomas y Útiles": [
    { id: 7065, name: "Goma Dinosaurios (x16)", price: 31464, img: "https://images.unsplash.com/photo-1618335829737-22287d5b8820?q=80&w=800" },
    { id: 7063, name: "Goma Animalitos Kawaii (x24)", price: 24840, img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=800" },
  ],
};

const formatPrice = (n: number) => `$${n.toLocaleString("es-AR")}`;

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");

  const addToCart = (p: Product) => {
    setCart((curr) => {
      const found = curr.find((i) => i.id === p.id);
      if (found) return curr.map((i) => (i.id === p.id ? { ...i, q: i.q + 1 } : i));
      return [...curr, { ...p, q: 1 }];
    });
    setIsOpen(true);
  };

  const updateQ = (id: number, d: number) => {
    setCart((curr) =>
      curr.map((i) => (i.id === id ? { ...i, q: i.q + d } : i)).filter((i) => i.q > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.q, 0);

  const handleSend = () => {
    let msg = "¡Hola PAGÚ! Pedido:\n\n";
    cart.forEach((i) => (msg += `• ${i.name} (x${i.q}) - ${formatPrice(i.price * i.q)}\n`));
    msg += `\n*TOTAL: ${formatPrice(total)}*`;
    if (note) msg += `\n\nNota: ${note}`;
    window.open(`https://wa.me/5491154045070?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* HEADER */}
      <header className="py-20 text-center border-b border-zinc-100">
        <h1 className="text-7xl font-light tracking-tighter">PAGÚ</h1>
        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 mt-4">Catálogo 2026</p>
      </header>

      {/* BOTÓN CARRITO */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-zinc-900 text-white rounded-full shadow-2xl flex items-center gap-3 active:scale-95 transition-transform"
      >
        <ShoppingCart size={20} />
        {cart.length > 0 && <span className="font-bold border-l border-zinc-700 pl-3 text-xs">{cart.reduce((a, b) => a + b.q, 0)}</span>}
      </button>

      {/* GRILLA PRODUCTOS */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {Object.entries(PRODUCTS).map(([catTitle, items]) => (
          <section key={catTitle} className="mb-24">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-12 border-b border-zinc-100 pb-4">{catTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
              {items.map((p) => (
                <div key={p.id} className="group cursor-pointer" onClick={() => addToCart(p)}>
                  <div className="aspect-[4/5] bg-zinc-50 mb-4 overflow-hidden rounded-sm relative">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  <h3 className="text-[10px] font-bold uppercase leading-tight mb-1 tracking-tight">{p.name}</h3>
                  <p className="text-xs text-zinc-400 font-medium">{formatPrice(p.price)}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* CARRITO (OVERLAY) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-[10px] font-bold uppercase tracking-widest">Tu Carrito</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-300">
                    <ShoppingCart size={40} strokeWidth={1} />
                    <p className="text-[10px] uppercase mt-4 tracking-widest">Vacío</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start border-b border-zinc-50 pb-6">
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-tight">{item.name}</p>
                        <div className="flex items-center gap-5 mt-4">
                          <button onClick={() => updateQ(item.id, -1)} className="p-1 hover:text-zinc-400"><Minus size={14}/></button>
                          <span className="text-xs font-bold tabular-nums">{item.q}</span>
                          <button onClick={() => updateQ(item.id, 1)} className="p-1 hover:text-zinc-400"><Plus size={14}/></button>
                        </div>
                      </div>
                      <span className="text-xs font-bold ml-4">{formatPrice(item.price * item.q)}</span>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-8 mt-auto">
                  <textarea 
                    placeholder="Nota para el pedido..."
                    className="w-full p-4 bg-zinc-50 rounded-lg text-xs mb-8 outline-none focus:ring-1 focus:ring-zinc-200 resize-none"
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex justify-between items-end mb-10">
                    <span className="text-[10px] font-bold uppercase text-zinc-400">Total</span>
                    <span className="text-2xl font-light tracking-tighter">{formatPrice(total)}</span>
                  </div>
                  <button
