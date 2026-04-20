import { useState, useEffect, type FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu as MenuIcon, X, ChevronRight, Hamburger, Pizza, Coffee, LogIn, LayoutDashboard, Trash2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CartItem, MenuItem, Order } from './types.ts';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="main-nav" className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
      scrolled ? "bg-brand-red shadow-lg py-3" : "bg-transparent text-white"
    )}>
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg">
          <svg className="w-6 h-6 text-brand-red" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        </div>
        <span className={cn("text-2xl font-black tracking-tighter uppercase", scrolled ? "text-white" : "text-white")}>
          NEON<span className="text-brand-yellow">BURGER</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-bold uppercase text-sm tracking-widest text-white">
        <Link to="/menu" className="hover:text-brand-yellow transition-colors">Menu</Link>
        <Link to="/admin" className="hover:text-brand-yellow transition-colors">Admin</Link>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenCart}
          className="relative p-2 rounded-full bg-brand-yellow text-brand-dark hover:bg-white transition-all shadow-md active:scale-95"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-brand-yellow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-bg px-6 pt-10">
    <div className="container mx-auto max-w-6xl grid grid-cols-12 grid-rows-1 gap-6">
      {/* Main Bento Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-12 md:col-span-12 lg:col-span-12 bg-white rounded-[3rem] shadow-sm border-2 border-gray-100 flex flex-col md:flex-row overflow-hidden relative min-h-[500px]"
      >
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-6 relative z-10">
           <div className="inline-block bg-brand-yellow text-brand-red text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest w-fit">
            Bento Fresh
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.85] text-gray-900 uppercase">
            THE NEON <span className="text-brand-red">STACK</span>
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed max-w-sm text-lg">
            Two fresh-pressed beef patties, hand-leafed lettuce, and our legendary secret sauce.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/menu" 
              className="bg-brand-red text-white font-black py-5 px-10 rounded-2xl text-xl shadow-lg shadow-red-200 hover:scale-105 active:scale-95 transition-all text-center uppercase tracking-tighter"
            >
              ORDER NOW — $8.45
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 bg-brand-yellow/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-yellow/20"></div>
          <motion.div 
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 p-12"
          >
            <img 
              src="https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?q=80&w=1200" 
              className="w-full h-auto rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700" 
              alt="Bento Burger"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const MenuView = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))];
  const filteredItems = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  if (loading) return <div className="h-screen flex items-center justify-center bg-brand-bg text-brand-red font-black uppercase tracking-widest">Loading Tasty Menu...</div>;

  return (
    <div id="menu-container" className="pt-32 pb-32 min-h-screen bg-brand-bg">
      <div className="container mx-auto px-6 max-w-6xl">
        <header className="mb-16 text-center">
          <h2 className="text-6xl font-black text-gray-900 uppercase mb-8">Our <span className="text-brand-red">Selection</span></h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all",
                  activeCategory === cat ? "bg-brand-red text-white shadow-lg shadow-red-100" : "bg-white text-gray-400 border-2 border-gray-100 hover:border-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id}
                className="bg-white rounded-[2.5rem] overflow-hidden border-2 border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group p-2"
              >
                <div className="relative h-64 overflow-hidden rounded-[2rem]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-brand-yellow text-brand-dark px-5 py-1.5 rounded-full font-black text-lg shadow-lg">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase">{item.name}</h3>
                    <p className="text-gray-400 font-medium text-sm leading-snug mb-6">{item.description}</p>
                  </div>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="w-full bg-brand-red text-white font-black py-4 px-6 rounded-2xl uppercase tracking-tighter hover:bg-brand-dark transition-all active:scale-95 shadow-md shadow-red-100 group-hover:shadow-lg"
                  >
                    Add to order +
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQty, 
  onRemove,
  onCheckout 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark z-[70] shadow-2xl flex flex-col text-white"
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-brand-dark/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black uppercase">Your Order</h2>
                <span className="bg-brand-red text-white px-3 py-1 rounded-lg text-xs font-black uppercase">{items.length} Items</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-6">
                  <ShoppingCart size={80} className="stroke-[1]" />
                  <p className="font-black uppercase tracking-widest text-lg">Bag is empty</p>
                  <button 
                    onClick={onClose} 
                    className="bg-brand-red text-white py-4 px-8 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    START ORDERING
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-5 items-center bg-white/5 p-4 rounded-[2rem] border border-white/5 group hover:bg-white/10 transition-colors">
                    <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-grow">
                      <h4 className="font-black uppercase text-white group-hover:text-brand-yellow transition-colors">{item.name}</h4>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center bg-white/10 rounded-xl overflow-hidden border border-white/10">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 px-4 hover:bg-white/20 transition-colors">-</button>
                          <span className="w-8 text-center font-bold font-mono">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 px-4 hover:bg-white/20 transition-colors">+</button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-brand-yellow font-mono text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => onRemove(item.id)} className="text-white/30 hover:text-brand-red mt-2 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-black/30 backdrop-blur-xl">
                <div className="space-y-3 mb-8">
                   <div className="flex justify-between items-center text-gray-400 font-bold uppercase text-xs tracking-widest">
                    <span>Subtotal</span>
                    <span className="font-mono text-white text-base">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-black uppercase text-lg tracking-tight">Daily Total</span>
                    <span className="text-4xl font-black text-brand-yellow font-mono">${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-brand-yellow text-brand-dark font-black py-6 rounded-[2rem] uppercase tracking-widest text-lg hover:bg-white transition-all shadow-[0_20px_50px_rgba(255,194,14,0.2)] active:scale-95"
                >
                  CHECKOUT NOW
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Checkout = ({ items, onOrderSuccess }: { items: CartItem[]; onOrderSuccess: () => void }) => {
  const [formData, setFormData] = useState({ customerName: '', phone: '', location: '' });
  const [submitting, setSubmitting] = useState(false);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items, total })
      });
      if (res.ok) {
        onOrderSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-40 pb-20 min-h-screen bg-brand-bg">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white rounded-[3rem] shadow-sm border-2 border-gray-100 overflow-hidden grid md:grid-cols-2">
          <div className="p-12 bg-brand-dark text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-black uppercase mb-8">Summary</h2>
              <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between border-b border-white/10 pb-4">
                    <div>
                        <p className="font-black uppercase text-lg">{item.name}</p>
                        <p className="text-brand-yellow font-bold text-sm">{item.quantity} Unit(s)</p>
                    </div>
                    <span className="font-mono text-xl">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="uppercase font-black text-gray-500 tracking-widest text-sm">TOTAL TO PAY</span>
                <span className="text-6xl font-black text-brand-yellow font-mono">${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="p-12">
            <h2 className="text-3xl font-black text-gray-900 uppercase mb-8">Your Info</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Full Name</label>
                <input 
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] px-6 py-4 font-black focus:outline-none focus:border-brand-red transition-all" 
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Mobile Number</label>
                <input 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] px-6 py-4 font-black focus:outline-none focus:border-brand-red transition-all" 
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Delivery Spot</label>
                <input 
                  required
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] px-6 py-4 font-black focus:outline-none focus:border-brand-red transition-all" 
                  placeholder="Table 4 or Address"
                />
              </div>
              <button 
                disabled={submitting}
                className="w-full bg-brand-red text-white font-black py-6 rounded-[2rem] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl active:scale-95 disabled:opacity-50 text-lg"
              >
                {submitting ? 'Placing Order...' : 'Confirm Order — PAY AT PICKUP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      setIsLoggedIn(true);
      fetchOrders();
    } else {
      setError('Invalid identity');
    }
  };

  const fetchOrders = async () => {
    const res = await fetch('/api/admin/orders');
    const data = await res.json();
    setOrders(data);
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-40 flex items-center justify-center p-6 bg-brand-red min-h-screen">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md border-8 border-brand-yellow">
          <h2 className="text-3xl font-black text-brand-dark uppercase mb-8 flex items-center gap-3">
            <LogIn className="text-brand-red" /> Admin portal
          </h2>
          {error && <p className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 font-bold text-center border-2 border-red-100">{error}</p>}
          <form onSubmit={login} className="space-y-6">
            <input 
              placeholder="Username" 
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-black"
              value={username} onChange={e => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-black"
              value={password} onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full bg-brand-red text-white font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-brand-dark transition-all">Unlock Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-brand-bg min-h-screen px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl font-black text-gray-900 uppercase">Incoming <span className="text-brand-red">Orders</span></h2>
          <div className="flex gap-4">
             <button onClick={fetchOrders} className="bg-white px-6 py-3 rounded-2xl shadow-sm border-2 border-gray-100 font-black uppercase text-xs hover:border-brand-red transition-all">
                Refresh
             </button>
             <button onClick={() => setIsLoggedIn(false)} className="text-brand-red font-black uppercase tracking-widest text-xs">Logout</button>
          </div>
        </div>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border-2 border-gray-100 grid md:grid-cols-4 gap-8 hover:shadow-lg transition-all">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Customer</p>
                <p className="font-black text-xl text-brand-dark">{order.customer_name}</p>
                <p className="text-gray-400 font-bold text-sm mt-1">{order.phone}</p>
              </div>
              <div className="md:col-span-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Spot</p>
                <p className="font-black text-gray-700">{order.location}</p>
              </div>
              <div className="md:col-span-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Items</p>
                <div className="text-sm font-bold text-gray-500 space-y-1">
                  {JSON.parse(order.items).map((item: any) => (
                    <div key={item.id} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Charge</p>
                    <span className="text-3xl font-black text-brand-red font-mono">${order.total.toFixed(2)}</span>
                </div>
                <span className="bg-brand-yellow text-brand-dark px-4 py-1 rounded-full text-[10px] font-black uppercase mt-4">{order.status}</span>
              </div>
            </div>
          ))}
          {orders.length === 0 && <div className="text-center bg-white p-20 rounded-[3rem] border-2 border-dashed border-gray-200">
             <p className="text-gray-300 font-black uppercase tracking-[0.2em] text-xl">Bag is totally empty.</p>
          </div>}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('crave_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('crave_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return newQty === 0 ? null : { ...i, quantity: newQty };
      }
      return i;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="font-sans antialiased">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/menu" element={<MenuView onAddToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout items={cart} onOrderSuccess={() => {
          setCart([]);
          alert('Success! Your CraveBurger order is being prepared.');
          navigate('/');
        }} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate('/checkout');
        }}
      />

      <footer id="main-footer" className="bg-white border-t border-gray-100 py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center font-black text-white">N</div>
             <span className="text-2xl font-black tracking-tighter uppercase text-brand-dark">NEONBURGER</span>
          </div>
          
          <div className="flex gap-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            <span className="hover:text-brand-red cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-brand-red cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-brand-red cursor-pointer transition-colors">Careers</span>
          </div>

          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-brand-red uppercase tracking-widest hidden md:block">Hot & Fresh – Since '48</span>
             <div className="flex gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-50 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-gray-400">IG</div>
                <div className="w-10 h-10 rounded-full bg-gray-50 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-gray-400">TW</div>
             </div>
          </div>
        </div>
        <div className="container mx-auto mt-12 text-center text-gray-300 text-[10px] font-black uppercase tracking-[0.3em]">
          &copy; 2026 NEONBURGER CORP
        </div>
      </footer>
    </div>
  );
}
