import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Send, ChevronRight, Search } from "lucide-react";

// --- TIPOS ---
interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
}

interface CartItem extends Product {
  q: number;
}

// --- BASE DE DATOS MEJORADA (+15% Aplicado) ---
const PRODUCTS: Product[] = [
  // CARPETAS
  { id: 20007, category: "Carpetas", name: "Carpeta 3 Solapas Fantasy (x12)", price: 29670, img: "https://images.unsplash.com/photo-1623150502742-6a849aa94be4?q=80&w=800" },
  { id: 20004, category: "Carpetas", name: "Carpeta Nº6 Frases YTD (x8)", price: 29900, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?q=80&w=800" },
  { id: 20005, category: "Carpetas", name: "Carpeta 3 Solapas Holográfica (x12)", price: 24564, img: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?q=80&w=800" },
  { id: 20017, category: "Carpetas", name: "Carpeta 3 Solapas Pastel (x12)", price: 24564, img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=800" },
  { id: 20010, category: "Carpetas", name: "Carpeta Nº6 Kraff Arte (x8)", price: 20240, img: "https://images.unsplash.com/photo-1528939106622-b7d42750826d?q=80&w=800" },
  
  // REGALERÍA Y SETS
  { id: 7023, category: "Sets Premium", name: "Set Libreta + Bolígrafo Personajes (x18)", price: 62100, img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800" },
  { id: 7025, category: "Sets Premium", name: "Set Libreta Full Accesorios (x12)", price: 54000, img: "https://images.unsplash.com/photo-1516962080544-eac695c93791?q=80&w=800" },
  { id: 3160, category: "Sets Premium", name: "Sellitos Personajes + Block (x18)", price: 62100, img: "https://images.unsplash.com/photo-1583244532610-2ca224767225?q=80&w=800" },
  { id: 3163, category: "Útiles", name: "Sacabocados Medianos (x16)", price: 44160, img: "https://images.unsplash.com/photo-1590212151175-e58edd96d8f4?q=80&w=800" },
  { id: 3165, category: "Útiles", name: "Sacabocados Grandes (x16)", price: 74520, img: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=800" },
  
  // GOMAS Y ESCRITURA
  { id: 7065, category: "Escritura", name: "Goma Dinosaurios (x16)", price: 31464, img: "https://images.unsplash.com/photo-1618335829737-22287d5b8820?q=80&w=800" },
  { id: 7063, category: "Escritura", name: "Goma Animalitos Kawaii (x24)", price: 24840, img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=800" },
  { id: 7050, category: "Escritura", name: "Lápiz Punta Intercambiable (x48)", price: 35880, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800" },
  
  // PAPELERÍA
  { id: 20000, category: "Papelería", name: "Separadores Nº3 230g (x6h)", price: 1610, img: "https://images.unsplash.com/photo-1600000882773-a630f5d139ca?q=80&w=800" },
  { id: 20020, category: "Papelería", name: "Papel de Lunares (x110)", price: 96140, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800" },
  { id: 20114, category: "Papelería", name: "Papel Forrar Plastificado", price: 874, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?q=80&w=800" },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => 
    PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const addToCart = (p: Product) => {
    setCart(curr => {
      const found = curr.find(i => i.id === p.id);
      if (found) return curr.map(i => i.id === p.id ? { ...i, q: i.q + 1 } : i);
      return [...curr, { ...p, q: 1 }];
    });
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.q), 0);

  const sendOrder = () => {
    let msg = "¡Hola PAGÚ! Este es mi pedido:\n\n";
    cart.forEach(i => msg += `• ${i.name} (x${i.q}) - $${(i.price * i.q).toLocaleString()}\n`);
    msg += `\n*TOTAL: $${total.toLocaleString()}*`;
    window.open(`https://wa.me/5491154045070?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter italic">PAGÚ.</h1>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" placeholder="Buscar productos..." 
              className="pl-10 pr-4 py-2 bg-zinc-100 rounded-full text-xs outline-none w-64"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingCart size={22} strokeWidth={1.5} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.reduce((a,b) => a + b.q, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="py-20 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Distribuidora Oficial</span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mt-4 mb-8">Papelería con estilo para tu negocio.</h2>
        </motion.div>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((p) => (
            <motion.div layout key={p.id} className="group relative">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100 rounded-2xl mb-4 relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <button 
                  onClick={() => addToCart(p)}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl"
                >
                  Rápida +
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">{p.category}</p>
              <h3 className="text-sm font-semibold leading-tight pr-4">{p.name}</h3>
              <p className="text-sm font-light mt-1 text-zinc-500">${p.price.toLocaleString()}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* SIDEBAR CART */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[60] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-xl font-bold tracking-tighter">Tu Pedido</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8">
                {cart.length === 0 ? (
                  <p className="text-center text-zinc-400 text-sm mt-20">No hay productos aún.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.img} className="w-16 h-20 object-cover rounded-lg bg-zinc-100" />
                      <div className="flex-1">
                        <h4 className="text-[11px] font-bold uppercase">{item.name}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center border rounded-full px-2 py-1">
                            <button onClick={() => {
                              setCart(curr => curr.map(i => i.id === item.id ? {...i, q: Math.max(0, i.q-1)} : i).filter(i => i.q > 0))
                            }}><Minus size={12}/></button>
                            <span className="mx-3 text-xs font-bold">{item.q}</span>
                            <button onClick={() => addToCart(item)}><Plus size={12}/></button>
                          </div>
                          <span className="text-xs font-medium text-zinc-400">${(item.price * item.q).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-8 border-t border-zinc-100 mt-8">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-zinc-400 text-xs uppercase tracking-widest">Total Estimado</span>
                  <span className="text-3xl font-black tracking-tighter">${total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={sendOrder}
                  disabled={cart.length === 0}
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-transform disabled:bg-zinc-200"
                >
                  <Send size={18} /> CONFIRMAR POR WHATSAPP
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
