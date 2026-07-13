import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  ShoppingBag, 
  Tag, 
  Settings, 
  LogOut, 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Flame, 
  ChefHat, 
  Clock, 
  User, 
  Users,
  CreditCard, 
  QrCode, 
  Coins, 
  Copy, 
  X,
  ChevronRight,
  Info,
  Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, CartItem, Reservation } from '../types';

interface CustomerDashboardProps {
  onClose: () => void;
  onAddToast: (msg: string) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  currentUser: { email: string; name: string } | null;
  onLogout: () => void;
  initialTab?: 'dashboard' | 'reservation' | 'order' | 'cart' | 'coupons' | 'settings';
}

interface MockCoupon {
  code: string;
  discount: string;
  description: string;
  minSpend: number;
}

const MOCK_COUPONS: MockCoupon[] = [
  { code: "ROYAL25", discount: "25% OFF", description: "Special royal welcome discount on premium curries.", minSpend: 1000 },
  { code: "FESTIVESPICE", discount: "₹200 OFF", description: "Get flat ₹200 off on order baskets exceeding ₹800.", minSpend: 800 },
  { code: "DESIDELIGHT", discount: "FREE DESSERT", description: "Free Rasmalai or Gulab Jamun with any starter.", minSpend: 500 },
  { code: "BOGO_NAAN", discount: "BOGO BREAD", description: "Buy one Butter Naan and get one free on dine-in.", minSpend: 300 }
];

export default function CustomerDashboard({
  onClose,
  onAddToast,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentUser,
  onLogout,
  initialTab
}: CustomerDashboardProps) {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reservation' | 'order' | 'cart' | 'coupons' | 'settings'>(initialTab || 'dashboard');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Customer custom state variables
  const [appliedCoupon, setAppliedCoupon] = useState<MockCoupon | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Scan' | 'Credit'>('Scan');

  // Interactive Reservation states
  const [mockReservations, setMockReservations] = useState<Reservation[]>([
    {
      id: "RES-皇家101",
      name: currentUser?.name || "Premium Guest",
      email: currentUser?.email || "guest@spiceheritage.in",
      phone: "+91 99887 76655",
      date: "2026-07-08",
      time: "20:00",
      guests: 2,
      tableNumber: 12,
      specialRequests: "Anniversary dinner, close to windows with royal table presentation."
    }
  ]);

  // Interactive Reservation Form states
  const [newResName, setNewResName] = useState(currentUser?.name || '');
  const [newResPhone, setNewResPhone] = useState('');
  const [newResEmail, setNewResEmail] = useState(currentUser?.email || '');
  const [newResGuests, setNewResGuests] = useState(2);
  const [newResDate, setNewResDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [newResTime, setNewResTime] = useState('19:00');
  const [newResSpecialRequests, setNewResSpecialRequests] = useState('');
  const [isSubmittingRes, setIsSubmittingRes] = useState(false);
  const [isNewBookingFormVisible, setIsNewBookingFormVisible] = useState(false);

  // Interactive live Order Status progress
  const [activeOrders, setActiveOrders] = useState([
    {
      id: "SH-ORD-5192",
      date: "2026-07-08",
      time: "20 mins ago",
      items: [
        { name: "Butter Chicken", qty: 2, price: 545 },
        { name: "Garlic Naan", qty: 3, price: 95 }
      ],
      total: 1380,
      status: "Preparing", // Received -> Preparing -> Garnishing -> Served
      tableNumber: "12"
    }
  ]);

  // Customer preferences/settings states
  const [spicePreference, setSpicePreference] = useState<'Medium' | 'Hot' | 'Extra Hot' | 'Mild'>('Medium');
  const [dietaryAllergy, setDietaryAllergy] = useState<string>('None');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Submit Handler for new table booking inside the Patron Lounge
  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResName || !newResPhone || !newResEmail || !newResDate) {
      onAddToast("Please fill in all required fields to book a table.");
      return;
    }
    setIsSubmittingRes(true);
    setTimeout(() => {
      const newRes: Reservation = {
        id: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
        name: newResName,
        phone: newResPhone,
        email: newResEmail,
        date: newResDate,
        time: newResTime,
        guests: newResGuests,
        specialRequests: newResSpecialRequests,
        status: 'confirmed',
        tableNumber: Math.floor(1 + Math.random() * 24),
      };
      setMockReservations(prev => [newRes, ...prev]);
      setIsSubmittingRes(false);
      setIsNewBookingFormVisible(false);
      onAddToast(`Royal Table #${newRes.tableNumber} successfully booked for ${newRes.guests} guests!`);
      // Clear specific user inputs
      setNewResPhone('');
      setNewResSpecialRequests('');
    }, 1200);
  };

  // Cart total calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + (curr.menuItem.price * curr.quantity), 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.code === "ROYAL25") {
      return Math.round(cartSubtotal * 0.25);
    }
    if (appliedCoupon.code === "FESTIVESPICE" && cartSubtotal >= 800) {
      return 200;
    }
    return 0; // Dessert or naan BOGO is shown as descriptive discount
  }, [appliedCoupon, cartSubtotal]);

  const serviceTaxGst = useMemo(() => {
    const billableSub = Math.max(0, cartSubtotal - discountAmount);
    return Math.round(billableSub * 0.05); // 5% GST
  }, [cartSubtotal, discountAmount]);

  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount + serviceTaxGst);

  // Apply voucher helper
  const handleApplyCoupon = (couponCode: string) => {
    const cleaned = couponCode.trim().toUpperCase();
    const found = MOCK_COUPONS.find(c => c.code === cleaned);
    
    if (!found) {
      onAddToast("Invalid premium voucher code. Please try again.");
      return;
    }
    if (cartSubtotal < found.minSpend) {
      onAddToast(`Voucher ${found.code} requires a minimum spend of ₹${found.minSpend}.`);
      return;
    }
    setAppliedCoupon(found);
    setCouponInput('');
    onAddToast(`Voucher ${found.code} applied! Enjoy ${found.discount}.`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    onAddToast("Voucher removed.");
  };

  // Create order from active shopping basket
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      onAddToast("Your basket is empty. Add royal dishes from the main menu!");
      return;
    }

    const orderId = `SH-ORD-${Math.floor(Math.random() * 9000) + 1000}`;
    const newOrder = {
      id: orderId,
      date: "2026-07-08",
      time: "Just now",
      items: cartItems.map(item => ({
        name: item.menuItem.name,
        qty: item.quantity,
        price: item.menuItem.price
      })),
      total: cartGrandTotal,
      status: "Received",
      tableNumber: "12"
    };

    setActiveOrders(prev => [newOrder, ...prev]);
    onClearCart();
    setAppliedCoupon(null);
    onAddToast(`Royal Order ${orderId} submitted to tandoor ovens. Table 12 is live!`);
    setActiveTab('order');
  };

  // Receipt Download / Printing matching previous implementation
  const [showReceipt, setShowReceipt] = useState(false);
  const [activeReceiptData, setActiveReceiptData] = useState<any>(null);

  const triggerReceiptPreview = (order: any) => {
    setActiveReceiptData(order);
    setShowReceipt(true);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  // Simulated visual card receipt downloader
  const handleDownloadVisualCard = (resObjToUse?: any) => {
    // Check if the argument is a reservation object
    const isReservation = resObjToUse && typeof resObjToUse === 'object' && 'id' in resObjToUse;
    const resObj = isReservation ? resObjToUse : mockReservations[0];
    if (!resObj) {
      onAddToast("No reservation available to download.");
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const scale = 2;
      canvas.width = 500 * scale;
      canvas.height = 700 * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(scale, scale);

        // Styling
        ctx.fillStyle = '#0a0705';
        ctx.fillRect(0, 0, 500, 700);

        // Golden Double Border
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(15, 15, 470, 670);

        ctx.strokeStyle = 'rgba(250, 204, 21, 0.25)';
        ctx.lineWidth = 1;
        ctx.strokeRect(20, 20, 460, 660);

        // Sparkle
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.moveTo(250, 45);
        ctx.lineTo(254, 55);
        ctx.lineTo(264, 59);
        ctx.lineTo(254, 63);
        ctx.lineTo(250, 73);
        ctx.lineTo(246, 63);
        ctx.lineTo(236, 59);
        ctx.lineTo(246, 55);
        ctx.closePath();
        ctx.fill();

        // Title
        ctx.font = 'bold 24px Georgia, serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('SPICE HERITAGE', 250, 105);

        ctx.font = '9px "Courier New", Courier, monospace';
        ctx.fillStyle = '#facc15';
        ctx.fillText('• BENGALURU •', 250, 125);

        ctx.font = 'italic 15px Georgia, serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fillText('Diner Guest Reservation Receipt', 250, 155);

        // Divider
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.3)';
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(40, 175);
        ctx.lineTo(460, 175);
        ctx.stroke();
        ctx.setLineDash([]);

        const drawRow = (label: string, value: string, y: number) => {
          ctx.textAlign = 'left';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillStyle = '#a1a1aa';
          ctx.fillText(label.toUpperCase(), 50, y);

          ctx.textAlign = 'right';
          ctx.font = 'bold 13px Georgia, serif';
          ctx.fillStyle = '#ffffff';
          if (label.toLowerCase().includes('id') || label.toLowerCase().includes('table')) {
            ctx.fillStyle = '#facc15';
          }
          ctx.fillText(value, 450, y);
        };

        drawRow('Guest Name', resObj.name || currentUser?.name || 'Valued Guest', 220);
        drawRow('Reservation ID', resObj.id, 260);
        drawRow('Assigned Table', `Table #${resObj.tableNumber || '12'}`, 300);
        drawRow('Party Size', `${resObj.guests} Diners`, 340);
        drawRow('Booking Date', resObj.date, 380);
        drawRow('Booking Time', resObj.time, 420);

        // Details
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('SPECIAL NOTE / COMPLIMENTS:', 50, 480);

        ctx.fillStyle = '#e4e4e7';
        ctx.font = 'italic 11px sans-serif';
        ctx.fillText(`"${resObj.specialRequests || 'No requests'}"`, 50, 502);

        // Footer Logo Stamp
        ctx.font = '10px Georgia, serif';
        ctx.fillStyle = '#facc15';
        ctx.textAlign = 'center';
        ctx.fillText('★ SPICE HERITAGE BENGALURU ★', 250, 610);

        ctx.font = 'italic 9px Georgia, serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillText('Present this receipt visual on arrival for prioritised seating.', 250, 628);

        // Download link
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `Spice_Heritage_Guest_${resObj.id}.png`;
        a.click();
        onAddToast("Visual receipt card generated and downloaded.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070503] text-zinc-100 flex flex-col lg:flex-row overflow-hidden font-sans select-none print:bg-white print:text-black">
      
      {/* 1. PORTAL LEFT SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-zinc-950 border-r border-yellow-400/10 flex-col justify-between p-6 shrink-0 print:hidden">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shadow-md shadow-yellow-400/20">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="font-serif text-lg font-black tracking-tight text-white block">Spice Heritage</span>
              <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-widest block font-mono">Diner Lounge</span>
            </div>
          </div>

          <nav className="space-y-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider pl-3 block mb-3">Diner Lounge</span>
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              <span>Lounge Home</span>
            </button>

            <button
              onClick={() => setActiveTab('reservation')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'reservation'
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <CalendarDays className="w-4.5 h-4.5" />
              <span>My Booking</span>
            </button>

            <button
              onClick={() => setActiveTab('order')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'order'
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <ChefHat className="w-4.5 h-4.5" />
              <span>My Orders</span>
            </button>

            <button
              onClick={() => setActiveTab('cart')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'cart'
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>My Basket</span>
              </div>
              {cartItems.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-black text-yellow-400 text-[10px] font-black">
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'coupons'
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <Tag className="w-4.5 h-4.5" />
              <span>My Coupons</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <Settings className="w-4.5 h-4.5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Logout Footer */}
        <div className="space-y-4 pt-6 border-t border-yellow-400/5">
          <div className="p-3 rounded-xl bg-zinc-900/40 border border-yellow-400/10 text-center">
            <span className="text-[10px] text-yellow-400 block font-bold font-mono">LOYLTY CLB: VIP</span>
            <span className="text-xs text-white font-serif block mt-0.5">Sovereign Patron</span>
          </div>

          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/15 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. PORTAL MAIN WRAPPER */}
      <main className="flex-grow flex flex-col overflow-y-auto bg-[#070503] relative min-w-0">
        
        {/* Header Bar */}
        <header className="p-4 sm:p-6 border-b border-yellow-400/10 flex items-center justify-between shrink-0 print:hidden">
          <div>
            <h2 className="font-serif text-base sm:text-lg font-bold text-white">Namaste, {currentUser?.name || 'Valued Patron'}</h2>
            <p className="text-[9px] sm:text-[10px] text-yellow-400 uppercase tracking-widest font-bold">Welcome to your Personal Lounge Terminal</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl border border-yellow-400/10 hover:border-yellow-400/30 text-zinc-400 hover:text-yellow-400 bg-zinc-950/40 cursor-pointer transition-colors flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Exit Lounge</span>
          </button>
        </header>

        {/* Tab Switcher Panel */}
        <div className="p-4 sm:p-6 pb-24 sm:pb-8 flex-grow flex flex-col space-y-6">
          
          {/* ==================== HOME LOUNGE TAB ==================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-zinc-950 to-[#120e0a] border border-yellow-400/20 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-[9px] font-black uppercase tracking-wider">Royal Gastronomy Member</span>
                  <h3 className="text-xl font-serif font-black text-white leading-tight">Spice Heritage Royal Lounge</h3>
                  <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                    Enjoy seamless tableside checkout, track live clay tandoor cooking logs, and print visual reservation receipts instantly.
                  </p>
                </div>
                <div className="shrink-0 flex gap-3">
                  <button
                    onClick={() => setActiveTab('cart')}
                    className="px-4 py-2.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    Checkout Table Cart
                  </button>
                  <button
                    onClick={handleDownloadVisualCard}
                    className="px-4 py-2.5 rounded-xl border border-yellow-400/20 text-yellow-400 hover:text-white text-xs font-black uppercase tracking-wider cursor-pointer flex items-center space-x-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Download Receipt</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Active Booking status */}
                <div className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest font-mono">Booking Status</span>
                    <CalendarDays className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-black text-white">Table 12 Premium</h4>
                    <p className="text-xs text-zinc-400">Tonight, 8:00 PM • 2 Guests</p>
                    <span className="inline-block text-[9px] font-black uppercase bg-yellow-950 text-yellow-400 border border-yellow-400/20 px-2 py-0.5 rounded-md">
                      Confirmed Seated Pending
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('reservation')}
                    className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-zinc-300 block text-center"
                  >
                    Manage Reservation & Receipt
                  </button>
                </div>

                {/* Live Order status */}
                <div className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest font-mono">Kitchen Oven Progress</span>
                    <ChefHat className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-black text-white">Order {activeOrders[0]?.id || 'None'}</h4>
                    <p className="text-xs text-zinc-400">Total: ₹{activeOrders[0]?.total || 0} • {activeOrders[0]?.items.length || 0} Dishes</p>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                      <span className="text-xs text-yellow-400 font-bold">{activeOrders[0]?.status || 'Idle'}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('order')}
                    className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-zinc-300 block text-center"
                  >
                    View Real-time Tracking
                  </button>
                </div>

                {/* Available Coupon box */}
                <div className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest font-mono">My Loyalty Rewards</span>
                    <Tag className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-black text-white">Active Voucher Code</h4>
                    <p className="text-xs text-zinc-400">Copy 'ROYAL25' for flat 25% off butter chicken curries.</p>
                    <span className="inline-block text-[10px] font-mono font-bold text-yellow-400 bg-yellow-400/5 px-2.5 py-1 rounded-md border border-yellow-400/20">
                      ROYAL25
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('coupons')}
                    className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-zinc-300 block text-center"
                  >
                    Explore Available Coupons
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== RESERVATIONS TAB ==================== */}
          {activeTab === 'reservation' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Table Booking & Receipts</h3>
                  <p className="text-xs text-zinc-500 font-normal">Manage your royal table reservation details and download Visual Receipts.</p>
                </div>
                <button
                  onClick={() => setIsNewBookingFormVisible(!isNewBookingFormVisible)}
                  className="px-4 py-2.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 text-xs font-black uppercase tracking-wider cursor-pointer flex items-center space-x-1.5 transition-all shadow-lg shadow-yellow-400/10"
                >
                  {isNewBookingFormVisible ? (
                    <>
                      <span>View Reservations</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Book a New Table</span>
                    </>
                  )}
                </button>
              </div>

              {isNewBookingFormVisible ? (
                /* THE RESERVATION FORM WIDGET INSIDE CUSTOMER PORTAL */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 sm:p-10 rounded-3xl bg-zinc-950/90 border border-yellow-400/10 shadow-2xl relative"
                >
                  <form onSubmit={handleCreateReservation} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Arjun Sharma"
                          value={newResName}
                          onChange={(e) => setNewResName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-black border border-yellow-400/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all font-semibold"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-2">
                        <label className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={newResPhone}
                          onChange={(e) => setNewResPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-black border border-yellow-400/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all font-semibold"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="arjun@example.com"
                          value={newResEmail}
                          onChange={(e) => setNewResEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-black border border-yellow-400/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all font-semibold"
                        />
                      </div>

                      {/* Number of Guests */}
                      <div className="space-y-2">
                        <label className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black block flex justify-between">
                          <span>Number of Guests</span>
                          <span className="text-yellow-400">{newResGuests} {newResGuests === 1 ? 'person' : 'people'}</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400 pointer-events-none" />
                          <select
                            value={newResGuests}
                            onChange={(e) => setNewResGuests(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black border border-yellow-400/10 text-white text-sm focus:outline-none focus:border-yellow-400 transition-all appearance-none font-semibold"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num} className="bg-black text-white">
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Booking Date */}
                      <div className="space-y-2">
                        <label className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black block">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400 pointer-events-none" />
                          <input
                            type="date"
                            required
                            value={newResDate}
                            onChange={(e) => setNewResDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black border border-yellow-400/10 text-white text-sm focus:outline-none focus:border-yellow-400 transition-all font-semibold"
                          />
                        </div>
                      </div>

                      {/* Preferred Time Slots */}
                      <div className="space-y-2">
                        <label className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black block">
                          Preferred Time Window
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400 pointer-events-none" />
                          <select
                            value={newResTime}
                            onChange={(e) => setNewResTime(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black border border-yellow-400/10 text-white text-sm focus:outline-none focus:border-yellow-400 transition-all appearance-none font-semibold"
                          >
                            <option value="12:00">Lunch (12:00 PM)</option>
                            <option value="13:30">Lunch (1:30 PM)</option>
                            <option value="15:00">Lunch (3:00 PM)</option>
                            <option value="19:00">Dinner (7:00 PM)</option>
                            <option value="20:30">Dinner (8:30 PM)</option>
                            <option value="21:30">Dinner (9:30 PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <label className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black block">
                        Special Requests or Dietary Requirements (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Window seat, anniversary request, less spice preference, infant seat required..."
                        value={newResSpecialRequests}
                        onChange={(e) => setNewResSpecialRequests(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-yellow-400/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all font-semibold resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingRes}
                      className="w-full py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-yellow-400/10 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmittingRes ? (
                        <span>Processing Royal Seating...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-black animate-pulse" />
                          <span>Book Royal Seating</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* RESERVATION LISTINGS */
                <div className="space-y-4">
                  {mockReservations.length === 0 ? (
                    <div className="p-12 text-center bg-zinc-950 border border-dashed border-yellow-400/10 rounded-3xl">
                      <CalendarDays className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                      <p className="text-sm font-bold text-zinc-400">You do not have any active royal seating reservations.</p>
                      <button
                        onClick={() => setIsNewBookingFormVisible(true)}
                        className="mt-4 px-5 py-2.5 bg-yellow-400 text-black text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer"
                      >
                        Book Your First Table
                      </button>
                    </div>
                  ) : (
                    mockReservations.map((res) => (
                      <div key={res.id} className="p-6 bg-zinc-950 border border-yellow-400/10 rounded-3xl space-y-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-yellow-400/5 pb-4">
                          <div>
                            <span className="text-[10px] text-yellow-400 font-mono font-bold">{res.id}</span>
                            <h4 className="text-base font-serif font-black text-white mt-1">Sovereign Table Booking</h4>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDownloadVisualCard(res)}
                              className="px-4 py-2 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 text-xs font-black uppercase tracking-wider cursor-pointer flex items-center space-x-1.5"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Download visual receipt card</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Are you sure you want to cancel your table reservation?")) {
                                  setMockReservations(prev => prev.filter(r => r.id !== res.id));
                                  onAddToast("Reservation cancellation request processed.");
                                }
                              }}
                              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-red-400 text-xs font-black uppercase tracking-wider cursor-pointer"
                            >
                              Cancel Booking
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                          <div className="p-4 bg-black/40 rounded-2xl border border-yellow-400/5">
                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Allotted Table</span>
                            <p className="text-sm font-serif font-bold text-yellow-400 mt-1">Table #{res.tableNumber}</p>
                          </div>

                          <div className="p-4 bg-black/40 rounded-2xl border border-yellow-400/5">
                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Party Size</span>
                            <p className="text-sm font-bold text-white mt-1">{res.guests} Guests</p>
                          </div>

                          <div className="p-4 bg-black/40 rounded-2xl border border-yellow-400/5">
                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Timing Window</span>
                            <p className="text-sm font-bold text-white mt-1">{res.date} • {res.time}</p>
                          </div>
                        </div>

                        {res.specialRequests && (
                          <div className="p-4 rounded-2xl bg-zinc-900/65 text-xs text-zinc-400 border border-yellow-400/5">
                            <span className="font-bold text-yellow-400 uppercase text-[9px] tracking-widest block mb-1">Your Chef Request note:</span>
                            "{res.specialRequests}"
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* MY ORDERS SECTION AFTER MY BOOKING */}
              <div className="mt-12 pt-8 border-t border-yellow-400/10 space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">My Orders</h3>
                  <p className="text-xs text-zinc-500 font-normal font-sans">Track your active table orders and kitchen status directly from your booking hub.</p>
                </div>

                {activeOrders.length === 0 ? (
                  <div className="p-10 text-center bg-zinc-950 border border-dashed border-yellow-400/10 rounded-2xl">
                    <ChefHat className="w-10 h-10 text-zinc-650 mx-auto mb-3" />
                    <p className="text-xs font-bold text-zinc-400">You do not have any active kitchen orders yet.</p>
                    <button
                      onClick={() => {
                        onClose();
                        const el = document.getElementById('menu');
                        if (el) {
                          const headerOffset = 85;
                          const elementPosition = el.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                      }}
                      className="mt-3.5 px-4 py-2 bg-yellow-400 text-black text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer hover:bg-yellow-300 transition-colors"
                    >
                      Browse Royal Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeOrders.map((ord) => (
                      <div key={ord.id} className="p-6 bg-zinc-950 border border-yellow-400/10 rounded-3xl space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-yellow-400/5 pb-4">
                          <div>
                            <span className="text-[10px] text-yellow-400 font-mono font-bold">Order ID: {ord.id}</span>
                            <h4 className="text-base font-serif font-black text-white mt-1">Gourmet Dinner Order</h4>
                          </div>
                          <button
                            onClick={() => triggerReceiptPreview(ord)}
                            className="px-3.5 py-1.5 rounded-lg bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-black text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print Bill Ticket</span>
                          </button>
                        </div>

                        {/* Order Progress Status Indicators */}
                        <div className="p-4 bg-black/45 rounded-2xl border border-yellow-400/5 space-y-4">
                          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Status Timeline</span>
                          <div className="grid grid-cols-4 gap-2 relative">
                            {/* Timeline bar */}
                            <div className="absolute top-[13px] left-[10%] right-[10%] h-0.5 bg-zinc-800 z-0" />
                            <div className={`absolute top-[13px] left-[10%] h-0.5 bg-yellow-400 z-0 transition-all duration-500 ${
                              ord.status === 'Received' ? 'w-0' :
                              ord.status === 'Preparing' ? 'w-[33%]' :
                              ord.status === 'Garnishing' ? 'w-[66%]' : 'w-[80%]'
                            }`} />

                            {/* Timeline points */}
                            {[
                              { label: 'Received', statusKey: 'Received', step: 1 },
                              { label: 'Preparing', statusKey: 'Preparing', step: 2 },
                              { label: 'Garnishing', statusKey: 'Garnishing', step: 3 },
                              { label: 'Served', statusKey: 'Served', step: 4 }
                            ].map((st) => {
                              const isDone = st.statusKey === ord.status || 
                                             (ord.status === 'Preparing' && st.step <= 2) ||
                                             (ord.status === 'Garnishing' && st.step <= 3) ||
                                             (ord.status === 'Served');

                              return (
                                <div key={st.label} className="flex flex-col items-center text-center z-10">
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border transition-all ${
                                    isDone 
                                      ? 'bg-yellow-400 border-transparent text-black shadow-md shadow-yellow-400/10' 
                                      : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                                  }`}>
                                    {isDone ? <Check className="w-3.5 h-3.5" /> : st.step}
                                  </div>
                                  <span className={`text-[10px] font-bold mt-2 uppercase tracking-wide ${
                                    isDone ? 'text-yellow-400' : 'text-zinc-500'
                                  }`}>
                                    {st.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Items list */}
                        <div className="space-y-2">
                          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">Ordered Dishes</span>
                          <div className="divide-y divide-yellow-400/5">
                            {ord.items.map((item, i) => (
                              <div key={i} className="flex justify-between py-2 text-xs font-semibold">
                                <span className="text-white">{item.qty}x {item.name}</span>
                                <span className="text-zinc-400">₹{item.price * item.qty}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== LIVE ORDER STATUS TAB ==================== */}
          {activeTab === 'order' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Live Kitchen Orders</h3>
                <p className="text-xs text-zinc-500 font-normal font-sans">Track clay oven, biryani pot, and curry status in real-time.</p>
              </div>

              {activeOrders.map((ord) => (
                <div key={ord.id} className="p-6 bg-zinc-950 border border-yellow-400/10 rounded-3xl space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Order Reference</span>
                      <h4 className="text-base font-serif font-black text-white">{ord.id}</h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => triggerReceiptPreview(ord)}
                        className="px-3.5 py-1.5 rounded-lg bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-black text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Bill Ticket</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Progress Status Indicators matching Tabetei reference style */}
                  <div className="p-4 bg-black/45 rounded-2xl border border-yellow-400/5 space-y-4">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Status Timeline</span>
                    <div className="grid grid-cols-4 gap-2 relative">
                      {/* Timeline bar */}
                      <div className="absolute top-[13px] left-[10%] right-[10%] h-0.5 bg-zinc-800 z-0" />
                      <div className={`absolute top-[13px] left-[10%] h-0.5 bg-yellow-400 z-0 transition-all duration-500 ${
                        ord.status === 'Received' ? 'w-0' :
                        ord.status === 'Preparing' ? 'w-[33%]' :
                        ord.status === 'Garnishing' ? 'w-[66%]' : 'w-[80%]'
                      }`} />

                      {/* Timeline points */}
                      {[
                        { label: 'Received', statusKey: 'Received', step: 1 },
                        { label: 'Preparing', statusKey: 'Preparing', step: 2 },
                        { label: 'Garnishing', statusKey: 'Garnishing', step: 3 },
                        { label: 'Served', statusKey: 'Served', step: 4 }
                      ].map((st) => {
                        const isDone = st.statusKey === ord.status || 
                                       (ord.status === 'Preparing' && st.step <= 2) ||
                                       (ord.status === 'Garnishing' && st.step <= 3) ||
                                       (ord.status === 'Served');

                        return (
                          <div key={st.label} className="flex flex-col items-center text-center z-10">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border transition-all ${
                              isDone 
                                ? 'bg-yellow-400 border-transparent text-black shadow-md shadow-yellow-400/10' 
                                : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                            }`}>
                              {isDone ? <Check className="w-3.5 h-3.5" /> : st.step}
                            </div>
                            <span className={`text-[10px] font-bold mt-2 uppercase tracking-wide ${
                              isDone ? 'text-yellow-400' : 'text-zinc-500'
                            }`}>
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">Ordered Dishes</span>
                    <div className="divide-y divide-yellow-400/5">
                      {ord.items.map((item, i) => (
                        <div key={i} className="flex justify-between py-2 text-xs font-semibold">
                          <span className="text-white">{item.qty}x {item.name}</span>
                          <span className="text-zinc-400">₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ==================== ACTIVE BASKET TAB ==================== */}
          {activeTab === 'cart' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Review active Table Basket</h3>
                <p className="text-xs text-zinc-500 font-normal">Add more dishes from the menu card or customize existing tandoor settings.</p>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-8 text-center bg-zinc-950 border border-dashed border-yellow-400/10 rounded-3xl">
                  <ShoppingBag className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-zinc-400">Your shopping basket is empty.</p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-yellow-400 text-black text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    Browse Main Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-950 border border-yellow-400/10 rounded-3xl divide-y divide-yellow-400/5">
                    {cartItems.map((item) => (
                      <div key={item.menuItem.id} className="py-4 flex justify-between items-center gap-4">
                        <div className="flex items-center space-x-3.5 min-w-0">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-yellow-400/10 shrink-0">
                            <img src={item.menuItem.image} alt={item.menuItem.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-black text-white truncate">{item.menuItem.name}</h4>
                            <p className="text-[10px] text-yellow-400 font-serif font-bold mt-0.5">₹{item.menuItem.price}</p>
                          </div>
                        </div>

                        {/* Qty edit controllers */}
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center bg-black rounded-lg border border-yellow-400/10 overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, Math.max(1, item.quantity - 1))}
                              className="p-1.5 text-zinc-500 hover:text-yellow-400 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                              className="p-1.5 text-zinc-500 hover:text-yellow-400 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.menuItem.id)}
                            className="p-2 rounded-lg bg-red-950/15 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bulk Clear button */}
                  <div className="text-right">
                    <button
                      onClick={() => {
                        onClearCart();
                        onAddToast("Cleared items from the active basket.");
                      }}
                      className="text-xs text-red-400 hover:text-red-300 uppercase font-black tracking-wider transition-colors"
                    >
                      Empty Basket
                    </button>
                  </div>

                  {/* RESPONSIVE FULL CHECKOUT BLOCK FOR MOBILE/TABLET (Visible on <xl screens) */}
                  <div className="xl:hidden mt-8 p-5 rounded-3xl bg-zinc-900/30 border border-yellow-400/10 space-y-6">
                    <div className="border-b border-yellow-400/5 pb-3">
                      <h4 className="text-xs font-black text-yellow-400 uppercase tracking-widest">Secure Tableside Settlement</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Settle your live basket immediately at Table #12.</p>
                    </div>

                    {/* Voucher Application */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Apply Tableside Voucher</span>
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3">
                          <div>
                            <span className="text-[9px] font-black text-yellow-400 block uppercase font-mono">{appliedCoupon.code}</span>
                            <span className="text-xs font-bold text-white block mt-0.5">{appliedCoupon.discount} applied</span>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="p-1.5 rounded hover:bg-yellow-400/10 text-zinc-400 hover:text-yellow-400 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="E.g. ROYAL25"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="flex-grow bg-black border border-yellow-400/10 rounded-xl px-4 py-2.5 text-xs font-bold text-white placeholder-zinc-600 uppercase focus:outline-none focus:border-yellow-400/20"
                          />
                          <button
                            onClick={() => handleApplyCoupon(couponInput)}
                            className="px-4 rounded-xl bg-yellow-400 text-black hover:bg-yellow-350 text-xs font-black uppercase tracking-wider cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="space-y-2.5 pt-4 border-t border-yellow-400/5">
                      <div className="flex justify-between text-xs font-semibold text-zinc-400">
                        <span>Subtotal:</span>
                        <span className="text-white">₹{cartSubtotal}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-xs font-semibold text-emerald-400">
                          <span>Discount applied:</span>
                          <span>- ₹{discountAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs font-semibold text-zinc-400">
                        <span>GST / Service tax (5%):</span>
                        <span className="text-white">₹{serviceTaxGst}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2.5 border-t border-yellow-400/10">
                        <span className="text-xs font-black uppercase tracking-wider text-white">Grand Total:</span>
                        <span className="text-base font-serif font-black text-yellow-400">₹{cartGrandTotal}</span>
                      </div>
                    </div>

                    {/* Settlement Gateways */}
                    <div className="space-y-2 pt-4 border-t border-yellow-400/5">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Choose Settlement Gateway</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { key: 'Cash' as const, label: 'Cash', icon: <Coins className="w-3.5 h-3.5" /> },
                          { key: 'Scan' as const, label: 'Scan', icon: <QrCode className="w-3.5 h-3.5" /> },
                          { key: 'Credit' as const, label: 'Credit', icon: <CreditCard className="w-3.5 h-3.5" /> }
                        ].map((pm) => {
                          const isActive = paymentMethod === pm.key;
                          return (
                            <button
                              key={pm.key}
                              onClick={() => setPaymentMethod(pm.key)}
                              className={`py-2.5 rounded-xl border text-[10px] font-bold uppercase transition-all flex flex-col items-center justify-center space-y-1.5 cursor-pointer ${
                                isActive
                                  ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400'
                                  : 'bg-black border-yellow-400/5 text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {pm.icon}
                              <span>{pm.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-yellow-400/5">
                      <button
                        onClick={() => triggerReceiptPreview({
                          id: "SH-BILL-DRAFT",
                          date: "2026-07-08",
                          time: "Pending Bill",
                          items: cartItems.map(it => ({ name: it.menuItem.name, qty: it.quantity, price: it.menuItem.price })),
                          total: cartGrandTotal,
                          status: "Draft",
                          tableNumber: "12"
                        })}
                        className="w-full py-3 rounded-xl border border-yellow-400/15 hover:border-yellow-400/40 text-yellow-400 hover:text-white bg-black text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Show Bill Ticket</span>
                      </button>

                      <button
                        onClick={handlePlaceOrder}
                        className="w-full py-3.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-350 text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-yellow-400/10"
                      >
                        <ChefHat className="w-4 h-4" />
                        <span>Place Royal Order</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* ==================== COUPONS & REWARDS TAB ==================== */}
          {activeTab === 'coupons' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Loyalty Coupon Library</h3>
                <p className="text-xs text-zinc-500 font-normal">Active promotional codes valid for tableside checkout discounts.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MOCK_COUPONS.map((cp) => (
                  <div
                    key={cp.code}
                    className="p-5 rounded-3xl bg-zinc-950 border border-yellow-400/10 relative overflow-hidden flex flex-col justify-between space-y-4 hover:border-yellow-400/25 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-[9px] font-black uppercase tracking-wider">
                          {cp.discount}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Min Spend: ₹{cp.minSpend}</span>
                      </div>
                      <h4 className="text-sm font-black text-white tracking-tight">{cp.description}</h4>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-yellow-400/5">
                      <code className="text-xs font-mono font-bold text-yellow-400 bg-yellow-400/5 border border-yellow-400/10 px-2.5 py-1 rounded">
                        {cp.code}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(cp.code);
                          onAddToast(`Voucher code '${cp.code}' copied to clipboard! Apply it in checkout.`);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 text-[10px] font-black uppercase tracking-widest cursor-pointer flex items-center space-x-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== SETTINGS TAB ==================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Diner Preferences</h3>
                <p className="text-xs text-zinc-500 font-normal">Configure default kitchen preparation spice thresholds and allergy notices.</p>
              </div>

              <div className="p-6 bg-zinc-950 border border-yellow-400/10 rounded-3xl space-y-6">
                {/* Spice Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Spice Sensitivity Profile</label>
                  <p className="text-xs text-zinc-500 leading-normal mb-2">Our master chefs will calibrate direct stove preparations to match this preference.</p>
                  <div className="grid grid-cols-4 gap-2.5">
                    {(['Mild', 'Medium', 'Hot', 'Extra Hot'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => {
                          setSpicePreference(lvl);
                          onAddToast(`Spice tolerance set to: ${lvl}`);
                        }}
                        className={`py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                          spicePreference === lvl
                            ? 'bg-yellow-400 text-black shadow'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Allergen Flag input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Dietary Allergen Notice</label>
                  <p className="text-xs text-zinc-500 mb-2">Chef Arjun Mehta reads this for premium tandoori bread or curry preparations.</p>
                  <input
                    type="text"
                    value={dietaryAllergy}
                    onChange={(e) => setDietaryAllergy(e.target.value)}
                    placeholder="E.g. No Peanuts, Gluten Sensitive, Nut allergies"
                    className="w-full bg-zinc-900 border border-yellow-400/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400/30 font-semibold"
                  />
                  <button
                    onClick={() => onAddToast(`Dietary allergen warnings updated: ${dietaryAllergy}`)}
                    className="px-4 py-1.5 bg-yellow-400/10 text-yellow-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-yellow-400/20 cursor-pointer block mt-2"
                  >
                    Save Notice Memo
                  </button>
                </div>

                {/* Notifications toggle */}
                <div className="flex items-center justify-between pt-4 border-t border-yellow-400/5">
                  <div>
                    <h4 className="text-xs font-black text-white">Tableside SMS Alerts</h4>
                    <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">Receive immediate SMS logs when table dishes exit clay tandoors.</p>
                  </div>
                  <button
                    onClick={() => {
                      setNotificationsEnabled(!notificationsEnabled);
                      onAddToast(`Tableside logs notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`);
                    }}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      notificationsEnabled ? 'bg-emerald-950 text-emerald-450' : 'bg-zinc-900 text-zinc-500'
                    }`}
                  >
                    {notificationsEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {/* Sign Out Button for Mobile Users */}
                <div className="lg:hidden flex items-center justify-between pt-4 border-t border-yellow-400/5">
                  <div>
                    <h4 className="text-xs font-black text-red-400">Exit and Sign Out</h4>
                    <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">End your terminal session on this device securely.</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="px-4 py-2 bg-red-950/45 text-red-400 hover:text-red-300 border border-red-900/30 text-[10px] font-black uppercase tracking-wider rounded-lg cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* 3. PORTAL RIGHT PANEL (Tabetei Right checkout panel) */}
      <aside className="hidden xl:flex w-80 bg-zinc-950 border-l border-yellow-400/10 flex-col justify-between p-6 shrink-0 print:hidden">
        <div className="space-y-6 overflow-y-auto max-h-[80vh] scrollbar-thin">
          
          {/* User Profile display matching Haaland Joy */}
          <div className="flex justify-between items-center pb-4 border-b border-yellow-400/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 font-serif text-sm font-black">
                {currentUser?.name?.charAt(0) || 'P'}
              </div>
              <div>
                <h4 className="text-xs font-black text-white leading-tight">{currentUser?.name || 'Premium Patron'}</h4>
                <span className="text-[10px] text-zinc-500 block font-mono">{currentUser?.email || 'guest@spiceheritage.in'}</span>
              </div>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Active Cart/Order Bill summary */}
          <div className="space-y-3.5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-wider text-yellow-400 font-display">Basket Summary</h3>
              <span className="text-[10px] bg-zinc-900 text-zinc-400 font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} Items
              </span>
            </div>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.menuItem.id} className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-zinc-300 truncate max-w-[140px]">{item.quantity}x {item.menuItem.name}</span>
                  <span className="text-white">₹{item.menuItem.price * item.quantity}</span>
                </div>
              ))}
              {cartItems.length === 0 && (
                <p className="text-[10px] text-zinc-600 font-semibold italic text-center py-6">Your table shopping basket is empty.</p>
              )}
            </div>
          </div>

          {/* Promo code Entry Field */}
          <div className="pt-4 border-t border-yellow-400/5 space-y-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Apply Tableside Voucher</span>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-2.5">
                <div>
                  <span className="text-[9px] font-black text-yellow-400 block uppercase font-mono">{appliedCoupon.code}</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{appliedCoupon.discount} applied</span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="p-1 rounded hover:bg-yellow-400/10 text-zinc-400 hover:text-yellow-400 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ROYAL25"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-grow bg-zinc-900 border border-yellow-400/10 rounded-xl px-3.5 py-2 text-xs font-bold text-white placeholder-zinc-600 uppercase focus:outline-none focus:border-yellow-400/20"
                />
                <button
                  onClick={() => handleApplyCoupon(couponInput)}
                  className="px-3 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Pricing Ledger details */}
          <div className="pt-4 border-t border-yellow-400/5 space-y-2.5">
            <div className="flex justify-between text-xs font-semibold text-zinc-400">
              <span>Subtotal:</span>
              <span className="text-white">₹{cartSubtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-xs font-semibold text-emerald-400">
                <span>Discount applied:</span>
                <span>- ₹{discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-xs font-semibold text-zinc-400">
              <span>GST / Service tax (5%):</span>
              <span className="text-white">₹{serviceTaxGst}</span>
            </div>
            <div className="flex justify-between items-center pt-2.5 border-t border-yellow-400/10">
              <span className="text-xs font-black uppercase tracking-wider text-white">Grand Total:</span>
              <span className="text-lg font-serif font-black text-yellow-400">₹{cartGrandTotal}</span>
            </div>
          </div>

          {/* Payment Method picker */}
          <div className="pt-4 border-t border-yellow-400/5 space-y-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Choose Settlement Gateway</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'Cash' as const, label: 'Cash', icon: <Coins className="w-3.5 h-3.5" /> },
                { key: 'Scan' as const, label: 'Scan', icon: <QrCode className="w-3.5 h-3.5" /> },
                { key: 'Credit' as const, label: 'Credit', icon: <CreditCard className="w-3.5 h-3.5" /> }
              ].map((pm) => {
                const isActive = paymentMethod === pm.key;
                return (
                  <button
                    key={pm.key}
                    onClick={() => setPaymentMethod(pm.key)}
                    className={`py-2 rounded-xl border text-[10px] font-bold uppercase transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                      isActive
                        ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400'
                        : 'bg-zinc-900/50 border-yellow-400/5 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {pm.icon}
                    <span>{pm.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Action Button Triggers */}
        <div className="space-y-3 pt-6 border-t border-yellow-400/15">
          <button
            onClick={() => triggerReceiptPreview({
              id: "SH-BILL-DRAFT",
              date: "2026-07-08",
              time: "Pending Bill",
              items: cartItems.map(it => ({ name: it.menuItem.name, qty: it.quantity, price: it.menuItem.price })),
              total: cartGrandTotal,
              status: "Draft",
              tableNumber: "12"
            })}
            className="w-full py-3 rounded-xl border border-yellow-400/15 hover:border-yellow-400/40 text-yellow-400 hover:text-white bg-zinc-900/50 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Show Bill Ticket</span>
          </button>

          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
            className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 ${
              cartItems.length > 0
                ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-md shadow-yellow-400/15 active:scale-[0.98]'
                : 'bg-zinc-900 text-zinc-600 border border-zinc-850 cursor-not-allowed'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Place Royal Order</span>
          </button>
        </div>
      </aside>

      {/* ==================== BILL TICKET MODAL OVERLAY ==================== */}
      <AnimatePresence>
        {showReceipt && activeReceiptData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:p-0">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReceipt(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md print:hidden"
            />

            {/* Receipt Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-black text-white border border-yellow-400 rounded-3xl p-6 shadow-2xl z-10 print:border-0 print:shadow-none print:p-0"
            >
              {/* Receipt Body */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 items-center justify-center text-yellow-400 mb-2">
                    <Sparkles className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <h3 className="font-serif text-xl font-bold tracking-tight text-white uppercase">Spice Heritage</h3>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-yellow-400 block mt-0.5">Bengaluru Premium POS</span>
                  <p className="text-[10px] text-zinc-400 mt-1">Gourmet Tableside Bill Receipt</p>
                </div>

                <div className="border-t border-dashed border-yellow-400/20 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between font-semibold text-zinc-400">
                    <span>Invoice Code:</span>
                    <span className="text-white font-mono">{activeReceiptData.id}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-zinc-400">
                    <span>Table Position:</span>
                    <span className="text-yellow-400 font-bold">Table #{activeReceiptData.tableNumber}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-zinc-400">
                    <span>Timestamp:</span>
                    <span className="text-white">{activeReceiptData.date} • {activeReceiptData.time}</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-yellow-400/20 pt-4 space-y-3">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Billed Dishes</span>
                  <div className="space-y-2">
                    {activeReceiptData.items.map((it: any, i: number) => (
                      <div key={i} className="flex justify-between text-xs font-semibold">
                        <span className="text-white">{it.qty}x {it.name}</span>
                        <span className="text-zinc-400">₹{it.price * it.qty}</span>
                      </div>
                    ))}
                    {activeReceiptData.items.length === 0 && (
                      <p className="text-[10px] text-zinc-500 italic text-center py-2">No items on draft bill</p>
                    )}
                  </div>
                </div>

                <div className="border-t border-dashed border-yellow-400/20 pt-4 space-y-2.5">
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs font-black uppercase tracking-wider text-white">Grand Total:</span>
                    <span className="text-lg font-serif font-black text-yellow-400">₹{activeReceiptData.total}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
                    <span>Gateway:</span>
                    <span className="uppercase text-yellow-400 font-bold">{paymentMethod} Settlement</span>
                  </div>
                </div>

                {/* Simulated Barcode block */}
                <div className="pt-4 border-t border-dashed border-yellow-400/20 flex flex-col items-center">
                  <div className="h-8 w-4/5 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 rounded border border-yellow-400/10 flex items-center justify-around px-2 opacity-80">
                    {Array.from({ length: 25 }).map((_, idx) => (
                      <div 
                        key={idx} 
                        className="bg-yellow-400 h-6" 
                        style={{ width: `${(idx % 3 === 0 ? 3 : idx % 2 === 0 ? 1 : 2)}px` }} 
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 mt-1.5 uppercase font-bold tracking-wider">
                    {activeReceiptData.id}
                  </span>
                </div>

                {/* Print button triggers */}
                <div className="flex gap-3 pt-2 print:hidden">
                  <button
                    onClick={handlePrintReceipt}
                    className="flex-1 py-2.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Bill Ticket</span>
                  </button>
                  <button
                    onClick={() => setShowReceipt(false)}
                    className="flex-1 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>

              {/* Close Button Trigger */}
              <button
                onClick={() => setShowReceipt(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:text-yellow-400 transition-colors print:hidden focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950 border-t border-yellow-400/10 flex justify-around items-center py-2 px-1 print:hidden">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 transition-all text-center cursor-pointer ${
            activeTab === 'dashboard' ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          <LayoutDashboard className="w-4.5 h-4.5" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('reservation')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 transition-all text-center cursor-pointer ${
            activeTab === 'reservation' ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          <CalendarDays className="w-4.5 h-4.5" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Book</span>
        </button>

        <button
          onClick={() => setActiveTab('order')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 transition-all text-center cursor-pointer ${
            activeTab === 'order' ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          <ChefHat className="w-4.5 h-4.5" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Status</span>
        </button>

        <button
          onClick={() => setActiveTab('cart')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 transition-all text-center cursor-pointer relative ${
            activeTab === 'cart' ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-yellow-400 text-black text-[8px] font-black leading-none">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            )}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest">Basket</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 transition-all text-center cursor-pointer ${
            activeTab === 'coupons' ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          <Tag className="w-4.5 h-4.5" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Promo</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 transition-all text-center cursor-pointer ${
            activeTab === 'settings' ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          <Settings className="w-4.5 h-4.5" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Prefs</span>
        </button>
      </div>

    </div>
  );
}
