import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2, Smartphone } from "lucide-react";

// --- PRODUCTOS PAGÚ (Aumento 15% aplicado) ---
const categories = [
  {
    title: "Carpetas 3 Solapas",
    products: [
      { id: 20007, name: "Carpeta 3 Solapas Fantasy (x12)", price: 29670, img: "https://images.unsplash.com/photo-1623150502742-6a849aa94be4?auto=format&fit=crop&q=80&w=800" },
      { id: 20004, name: "Carpeta Nº6 3 Solapas Frases (x8)", price: 29900, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?auto=format&fit=crop&q=80&w=800" },
      { id: 20005, name: "Carpeta 3 Solapas Holográfica (x12)", price: 24564, img: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=800" },
      { id: 20017, name: "Carpeta 3 Solapas Pastel (x12)", price: 24564, img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800" },
      { id: 20010, name: "Carpeta Nº6 Kraff Arte (x8)", price: 20240, img: "https://images.unsplash.com/photo-1528939106622-b7d42750826d?auto=format&fit=crop&q=80&w=800" },
    ],
  },
  {
    title: "Papelería & Separadores",
    products: [
      { id: 20000, name: "Separadores Nº3 (x6 hojas) 230g", price: 1610, img: "https://images.unsplash.com/photo-1600000882773-a630f5d139ca?auto=format&fit=crop&q=80&w=800" },
      { id: 20020, name: "Papel de Lunares 90g (x110)", price: 96140, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800" },
      { id: 20114, name: "Papel de Forrar Plastificado (Hoja)", price: 9660, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?auto=format&fit=crop&q=80&w=800" },
    ],
  },
  {
    title: "Sets Regalería & Escritura",
    products: [
      { id: 7023, name: "Set Libreta + Bolígrafo Personajes (x18)", price: 62100, img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800" },
      { id: 3160, name: "Sellitos Personajes + Block (x18)", price: 62100, img: "https://images.unsplash.com/photo-1583244532610-2ca224767225?auto=format&fit=crop&q=80&w=800" },
      { id: 7050, name: "Lápiz Punta Intercambiable (x48)", price: 35880, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800" },
      { id: 3163, name: "Sacabocados Medianos (x16)", price: 44160, img: "https://images.unsplash.com/photo-1590212151175-e58edd96d8f4?auto=format&fit=crop&q=80&w=800" },
      { id: 7034, name: "Set Gomas + Lápices (x20)", price: 34500, img: "https://images.unsplash.com/photo-1516962080544-eac695c93791?auto=format&fit=crop&q=80&w=800" },
    ],
  },
  {
    title: "Gomas & Sacapuntas",
    products: [
      { id: 7065, name: "Goma Dinosaurios (x16)", price: 31464, img: "https://images.unsplash.com/photo-1618335829737-22287d5b8820?auto=format&fit=crop&q=80&w=800" },
      { id: 7066, name: "Gomas Unicornios Marinos (x12)", price: 24840, img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
      { id: 7063, name: "Goma Animalitos Kawaii (x24)", price: 24840, img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?auto=format&fit=crop&q=80&w=800" },
    ],
  },
];

const formatPrice = (n) => `$${n.toLocaleString("es-AR")}`;

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? {...i, q: i.q + 1} : i);
      return [...prev, {...p, q: 1}];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? {...i, q: Math.max(0, i.q + delta)} : i).filter(i => i.q > 0));
  };

  const total = cart.reduce((s, i) => s + (i.price * i.q), 0);

  const sendOrder = () => {
    let msg = "¡Hola PAGÚ! Este es mi pedido:\n\n";
    cart.forEach(i => msg += `• ${i.name} (x${i.q}) - ${formatPrice(i.price * i.q)}\n`);
    msg += `\n*Total: ${formatPrice(total)}*`;
    window.location.href = `https://wa.me/5491154045070?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white">
      {/* HEADER */}
      <header className="py-24 text-center border-b border-gray-50">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-8xl font-light tracking-tighter">PAGÚ</motion.h1>
        <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mt-6">Distribuciones & Suministros 2026</p>
      </header>

      {/* BOTÓN CARRITO */}
      <button onClick={() => setIsCartOpen(true)} className="fixed top-8 right-8 z-50 p-3 bg-white border border-gray-100 shadow-xl rounded-full">
        <ShoppingCart size={22} strokeWidth={1} />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
            {cart.reduce((a, b) => a + b.q, 0)}
          </span>
        )}
      </button>

      {/* PRODUCTOS */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {categories.map((cat, idx) => (
          <section key={idx} className="mb-32">
            <h3 className="text-3xl font-light mb-12 border-b border-gray-50 pb-6 uppercase tracking-[0.2em]">{cat.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {cat.products.map(p => (
                <motion.div whileHover={{ y: -5 }} key={p.id} className="group cursor-pointer" onClick={() => addToCart(p)}>
                  <div className="aspect-[3/4] overflow-hidden bg-[#FBFBFB] mb-6 relative">
                    <img src={p.img} className="w-full h-full object-cover mix-blend-multiply grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" alt={p.name} />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-black text-white text-[10px] px-6 py-3 uppercase tracking-widest font-bold">Añadir al pedido</span>
                    </div>
                  </div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-800">{p.name}</h4>
                  <p className="text-sm text-gray-400 mt-2 font-light">{formatPrice(p.price)}</p>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* CARRITO LATERAL */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/10 backdrop-blur-md flex justify-end">
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="w-full max-w-md bg-white h-full p-10 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-xs font-bold uppercase tracking-[0.4em]">Resumen de Pedido</h3>
                <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform"><X size={24} strokeWidth={1} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-10">
                {cart.length === 0 ? <p className="text-center text-gray-300 text-xs mt-20 uppercase tracking-widest">El carrito está vacío</p> : 
                  cart.map(i => (
                    <div key={i.id} className="flex justify-between items-start border-b border-gray-50 pb-6">
                      <div className="flex-1 pr-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider">{i.name}</p>
                        <div className="flex items-center gap-6 mt-4">
                          <button onClick={(e) => {e.stopPropagation(); updateQuantity(i.id, -1)}} className="text-gray-300 hover:text-black"><Minus size={14}/></button>
                          <span className="text-xs font-bold">{i.q}</span>
                          <button onClick={(e) => {e.stopPropagation(); updateQuantity(i.id, 1)}} className="text-gray-300 hover:text-black"><Plus size={14}/></button>
                        </div>
                      </div>
                      <p className="text-xs font-bold">{formatPrice(i.price * i.q)}</p>
                    </div>
                  ))
                }
              </div>
              <div className="pt-10 border-t border-gray-50">
                <div className="flex justify-between text-sm font-bold mb-10 uppercase tracking-widest">
                  <span className="text-gray-400">Total Neto</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button onClick={sendOrder} className="w-full bg-black text-white py-8 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#1a1a1a] transition-colors">
                  Enviar por WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center border-t border-gray-50 opacity-20">
        <p className="text-[9px] uppercase tracking-[0.5em]">PAGÚ Distribuciones - Buenos Aires 2026</p>
      </footer>
    </div>
  );
}
