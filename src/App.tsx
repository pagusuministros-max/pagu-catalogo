import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Send } from "lucide-react";

// --- DEFINICIÓN DE TIPOS ---
interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

interface CartItem extends Product {
  q: number;
}

interface Category {
  title: string;
  products: Product[];
}

// --- BASE DE DATOS ACTUALIZADA (+15% APLICADO) ---
const categories: Category[] = [
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
      { id: 3163, name: "Sacabocados Medianos (x16)", price: 44160, img: "https://images.unsplash.com/photo-1590212151175-e58edd96d8f4?q=80&w=800" },
      { id: 7034, name: "Set Gomas + Lápices Nena/Nene (x20)", price: 34500, img: "https://images.unsplash.com/photo-1516962080544-eac695c93791?q=80&w=800" },
    ],
  },
  {
    title: "Gomas y Útiles",
    products: [
      { id: 7065, name: "Goma Dinosaurios (x16)", price: 31464, img: "https://images.unsplash.com/photo-1618335829737-22287d5b8820?q=80&w=800" },
      { id: 7066, name: "Gomas Unicornios Marinos (x12)", price: 24840, img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800" },
      { id: 7063, name: "Goma Animalitos Kawaii (x24)", price: 24840, img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=800" },
    ],
  },
  {
    title: "Papelería y Forros",
    products: [
      { id: 20000, name: "Separadores Nº 3 (x6 hojas)", price: 1610, img: "https://images.unsplash.com/photo-1600000882773-a630f5d139ca?q=80&w=800" },
      { id: 20020, name: "Papel de Lunares (x110)", price: 96140, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800" },
      { id: 20114, name: "Papel de Forrar Plastificado", price: 874, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?q=80&w=800" },
    ],
  },
];

const formatPrice = (n: number) => `$${n.toLocaleString("es-AR")}`;

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [note, setNote] = useState("");

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === p.id);
      if (exists) {
        return prev.map((item) =>
          item.id === p.id ? { ...item, q: item.q + 1 } : item
        );
      }
      return [...prev, { ...p, q: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, q: Math.max(0, item.q + delta) } : item))
        .filter((item) => item.q > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.q, 0);

  const sendOrder = () => {
    let message = "¡Hola PAGÚ! Este es mi pedido:\n\n";
    cart.forEach((i) => {
      message += `• ${i.name} (x${i.q}) - ${formatPrice(i.price * i.q)}\n`;
    });
    message += `\n*TOTAL: ${formatPrice(total)}*`;
    if (note) message += `\n\n*Nota:* ${note}`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5491154045070?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* HEADER */}
      <header className="py-16 text-center border-b border-gray-50">
        <h1 className="text-7xl font-light tracking-tighter">PAGÚ</h1>
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mt-4">Distribución 2026</p>
      </header>

      {/* CARRITO BUTTON */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-black text-white rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <ShoppingCart size={20} />
        {cart.length > 0 && <span className="font-bold border-l pl-2 text-xs">{cart.reduce((a, b) => a + b.q, 0)}</span>}
      </button>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {categories.map((cat, idx) => (
          <section key={idx} className="mb-20">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest border-l-4 border-black pl-4">{cat.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {cat.products.map((p) => (
                <div key={p.id} className="group cursor-pointer" onClick={() => addToCart(p)}>
                  <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-4 rounded-sm">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase leading-tight mb-1">{p.name}</h4>
                  <p className="text-xs text-gray-400">{formatPrice(p.price)}</p>
                  <button className="w-full mt-3 py-2 border border-black text-[9px] font-bold uppercase hover:bg-black hover:text-white transition-colors">Agregar</button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* CARRITO LATERAL */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em]">Pedido Actual</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-300 text-xs mt-20 uppercase tracking-widest">El carrito está vacío</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase">{item.name}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 border rounded hover:bg-gray-50"><Minus size={12}/></button>
                          <span className="text-xs font-bold">{item.q}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 border rounded hover:bg-gray-50"><Plus size={12}/></button>
                        </div>
                      </div>
                      <p className="text-xs font-bold">{formatPrice(item.price * item.q)}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-auto pt-6 border-t">
                <textarea 
                  placeholder="Instrucciones adicionales..."
                  className="w-full p-4 bg-gray-50 rounded-md text-xs mb-6 outline-none resize-none"
                  rows={2}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex justify-between text-sm font-bold mb-8 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button 
                  onClick={sendOrder}
                  disabled={cart.length === 0}
                  className="w-full bg-green-500 text-white py-5 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-green-600 disabled:bg-gray-100 disabled:text-gray-400 transition-all uppercase text-[10px] tracking-widest"
                >
                  <Send size={18} /> Enviar a WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
