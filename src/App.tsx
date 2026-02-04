import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2, Send } from "lucide-react";

// --- BASE DE DATOS PAGÚ (Lista Completa + 15%) ---
const categories = [
  {
    title: "Carpetas 3 Solapas",
    products: [
      { id: 20007, name: "Carpeta 3 Solapas Fantasy (x12)", price: 29670, img: "https://images.unsplash.com/photo-1623150502742-6a849aa94be4?q=80&w=800" },
      { id: 20004, name: "Carpeta Nº6 Frases YTD (x8)", price: 29900, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?q=80&w=800" },
      { id: 20005, name: "Carpeta 3 Solapas Holográfica (x12)", price: 24564, img: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?q=80&w=800" },
      { id: 20017, name: "Carpeta 3 Solapas Pastel (x12)", price: 24564, img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=800" },
      { id: 20010, name: "Carpeta Nº6 Kraff Arte (x8)", price: 20240, img: "https://images.unsplash.com/photo-1528939106622-b7d42750826d?q=80&w=800" },
      { id: 20012, name: "Carpeta 3 Solapas Kraff (x12)", price: 15870, img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=800" },
    ],
  },
  {
    title: "Escritura y Regalería",
    products: [
      { id: 7023, name: "Set Libreta + Bolígrafo Personajes (x18)", price: 62100, img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800" },
      { id: 3160, name: "Sellitos Personajes + Block (x18)", price: 62100, img: "https://images.unsplash.com/photo-1583244532610-2ca224767225?q=80&w=800" },
      { id: 7050, name: "Lápiz Punta Intercambiable (x48)", price: 35880, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800" },
      { id: 7034, name: "Set Gomas + Lápices Nena/Nene (x20)", price: 34500, img: "https://images.unsplash.com/photo-1516962080544-eac695c93791?q=80&w=800" },
      { id: 3163, name: "Sacabocados Medianos (x16)", price: 44160, img: "https://images.unsplash.com/photo-1590212151175-e58edd96d8f4?q=80&w=800" },
      { id: 3165, name: "Sacabocados Grandes (x16)", price: 74520, img: "https://images.unsplash.com/photo-1590212151175-e58edd96d8f4?q=80&w=800" },
    ],
  },
  {
    title: "Gomas y Útiles Escolares",
    products: [
      { id: 7065, name: "Goma Dinosaurios (x16)", price: 31464, img: "https://images.unsplash.com/photo-1618335829737-22287d5b8820?q=80&w=800" },
      { id: 7066, name: "Gomas Unicornios Marinos (x12)", price: 24840, img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800" },
      { id: 7063, name: "Goma Animalitos Kawaii (x24)", price: 24840, img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=800" },
      { id: 7062, name: "Sacapuntas con Goma Surtido (x12)", price: 21600, img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800" },
    ],
  },
  {
    title: "Papelería y Forros",
    products: [
      { id: 20000, name: "Separadores Nº 3 (x6 hojas) 230g", price: 1610, img: "https://images.unsplash.com/photo-1600000882773-a630f5d139ca?q=80&w=800" },
      { id: 20020, name: "Papel de Lunares 90g (x110)", price: 96140, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800" },
      { id: 20114, name: "Papel de Forrar Plastificado (Hoja)", price: 874, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?q=80&w=800" },
      { id: 20115, name: "Papel de Forrar Común (Hoja)", price: 483, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?q=80&w=800" },
    ],
  },
];

const formatPrice = (n) => `$${n.toLocaleString("es-AR")}`;

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [note, setNote] = useState("");

  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? {...i, q: i.q + 1} : i);
      return [...prev, {...p, q: 1}];
    });
    setIsCartOpen(true);
  };

  const updateQ = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? {...i, q: Math.max(0, i.q + delta)} : i).filter(i => i.q > 0));
  };

  const total = cart.reduce((s, i) => s + (i.price * i.q), 0);

  const sendWhatsApp = () => {
    let msg = "¡Hola PAGÚ! Este es mi pedido:\n\n";
    cart.forEach(i => msg += `• ${i.name} (x${i.q}) - ${formatPrice(i.price * i.q)}\n`);
    msg += `\n*TOTAL: ${formatPrice(total)}*`;
    if(note) msg += `\n\n*Nota:* ${note}`;
    window.location.href = `https://wa.me/5491154045070?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans antialiased">
      {/* HEADER LIMPIO */}
      <header className="py-16 text-center border-b border-gray-50">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl md:text-8xl font-light tracking-tighter">PAGÚ</motion.h1>
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mt-4">Catálogo de Distribución 2026</p>
      </header>

      {/* CARRITO FLOTANTE */}
      <button onClick={() => setIsCartOpen(true)} className="fixed bottom-6 right-6 z-50 p-4 bg-black text-white shadow-2xl rounded-full flex items-center gap-2">
        <ShoppingCart size={20} />
        {cart.length > 0 && <span className="font-bold text-xs border-l pl-2">{cart.length}</span>}
      </button>

      {/* CATÁLOGO */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {categories.map((cat, idx) => (
          <section key={idx} className="mb-20">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest border-l-4 border-black pl-4">{cat.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {cat.products.map(p => (
                <div key={p.id} className="flex flex-col group" onClick={() => addToCart(p)}>
                  <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-3 relative rounded-sm">
                    <img src={p.img} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={p.name} />
                    <div className="absolute inset-0 bg-black/5 group-active:bg-black/20 transition-colors" />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase leading-tight h-8 overflow-hidden">{p.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{formatPrice(p.price)}</p>
                  <button className="mt-2 text-[9px] uppercase font-bold border border-black py-2 hover:bg-black hover:text-white transition-colors">Agregar</button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* CARRITO LATERAL */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex justify-end">
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="w-full max-w-md bg-white h-full p-6 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest">Tu Pedido</h3>
                <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-6">
                {cart.length === 0 ? <p className="text-center text-gray-400 text-xs py-20">No hay productos en el pedido</p> : 
                  cart.map(i => (
                    <div key={i.id} className="flex justify-between items-center border-b pb-4">
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase">{i.name}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button onClick={() => updateQ(i.id, -1)} className="p-1 border rounded"><Minus size={12}/></button>
                          <span className="text-xs font-bold">{i.q}</span>
                          <button onClick={() => updateQ(i.id, 1)} className="p-1 border rounded"><Plus size={12}/></button>
                        </div>
                      </div>
                      <p className="text-xs font-bold">{formatPrice(i.price * i.q)}</p>
                    </div>
                  ))
                }
              </div>

              <div className="pt-6 border-t mt-auto">
                <textarea placeholder="¿Alguna nota especial?" className="w-full p-3 bg-gray-50 text-xs mb-4 rounded border-none focus:ring-1 focus:ring-black outline-none" rows="2" onChange={(e) => setNote(e.target.value)} />
                <div className="flex justify-between text-sm font-bold mb-6">
                  <span>TOTAL</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button onClick={sendWhatsApp} disabled={cart.length === 0} className="w-full bg-green-500 text-white py-4 rounded font-bold flex items-center justify-center gap-2 hover:bg-green-600 disabled:bg-gray-200">
                  <Send size={16} /> ENVIAR PEDIDO POR WHATSAPP
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
