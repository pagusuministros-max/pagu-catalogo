
  import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Send, Search } from "lucide-react";

// --- INTERFACES PARA TYPESCRIPT ---
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

// --- BASE DE DATOS (Precios con +15% incluido) ---
const PRODUCTS: Product[] = [
  { id: 20007, category: "Carpetas", name: "Carpeta 3 Solapas Fantasy (x12)", price: 29670, img: "https://images.unsplash.com/photo-1623150502742-6a849aa94be4?auto=format&fit=crop&q=80&w=800" },
  { id: 20004, category: "Carpetas", name: "Carpeta Nº6 Frases YTD (x8)", price: 29900, img: "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?auto=format&fit=crop&q=80&w=800" },
  { id: 20005, category: "Carpetas", name: "Carpeta 3 Solapas Holográfica (x12)", price: 24564, img: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=800" },
  { id: 7023, category: "Sets", name: "Set Libreta + Bolígrafo Personajes (x18)", price: 62100, img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800" },
  { id: 3160, category: "Sets", name: "Sellitos Personajes + Block (x18)", price: 62100, img: "https://images.unsplash.com/photo-1583244532610-2ca224767225?auto=format&fit=crop&q=80&w=800" },
  { id: 7065, category: "Útiles", name: "Goma Dinosaurios (x16)", price: 31464, img: "https://images.unsplash.com/photo-1618335829737-22287d5b8820?auto=format&fit=crop&q=80&w=800" },
  { id: 20000, category: "Papelería", name: "Separadores Nº3 230g (x6h)", price: 1610, img: "https://images.unsplash.com/photo-1600000882773-a630f5d139ca?auto=format&fit=crop&q=80&w=800" },
  { id: 20020, category: "Papelería", name: "Papel de Lunares (x110)", price: 96140, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800" }
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => 
    PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const addToCart = (p: Product) => {
    setCart(curr => {
      const found = curr.find(i => i.id === p.id);
      if (found) return curr.map(i => i.id === p.id ? { ...i, q: i.q + 1 } : i);
      return [...curr, { ...p, q: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQ = (id: number, delta: number) => {
    setCart(curr => curr.map(i => i.id === id ? { ...i, q: i.q + delta } : i).filter(i => i.q > 0));
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.q), 0);

  const sendOrder = () => {
    let msg = "¡Hola PAGÚ! Pedido:\n\n";
    cart.forEach(i => msg += `• ${i.name} (x${i.q}) - $${(i.price * i.q).toLocaleString()}\n`);
    msg += `\n*TOTAL: $${total.toLocaleString()}*`;
    window.open(`https://wa.me/5491154045070?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
      {/* HEADER */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter italic">PAGÚ.</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
            <input 
              type="text" placeholder="Buscar..." 
              className="pl-9 pr-4 py-2 bg-zinc-100 rounded-full text-xs outline-none w-32 md:w-64 focus:ring-1 focus:ring-zinc-300"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-zinc-50 rounded-full transition-colors">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cart.reduce((a, b) => a + b.q, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* CATALOGO */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="group border border-transparent hover:border-zinc-100 p-2 rounded-2xl transition-all">
              <div className="aspect-[4/5] overflow-hidden bg-zinc-50 rounded-xl mb-4 relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => addToCart(p)}
                  className="absolute bottom-3 left-3 right-3 bg-white shadow-lg py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:bg-black hover:text-white"
                >
                  Agregar +
                </button>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-zinc-400 mb-1">{p.category}</p>
              <h3 className="text-xs font-bold leading-tight h-8 overflow-hidden">{p.name}</h3>
              <p className="text-sm font-medium mt-1 text-zinc-600">${p.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>

      {/* CARRITO SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-bold">Tu Pedido</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2"><X size={20}/></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6">
                {cart.length === 0 ? <p className="text-center text-zinc-400 text-sm mt-20">El carrito está vacío</p> : 
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b border-zinc-50 pb-4">
                      <div className="flex-1">
                        <h4 className="text-[10px] font-bold uppercase">{item.name}</h4>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border rounded-md">
                            <button className="p-1" onClick={() => updateQ(item.id, -1)}><Minus size={12}/></button>
                            <span className="px-2 text-xs font-bold">{item.q}</span>
                            <button className="p-1" onClick={() => updateQ(item.id, 1)}><Plus size={12}/></button>
                          </div>
                          <span className="text-xs font-bold">${(item.price * item.q).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="pt-6 border-t border-zinc-100">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Total</span>
                  <span className="text-2xl font-black">${total.toLocaleString()}</span>
                </div>
                <button onClick={sendOrder} disabled={cart.length === 0} className="w-full bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors disabled:bg-zinc-100 disabled:text-zinc-400">
                  <Send size={16} /> CONFIRMAR POR WHATSAPP
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
