import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  BarChart3, 
  Receipt, 
  Settings, 
  Info, 
  LogOut, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Flame, 
  ChefHat, 
  GlassWater, 
  ShoppingBag, 
  CreditCard, 
  QrCode, 
  ChevronRight,
  TrendingUp,
  Award,
  CircleDollarSign,
  ClipboardList,
  Store,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { MenuItem, MenuCategory } from '../types';

interface DashboardProps {
  onClose: () => void;
  onAddToast: (msg: string) => void;
}

// Initial mockup data matching the reference image structure and style
interface DashboardOrder {
  id: string;
  tableNumber: string;
  customerName: string;
  items: { menuItem: MenuItem; quantity: number }[];
  status: 'Dine In' | 'Waitlist' | 'Take Away' | 'Served';
  time: string;
  paymentMethod: 'Cash' | 'Scan' | 'Credit';
  isSettled?: boolean;
}

const INITIAL_ORDERS: DashboardOrder[] = [
  {
    id: "FO027",
    tableNumber: "12",
    customerName: "Haaland Joy",
    items: [
      { menuItem: MENU_ITEMS.find(m => m.id === "m1") || MENU_ITEMS[0], quantity: 2 }, // Butter Chicken
      { menuItem: MENU_ITEMS.find(m => m.id === "b2") || MENU_ITEMS[1], quantity: 1 }  // Garlic Naan
    ],
    status: 'Dine In',
    time: "2 mins ago",
    paymentMethod: 'Scan'
  },
  {
    id: "FO012",
    tableNumber: "02",
    customerName: "Kylian Mbappé",
    items: [
      { menuItem: MENU_ITEMS.find(m => m.id === "s1") || MENU_ITEMS[0], quantity: 1 }, // Paneer Tikka
      { menuItem: MENU_ITEMS.find(m => m.id === "v1") || MENU_ITEMS[1], quantity: 2 }  // Mango Lassi
    ],
    status: 'Waitlist',
    time: "Just now",
    paymentMethod: 'Cash'
  },
  {
    id: "FO031",
    tableNumber: "08",
    customerName: "Robert Lewan",
    items: [
      { menuItem: MENU_ITEMS.find(m => m.id === "m5") || MENU_ITEMS[0], quantity: 1 }, // Hyderabadi Biryani
      { menuItem: MENU_ITEMS.find(m => m.id === "d2") || MENU_ITEMS[1], quantity: 1 }  // Rasmalai
    ],
    status: 'Take Away',
    time: "10 mins ago",
    paymentMethod: 'Credit'
  },
  {
    id: "FO009",
    tableNumber: "15",
    customerName: "Alex Morgan",
    items: [
      { menuItem: MENU_ITEMS.find(m => m.id === "s2") || MENU_ITEMS[0], quantity: 3 }, // Chicken Tikka
      { menuItem: MENU_ITEMS.find(m => m.id === "b1") || MENU_ITEMS[1], quantity: 3 }  // Butter Naan
    ],
    status: 'Served',
    time: "45 mins ago",
    paymentMethod: 'Credit',
    isSettled: true
  }
];

// Initial pre-populated reservations for the reservation tab
interface ReservationRecord {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber?: string;
  status: 'Confirmed' | 'Seated' | 'Cancelled';
}

const INITIAL_RESERVATIONS: ReservationRecord[] = [
  { id: "RES-9821", name: "Ananya Sen", phone: "+91 91234 56780", date: "2026-07-08", time: "19:30", guests: 4, tableNumber: "12", status: 'Seated' },
  { id: "RES-4432", name: "Vikram Malhotra", phone: "+91 98865 43210", date: "2026-07-08", time: "20:00", guests: 2, tableNumber: "04", status: 'Confirmed' },
  { id: "RES-1205", name: "Dr. Srinivas Raju", phone: "+91 94480 11223", date: "2026-07-08", time: "21:15", guests: 6, status: 'Confirmed' },
  { id: "RES-8891", name: "Sarah Thomas", phone: "+91 80500 90010", date: "2026-07-09", time: "12:30", guests: 5, status: 'Confirmed' }
];

// Initial customer loyalty records
interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  visitCount: number;
  totalSpent: number;
  tier: 'VIP Sovereign' | 'Royal Patron' | 'Diner Member';
  notes: string;
}

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  { id: "CUST-001", name: "Haaland Joy", phone: "+91 99000 88771", email: "joy.haaland@gmail.com", visitCount: 24, totalSpent: 18450, tier: 'VIP Sovereign', notes: 'Prefers non-spicy butter chicken, loves window seats.' },
  { id: "CUST-002", name: "Kylian Mbappé", phone: "+91 98760 12345", email: "kylian.m@foot.fr", visitCount: 15, totalSpent: 9280, tier: 'Royal Patron', notes: 'Allergies: Cashews. Request extra green chutney.' },
  { id: "CUST-003", name: "Alex Morgan", phone: "+91 88877 66554", email: "alex.morgan@usoc.org", visitCount: 38, totalSpent: 29400, tier: 'VIP Sovereign', notes: 'Regular weekend brunch diner. Prefers Masala Chai.' },
  { id: "CUST-004", name: "Robert Lewan", phone: "+91 70192 38475", email: "robert.lewy@poland.pl", visitCount: 8, totalSpent: 4200, tier: 'Diner Member', notes: 'Loves spicy Hyderabadi Biryani.' },
  { id: "CUST-005", name: "Priya S.", phone: "+91 94472 90182", email: "priya.sen@infy.com", visitCount: 5, totalSpent: 2150, tier: 'Diner Member', notes: 'Loves Garlic Naans and Paneer Butter Masala.' }
];

export default function Dashboard({ onClose, onAddToast }: DashboardProps) {
  // Navigation: matches reference image sidebar list
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reservation' | 'customers' | 'report' | 'transaction'>('dashboard');

  // Master lists
  const [orders, setOrders] = useState<DashboardOrder[]>(INITIAL_ORDERS);
  const [reservations, setReservations] = useState<ReservationRecord[]>(INITIAL_RESERVATIONS);
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);

  // Filter states
  const [activeOrderFilter, setActiveOrderFilter] = useState<'All' | 'Dine In' | 'Waitlist' | 'Take Away' | 'Served'>('All');
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('starters');

  // Right Panel State: either viewing/editing an existing order, or creating a new order
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // New Order Form states (when selectedOrderId is null or we are in "Create" mode)
  const [newOrderCart, setNewOrderCart] = useState<{ menuItem: MenuItem; quantity: number }[]>([]);
  const [customerName, setCustomerName] = useState('Haaland Joy');
  const [tableNumber, setTableNumber] = useState('12');
  const [orderType, setOrderType] = useState<'Dine In' | 'Waitlist' | 'Take Away'>('Dine In');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Scan' | 'Credit'>('Scan');

  // Interactive menu list
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(menuSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, menuSearchQuery]);

  // Counts for Order Line filter pills
  const counts = useMemo(() => {
    return {
      All: orders.length,
      'Dine In': orders.filter(o => o.status === 'Dine In').length,
      Waitlist: orders.filter(o => o.status === 'Waitlist').length,
      'Take Away': orders.filter(o => o.status === 'Take Away').length,
      Served: orders.filter(o => o.status === 'Served').length,
    };
  }, [orders]);

  // Order being displayed in right-hand side panel
  const currentDisplayedOrder = useMemo(() => {
    if (selectedOrderId) {
      return orders.find(o => o.id === selectedOrderId) || null;
    }
    return null;
  }, [selectedOrderId, orders]);

  // Calculation for whichever cart is active (existing vs new)
  const activeItemsList = useMemo(() => {
    if (currentDisplayedOrder) {
      return currentDisplayedOrder.items;
    }
    return newOrderCart;
  }, [currentDisplayedOrder, newOrderCart]);

  const subtotal = useMemo(() => {
    return activeItemsList.reduce((acc, curr) => acc + (curr.menuItem.price * curr.quantity), 0);
  }, [activeItemsList]);

  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  // Add Item to cart helper
  const handleAddItemToCart = (item: MenuItem) => {
    if (currentDisplayedOrder) {
      // Modify existing live order
      setOrders(prev => prev.map(o => {
        if (o.id === currentDisplayedOrder.id) {
          const itemIdx = o.items.findIndex(it => it.menuItem.id === item.id);
          let updatedItems = [...o.items];
          if (itemIdx > -1) {
            updatedItems[itemIdx] = { ...updatedItems[itemIdx], quantity: updatedItems[itemIdx].quantity + 1 };
          } else {
            updatedItems.push({ menuItem: item, quantity: 1 });
          }
          return { ...o, items: updatedItems };
        }
        return o;
      }));
    } else {
      // Add to new draft order
      setNewOrderCart(prev => {
        const itemIdx = prev.findIndex(it => it.menuItem.id === item.id);
        if (itemIdx > -1) {
          const updated = [...prev];
          updated[itemIdx] = { ...updated[itemIdx], quantity: updated[itemIdx].quantity + 1 };
          return updated;
        }
        return [...prev, { menuItem: item, quantity: 1 }];
      });
    }
  };

  // Adjust quantity helper
  const handleUpdateItemQty = (itemId: string, diff: number) => {
    if (currentDisplayedOrder) {
      setOrders(prev => prev.map(o => {
        if (o.id === currentDisplayedOrder.id) {
          const updatedItems = o.items.map(it => {
            if (it.menuItem.id === itemId) {
              return { ...it, quantity: Math.max(1, it.quantity + diff) };
            }
            return it;
          });
          return { ...o, items: updatedItems };
        }
        return o;
      }));
    } else {
      setNewOrderCart(prev => {
        return prev.map(it => {
          if (it.menuItem.id === itemId) {
            return { ...it, quantity: Math.max(1, it.quantity + diff) };
          }
          return it;
        }).filter(it => it.quantity > 0);
      });
    }
  };

  // Delete item from cart helper
  const handleRemoveItemFromCart = (itemId: string) => {
    if (currentDisplayedOrder) {
      setOrders(prev => prev.map(o => {
        if (o.id === currentDisplayedOrder.id) {
          return { ...o, items: o.items.filter(it => it.menuItem.id !== itemId) };
        }
        return o;
      }));
    } else {
      setNewOrderCart(prev => prev.filter(it => it.menuItem.id !== itemId));
    }
  };

  // Settle Order or Place draft order
  const handleSettleOrPlace = () => {
    if (activeItemsList.length === 0) {
      onAddToast("Please add dishes to the order list.");
      return;
    }

    if (currentDisplayedOrder) {
      // Mark an existing active order as Served & Settled
      setOrders(prev => prev.map(o => {
        if (o.id === currentDisplayedOrder.id) {
          return { ...o, status: 'Served', isSettled: true };
        }
        return o;
      }));
      onAddToast(`Order #${currentDisplayedOrder.id} successfully settled and kitchen ticket updated.`);
      setSelectedOrderId(null);
    } else {
      // Place new draft order
      const newId = `FO0${Math.floor(Math.random() * 90) + 10}`;
      const newOrder: DashboardOrder = {
        id: newId,
        tableNumber: tableNumber,
        customerName: customerName,
        items: [...newOrderCart],
        status: orderType,
        time: "Just now",
        paymentMethod: paymentMethod
      };

      setOrders(prev => [newOrder, ...prev]);

      // Add to customers loyalty profile spending
      const existingCust = customers.find(c => c.name.toLowerCase() === customerName.toLowerCase());
      if (existingCust) {
        setCustomers(prev => prev.map(c => {
          if (c.id === existingCust.id) {
            return {
              ...c,
              visitCount: c.visitCount + 1,
              totalSpent: c.totalSpent + grandTotal
            };
          }
          return c;
        }));
      } else {
        // create guest customer profile
        const newCustId = `CUST-0${customers.length + 1}`;
        const newCust: CustomerRecord = {
          id: newCustId,
          name: customerName,
          phone: "+91 90000 00000",
          email: `${customerName.toLowerCase().replace(' ', '')}@gmail.com`,
          visitCount: 1,
          totalSpent: grandTotal,
          tier: 'Diner Member',
          notes: 'Walk-in draft guest.'
        };
        setCustomers(prev => [...prev, newCust]);
      }

      onAddToast(`Order #${newId} placed successfully. Ticket routed to kitchen tandoors.`);
      
      // Reset drafting states
      setNewOrderCart([]);
      setCustomerName('Haaland Joy');
      setTableNumber('12');
      setOrderType('Dine In');
    }
  };

  // Receipt visual overlay / print preview simulation
  const [showReceiptOverlay, setShowReceiptOverlay] = useState(false);
  const [receiptData, setReceiptData] = useState<DashboardOrder | null>(null);

  const triggerPrintReceipt = () => {
    if (currentDisplayedOrder) {
      setReceiptData(currentDisplayedOrder);
    } else {
      // draft order receipt
      if (newOrderCart.length === 0) {
        onAddToast("Add items to draft order to preview printable receipt.");
        return;
      }
      setReceiptData({
        id: "DRAFT-POS",
        tableNumber: tableNumber,
        customerName: customerName,
        items: newOrderCart,
        status: orderType,
        time: "Draft Preview",
        paymentMethod: paymentMethod
      });
    }
    setShowReceiptOverlay(true);
  };

  const handleTriggerBrowserPrint = () => {
    window.print();
  };

  // Set selected order from table list
  const handleSelectOrderCard = (order: DashboardOrder) => {
    setSelectedOrderId(order.id);
  };

  // Draft new order button
  const handleDraftNewOrder = () => {
    setSelectedOrderId(null);
    setNewOrderCart([]);
  };

  // Total Gross sales calculations
  const totalGrossSales = useMemo(() => {
    return orders.reduce((acc, curr) => {
      const orderSum = curr.items.reduce((s, item) => s + (item.menuItem.price * item.quantity), 0);
      return acc + orderSum;
    }, 0);
  }, [orders]);

  // Categories helper list with reference matching icons
  const CATEGORIES = [
    { key: 'starters' as MenuCategory, label: 'Starters', icon: <Flame className="w-5 h-5" /> },
    { key: 'main-course' as MenuCategory, label: 'Curries', icon: <ChefHat className="w-5 h-5" /> },
    { key: 'indian-breads' as MenuCategory, label: 'Breads', icon: <Sparkles className="w-5 h-5" /> },
    { key: 'desserts' as MenuCategory, label: 'Desserts', icon: <Award className="w-5 h-5" /> },
    { key: 'beverages' as MenuCategory, label: 'Drinks', icon: <GlassWater className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#070503] text-zinc-100 flex overflow-hidden font-sans select-none print:bg-white print:text-black">
      
      {/* 1. LEFT SIDEBAR (Exactly like reference image Tabetei panel) */}
      <aside className="w-64 bg-zinc-950 border-r border-yellow-400/10 flex flex-col justify-between p-6 shrink-0 print:hidden">
        {/* Brand Header */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shadow-md shadow-yellow-400/20">
              <Flame className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="font-serif text-lg font-black tracking-tight text-white block">Spice Heritage</span>
              <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-widest block font-mono">Staff Portal</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider pl-3 block mb-3">Menu</span>
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              <span>Dashboard</span>
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
              <span>Reservation</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <Users className="w-4.5 h-4.5" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <BarChart3 className="w-4.5 h-4.5" />
              <span>Report</span>
            </button>

            <button
              onClick={() => setActiveTab('transaction')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'transaction'
                  ? 'bg-yellow-450 text-black shadow-lg shadow-yellow-400/15'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <Receipt className="w-4.5 h-4.5" />
              <span>Transaction</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-4 pt-6 border-t border-yellow-400/5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider pl-3 block">Another Menu</span>
          
          <button
            onClick={() => onAddToast("Settings panel loaded. Thermal printers synced successfully.")}
            className="w-full flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white text-xs font-semibold hover:bg-zinc-900/40 cursor-pointer"
          >
            <Settings className="w-4.5 h-4.5 text-zinc-500" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => onAddToast("Spice Heritage POS System. Built securely for browser & tablet terminals.")}
            className="w-full flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white text-xs font-semibold hover:bg-zinc-900/40 cursor-pointer"
          >
            <Info className="w-4.5 h-4.5 text-zinc-500" />
            <span>Info</span>
          </button>

          <button
            onClick={onClose}
            className="w-full flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/15 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer mt-2"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* 2. MIDDLE MAIN SECTION */}
      <main className="flex-grow flex flex-col overflow-y-auto bg-[#070503] relative min-w-0">
        
        {/* Top Header Section */}
        <header className="p-6 border-b border-yellow-400/10 flex items-center justify-between shrink-0 print:hidden">
          {/* Search box matching reference image */}
          <div className="relative w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search menu, dishes, or tables..."
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-yellow-400/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/20 transition-all font-semibold"
            />
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-xs font-black text-white block">Arjun Mehta</span>
              <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider block">Head Chef / Owner</span>
            </div>
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-yellow-400/25">
              <img 
                src="/src/assets/images/chef_arjun_mehta_1783514024218.jpg" 
                alt="Chef Arjun" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Content Tabs Switcher */}
        <div className="p-6 flex-grow flex flex-col space-y-6">
          
          {/* ==================== DASHBOARD TAB ==================== */}
          {activeTab === 'dashboard' && (
            <div className="flex-grow flex flex-col space-y-6 animate-fade-in">
              
              {/* Order Line Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-wider text-yellow-400 font-display">Order Line</h3>
                  <button 
                    onClick={handleDraftNewOrder}
                    className="text-xs font-black uppercase text-yellow-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Order</span>
                  </button>
                </div>

                {/* Filter tags matching reference image */}
                <div className="flex flex-wrap gap-2.5 pb-1">
                  {(['All', 'Dine In', 'Waitlist', 'Take Away', 'Served'] as const).map((filter) => {
                    const isActive = activeOrderFilter === filter;
                    return (
                      <button
                        key={filter}
                        onClick={() => setActiveOrderFilter(filter)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all flex items-center space-x-2 border cursor-pointer ${
                          isActive
                            ? 'bg-yellow-400 text-black border-transparent shadow-md'
                            : 'bg-zinc-950 text-zinc-400 border-yellow-400/10 hover:border-yellow-400/25 hover:text-zinc-200'
                        }`}
                      >
                        <span>{filter}</span>
                        <span className={`w-4.5 h-4.5 rounded-full text-[9px] font-black flex items-center justify-center ${
                          isActive ? 'bg-black text-yellow-400' : 'bg-zinc-900 text-zinc-400'
                        }`}>
                          {counts[filter as keyof typeof counts]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Horizontal Scrolling Order Cards */}
                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
                  {orders
                    .filter(o => activeOrderFilter === 'All' || o.status === activeOrderFilter)
                    .map((order) => {
                      const isSelected = selectedOrderId === order.id;
                      const orderSub = order.items.reduce((s, i) => s + (i.menuItem.price * i.quantity), 0);
                      const displayQty = order.items.reduce((s, i) => s + i.quantity, 0);

                      return (
                        <div
                          key={order.id}
                          onClick={() => handleSelectOrderCard(order)}
                          className={`w-64 p-4.5 rounded-2xl border transition-all shrink-0 snap-start cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-zinc-900 border-yellow-400/50 shadow-lg shadow-yellow-400/5 ring-1 ring-yellow-400/25'
                              : 'bg-zinc-950 border-yellow-400/10 hover:border-yellow-400/25'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-xs font-black text-white">Order #{order.id}</h4>
                                <span className="text-[10px] text-zinc-400 font-bold block mt-0.5">Table {order.tableNumber}</span>
                              </div>
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                order.status === 'Served'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                  : order.status === 'Waitlist'
                                  ? 'bg-purple-950 text-purple-400 border border-purple-500/30'
                                  : order.status === 'Take Away'
                                  ? 'bg-blue-950 text-blue-400 border border-blue-500/30'
                                  : 'bg-yellow-950 text-yellow-400 border border-yellow-500/20'
                              }`}>
                                {order.status}
                              </span>
                            </div>

                            <div className="space-y-1 py-1">
                              {order.items.slice(0, 2).map((it, i) => (
                                <p key={i} className="text-xs text-zinc-300 font-semibold truncate">
                                  {it.quantity}x {it.menuItem.name}
                                </p>
                              ))}
                              {order.items.length > 2 && (
                                <p className="text-[10px] text-zinc-500 font-medium italic">
                                  + {order.items.length - 2} more items
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-yellow-400/5 mt-2">
                            <span className="text-[10px] text-zinc-500 font-medium">{order.time}</span>
                            <span className="text-xs font-serif font-black text-yellow-400">₹{orderSub}</span>
                          </div>
                        </div>
                      );
                    })}
                  {orders.filter(o => activeOrderFilter === 'All' || o.status === activeOrderFilter).length === 0 && (
                    <div className="w-full py-8 text-center bg-zinc-950/20 border border-dashed border-yellow-400/5 rounded-2xl">
                      <p className="text-xs text-zinc-500 font-bold">No active orders in this queue.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Menu Categories selection bar (Soup, Ramen, Sushi, Beverages) */}
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-wider text-yellow-400 font-display">Menu Categories</h3>
                <div className="flex space-x-3 overflow-x-auto pb-1">
                  {CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`px-5 py-3.5 rounded-2xl border flex items-center space-x-3 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-yellow-400 text-black border-transparent shadow-md'
                            : 'bg-zinc-950 text-zinc-400 border-yellow-400/10 hover:border-yellow-400/25'
                        }`}
                      >
                        {cat.icon}
                        <span className="text-xs font-black uppercase tracking-wider">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Menu Dishes Grid list */}
              <div className="space-y-3 flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black uppercase tracking-wider text-yellow-400 font-display">Select Dishes</h3>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">{filteredMenuItems.length} dishes in category</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMenuItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-zinc-950 rounded-2xl border border-yellow-400/10 flex gap-3.5 hover:border-yellow-400/25 transition-all group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-yellow-400/5 shrink-0 relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black shadow" />
                      </div>

                      <div className="flex-grow flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="text-xs font-black text-white truncate leading-tight group-hover:text-yellow-400 transition-colors">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-[9px] text-zinc-500 line-clamp-1 mt-0.5 leading-normal">{item.description}</p>
                        </div>

                        <div className="flex justify-between items-center mt-1.5">
                          <span className="text-xs font-serif font-black text-yellow-400">₹{item.price}</span>
                          <button
                            onClick={() => handleAddItemToCart(item)}
                            className="px-2.5 py-1 rounded-lg bg-yellow-400/10 hover:bg-yellow-400 text-yellow-400 hover:text-black text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== RESERVATIONS TAB ==================== */}
          {activeTab === 'reservation' && (
            <div className="flex-grow flex flex-col space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Table Allocations & Bookings</h3>
                  <p className="text-xs text-zinc-500 mt-0.5 font-normal">Manage daily reservations, allot tables, and welcome premium patrons.</p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt("Enter guest name:");
                    if (!name) return;
                    const guestsStr = prompt("Enter guests count:", "2");
                    const guests = parseInt(guestsStr || '2', 10);
                    const newRes: ReservationRecord = {
                      id: `RES-${Math.floor(Math.random() * 9000) + 1000}`,
                      name,
                      phone: "+91 99887 76655",
                      date: "2026-07-08",
                      time: "20:00",
                      guests,
                      status: 'Confirmed'
                    };
                    setReservations(prev => [newRes, ...prev]);
                    onAddToast(`Reservation created for ${name}.`);
                  }}
                  className="px-4 py-2 rounded-xl bg-yellow-400 text-black text-xs font-black uppercase tracking-widest hover:bg-yellow-300 transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Manual Reservation</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Stats cards for Reservation */}
                <div className="p-4 bg-zinc-950 border border-yellow-400/10 rounded-2xl flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Bookings</span>
                    <h4 className="text-xl font-serif font-bold text-white mt-0.5">{reservations.filter(r => r.status === 'Confirmed').length} Tables</h4>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 border border-yellow-400/10 rounded-2xl flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Seated Patrons</span>
                    <h4 className="text-xl font-serif font-bold text-white mt-0.5">{reservations.filter(r => r.status === 'Seated').length} Tables</h4>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 border border-yellow-400/10 rounded-2xl flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Reserved Seats</span>
                    <h4 className="text-xl font-serif font-bold text-white mt-0.5">
                      {reservations.reduce((acc, curr) => acc + (curr.status !== 'Cancelled' ? curr.guests : 0), 0)} Diners
                    </h4>
                  </div>
                </div>
              </div>

              {/* Main List Table */}
              <div className="bg-zinc-950 border border-yellow-400/10 rounded-2xl overflow-hidden">
                <div className="p-4 bg-zinc-900/40 border-b border-yellow-400/5 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-yellow-400">Reservation Logs</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-yellow-400/10 bg-zinc-950 text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                        <th className="p-4">Diner Code</th>
                        <th className="p-4">Guest Name</th>
                        <th className="p-4">Party Size</th>
                        <th className="p-4">Time Window</th>
                        <th className="p-4">Allocated Table</th>
                        <th className="p-4">Log Status</th>
                        <th className="p-4 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-400/5">
                      {reservations.map((res) => (
                        <tr key={res.id} className="hover:bg-zinc-900/30 text-xs font-semibold">
                          <td className="p-4 font-mono text-zinc-400 text-[11px]">{res.id}</td>
                          <td className="p-4 text-white">
                            <div>
                              <span>{res.name}</span>
                              <span className="text-[10px] text-zinc-500 block font-normal mt-0.5">{res.phone}</span>
                            </div>
                          </td>
                          <td className="p-4 text-white">{res.guests} Guests</td>
                          <td className="p-4 text-zinc-300">{res.date} • {res.time}</td>
                          <td className="p-4 text-yellow-400">
                            {res.tableNumber ? `Table #${res.tableNumber}` : (
                              <button
                                onClick={() => {
                                  const tbl = prompt("Allocate Table Number (e.g. 05, 12):");
                                  if (!tbl) return;
                                  setReservations(prev => prev.map(r => r.id === res.id ? { ...r, tableNumber: tbl } : r));
                                  onAddToast(`Table #${tbl} allocated to ${res.name}.`);
                                }}
                                className="px-2 py-1 rounded bg-yellow-400/10 text-yellow-400 text-[10px] font-black uppercase tracking-wide cursor-pointer"
                              >
                                Allocate Table
                              </button>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              res.status === 'Seated'
                                ? 'bg-emerald-950 text-emerald-450 border border-emerald-500/20'
                                : 'bg-yellow-950 text-yellow-405 border border-yellow-500/20'
                            }`}>
                              {res.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            {res.status === 'Confirmed' && (
                              <button
                                onClick={() => {
                                  setReservations(prev => prev.map(r => r.id === res.id ? { ...r, status: 'Seated' } : r));
                                  onAddToast(`Patron ${res.name} marked as Seated.`);
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-black text-[10px] font-black uppercase tracking-wider cursor-pointer hover:bg-emerald-400 transition-colors"
                              >
                                Mark Seated
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (confirm(`Cancel reservation for ${res.name}?`)) {
                                  setReservations(prev => prev.filter(r => r.id !== res.id));
                                  onAddToast(`Reservation for ${res.name} cancelled.`);
                                }
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-400 text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors"
                            >
                              Dismiss
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== CUSTOMERS TAB ==================== */}
          {activeTab === 'customers' && (
            <div className="flex-grow flex flex-col space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Loyalty & Guest Profiles</h3>
                  <p className="text-xs text-zinc-500 mt-0.5 font-normal">Track spending tiers, order frequencies, and chef customized preferences.</p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt("Customer Full Name:");
                    if (!name) return;
                    const phone = prompt("Phone Number:");
                    const newCust: CustomerRecord = {
                      id: `CUST-0${customers.length + 1}`,
                      name,
                      phone: phone || "+91 99999 88888",
                      email: `${name.toLowerCase().replace(' ', '')}@gmail.com`,
                      visitCount: 1,
                      totalSpent: 450,
                      tier: 'Diner Member',
                      notes: 'New loyal guest registered.'
                    };
                    setCustomers(prev => [...prev, newCust]);
                    onAddToast(`Customer profile created for ${name}.`);
                  }}
                  className="px-4 py-2 rounded-xl bg-yellow-400 text-black text-xs font-black uppercase tracking-widest hover:bg-yellow-300 transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Customer</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {customers.map((cust) => (
                  <div
                    key={cust.id}
                    className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl space-y-4 hover:border-yellow-400/25 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-yellow-400/20 flex items-center justify-center text-yellow-400 font-serif font-black">
                          {cust.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-white">{cust.name}</h4>
                          <span className="text-[10px] text-zinc-500 font-mono">{cust.id}</span>
                        </div>
                      </div>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        cust.tier === 'VIP Sovereign'
                          ? 'bg-yellow-400 text-black'
                          : cust.tier === 'Royal Patron'
                          ? 'bg-zinc-800 text-yellow-400 border border-yellow-400/20'
                          : 'bg-zinc-900 text-zinc-400'
                      }`}>
                        {cust.tier}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 bg-black/40 p-3 rounded-xl border border-yellow-400/5">
                      <div>
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Visits</span>
                        <span className="text-sm font-bold text-white block mt-0.5">{cust.visitCount} times</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Spendings</span>
                        <span className="text-sm font-serif font-bold text-yellow-400 block mt-0.5">₹{cust.totalSpent}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between text-zinc-400">
                        <span>Phone:</span>
                        <span className="text-white font-mono">{cust.phone}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Email:</span>
                        <span className="text-white font-mono">{cust.email}</span>
                      </div>
                    </div>

                    {cust.notes && (
                      <div className="p-2.5 rounded-lg bg-zinc-900/60 text-[10px] text-zinc-400 leading-normal border border-yellow-400/5">
                        <span className="font-bold text-yellow-400 uppercase tracking-widest block text-[8px] mb-0.5">Kitchen Memo:</span>
                        "{cust.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== REPORT TAB ==================== */}
          {activeTab === 'report' && (
            <div className="flex-grow flex flex-col space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Sales Report & Kitchen Diagnostics</h3>
                <p className="text-xs text-zinc-500 mt-0.5 font-normal">Real-time terminal transaction volumes, ingredient demands, and seat turnover.</p>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Gross Sales Volume</span>
                    <TrendingUp className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif font-black text-yellow-400">₹{totalGrossSales}</h4>
                    <span className="text-[10px] text-emerald-400 font-bold block mt-1">↑ +14.8% from yesterday</span>
                  </div>
                </div>

                <div className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Avg Order Settle</span>
                    <CircleDollarSign className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif font-black text-white">₹{Math.round(totalGrossSales / orders.length || 0)}</h4>
                    <span className="text-[10px] text-emerald-400 font-bold block mt-1">Based on {orders.length} active bills</span>
                  </div>
                </div>

                <div className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Customer Sat Rate</span>
                    <Award className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif font-black text-white">98.2%</h4>
                    <span className="text-[10px] text-zinc-400 block mt-1">Based on tablet food feedback</span>
                  </div>
                </div>

                <div className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Table Seating Turn</span>
                    <Store className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif font-black text-white">3.4x / Hr</h4>
                    <span className="text-[10px] text-purple-400 font-bold block mt-1">Optimized kitchen queues</span>
                  </div>
                </div>
              </div>

              {/* Interactive SVG Graphs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Area chart SVG for sales trends */}
                <div className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black uppercase text-white">Hourly Billing Curve</h4>
                      <span className="text-[10px] text-zinc-500 font-medium mt-0.5">Peak Indian dinner rush times</span>
                    </div>
                    <span className="text-xs text-yellow-400 font-serif font-bold">Total: ₹{totalGrossSales}</span>
                  </div>
                  
                  {/* Beautiful customized responsive SVG Chart */}
                  <div className="h-56 w-full bg-black/40 border border-yellow-400/5 rounded-xl p-3 flex flex-col justify-between">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#facc15" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#facc15" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(250, 204, 21, 0.05)" strokeDasharray="3,3" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(250, 204, 21, 0.05)" strokeDasharray="3,3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(250, 204, 21, 0.05)" strokeDasharray="3,3" />

                      {/* Area Path */}
                      <path 
                        d="M 10,130 C 50,110 100,120 150,70 C 200,30 250,60 300,40 C 350,20 400,10 490,5 Z L 490,130 Z" 
                        fill="url(#chartGrad)" 
                      />
                      
                      {/* Line Path */}
                      <path 
                        d="M 10,130 C 50,110 100,120 150,70 C 200,30 250,60 300,40 C 350,20 400,10 490,5" 
                        fill="none" 
                        stroke="#facc15" 
                        strokeWidth="2.5" 
                      />

                      {/* Data Dots */}
                      <circle cx="150" cy="70" r="4.5" fill="#facc15" stroke="#000" strokeWidth="1.5" />
                      <circle cx="300" cy="40" r="4.5" fill="#facc15" stroke="#000" strokeWidth="1.5" />
                      <circle cx="490" cy="5" r="4.5" fill="#facc15" stroke="#000" strokeWidth="1.5" />
                    </svg>
                    
                    <div className="flex justify-between text-[9px] text-zinc-500 font-black font-mono px-1 uppercase tracking-wider">
                      <span>12:00 PM</span>
                      <span>03:00 PM</span>
                      <span>06:00 PM (Lunch)</span>
                      <span>08:00 PM (Peak Dinner Rush)</span>
                      <span>11:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* 2. Donut chart SVG for Category Popularity */}
                <div className="p-5 bg-zinc-950 border border-yellow-400/10 rounded-2xl space-y-4">
                  <h4 className="text-xs font-black uppercase text-white">Delicacy Volume Breakdown</h4>
                  
                  <div className="h-56 w-full bg-black/40 border border-yellow-400/5 rounded-xl p-4 flex items-center justify-around">
                    
                    {/* Circle donut */}
                    <svg className="w-36 h-36 transform -rotate-90 overflow-visible" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#18181b" strokeWidth="4" />
                      
                      {/* Curries 45% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#facc15" strokeWidth="4" 
                        strokeDasharray="45 55" strokeDashoffset="0" 
                      />
                      {/* Starters 30% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a1a1aa" strokeWidth="4.5" 
                        strokeDasharray="30 70" strokeDashoffset="-45" 
                      />
                      {/* Drinks 15% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4" 
                        strokeDasharray="15 85" strokeDashoffset="-75" 
                      />
                      {/* Bread 10% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a855f7" strokeWidth="4" 
                        strokeDasharray="10 90" strokeDashoffset="-90" 
                      />
                    </svg>

                    {/* Legends list */}
                    <div className="space-y-2.5 text-[10px] font-semibold text-zinc-400">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block" />
                        <span className="text-white">Curries / Mains (45%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 block" />
                        <span>Oak Tandoor Starters (30%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block" />
                        <span>Mango Lassis / Drinks (15%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 block" />
                        <span>Tandoori Naan Breads (10%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TRANSACTION TAB ==================== */}
          {activeTab === 'transaction' && (
            <div className="flex-grow flex flex-col space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Archived Bills & Transaction History</h3>
                <p className="text-xs text-zinc-500 mt-0.5 font-normal">Review payment methods, transaction reference numbers, and re-print customer bills.</p>
              </div>

              <div className="bg-zinc-950 border border-yellow-400/10 rounded-2xl overflow-hidden">
                <div className="p-4 bg-zinc-900/40 border-b border-yellow-400/5">
                  <span className="text-xs font-black uppercase tracking-wider text-yellow-400">Transaction Logs</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-yellow-400/10 bg-zinc-950 text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                        <th className="p-4">TXN Code</th>
                        <th className="p-4">Table</th>
                        <th className="p-4">Diner Name</th>
                        <th className="p-4">Dishes Count</th>
                        <th className="p-4">Billing Channel</th>
                        <th className="p-4">Grand Total</th>
                        <th className="p-4 text-right">Bills Printout</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-400/5">
                      {orders.map((order) => {
                        const orderSum = order.items.reduce((s, i) => s + (i.menuItem.price * i.quantity), 0);
                        const tax = Math.round(orderSum * 0.05);
                        const total = orderSum + tax;
                        return (
                          <tr key={order.id} className="hover:bg-zinc-900/30 text-xs font-semibold">
                            <td className="p-4 font-mono text-zinc-400 text-[11px]">TXN-{order.id}889</td>
                            <td className="p-4 text-white">Table {order.tableNumber}</td>
                            <td className="p-4 text-zinc-200">{order.customerName}</td>
                            <td className="p-4 text-zinc-300">
                              {order.items.reduce((acc, curr) => acc + curr.quantity, 0)} items
                            </td>
                            <td className="p-4 text-yellow-400 font-mono text-[10px] tracking-wider uppercase">
                              {order.paymentMethod === 'Scan' ? 'UPI Scan' : order.paymentMethod}
                            </td>
                            <td className="p-4 font-serif font-bold text-white">₹{total}</td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => {
                                  setReceiptData(order);
                                  setShowReceiptOverlay(true);
                                }}
                                className="px-3 py-1.5 rounded bg-zinc-900 border border-yellow-400/15 text-yellow-400 hover:text-black hover:bg-yellow-400 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                <span>Re-Print</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* 3. RIGHT PANEL (Current Order details & checkout list exactly like Haaland Joy ticket in reference) */}
      <aside className="w-80 bg-zinc-950 border-l border-yellow-400/10 flex flex-col justify-between shrink-0 print:hidden">
        
        {/* Header containing Name + Order # */}
        <div className="p-6 border-b border-yellow-400/10 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              {currentDisplayedOrder ? (
                <>
                  <h3 className="font-serif text-base font-black text-white">{currentDisplayedOrder.customerName}</h3>
                  <span className="text-[10px] text-zinc-400 font-bold block mt-0.5">Order #{currentDisplayedOrder.id} • Table {currentDisplayedOrder.tableNumber}</span>
                </>
              ) : (
                <>
                  <h3 className="font-serif text-base font-black text-white">New Order Draft</h3>
                  <span className="text-[10px] text-yellow-400 font-bold block mt-0.5">Creating custom cashier receipt...</span>
                </>
              )}
            </div>

            <button 
              onClick={handleDraftNewOrder}
              className="p-1 rounded bg-yellow-400/5 hover:bg-yellow-400 text-yellow-400 hover:text-black transition-colors"
              title="Draft New Order"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Draft Inputs if creation mode */}
          {!currentDisplayedOrder && (
            <div className="space-y-2 pb-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-black border border-yellow-400/10 text-white placeholder-zinc-700 text-[11px] font-semibold focus:outline-none focus:border-yellow-400/40"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Table Number</label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-black border border-yellow-400/10 text-white text-[11px] font-semibold focus:outline-none focus:border-yellow-400/40 cursor-pointer"
                  >
                    {["01", "02", "04", "08", "12", "15", "18", "24"].map(n => (
                      <option key={n} value={n}>Table {n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(['Dine In', 'Waitlist', 'Take Away'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`py-1 rounded text-[9px] font-bold uppercase border transition-all cursor-pointer ${
                      orderType === type
                        ? 'bg-yellow-400 text-black border-transparent'
                        : 'bg-black text-zinc-400 border-yellow-400/10 hover:border-yellow-400/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ordered items list */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-yellow-400/5 pb-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Ordered Items</span>
            <span className="text-[10px] bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full font-black">
              {activeItemsList.reduce((acc, curr) => acc + curr.quantity, 0)}
            </span>
          </div>

          <div className="space-y-3.5">
            {activeItemsList.map((item) => (
              <div key={item.menuItem.id} className="flex gap-3 justify-between items-start text-xs">
                <div className="min-w-0 flex-grow">
                  <h4 className="font-bold text-white truncate leading-tight">{item.menuItem.name}</h4>
                  <span className="text-[10px] text-zinc-500 font-medium block mt-0.5">₹{item.menuItem.price} each</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-black border border-yellow-400/10 rounded p-0.5">
                    <button 
                      onClick={() => handleUpdateItemQty(item.menuItem.id, -1)}
                      className="w-4.5 h-4.5 rounded bg-zinc-900 flex items-center justify-center text-yellow-400 hover:bg-zinc-800 transition-colors"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="w-5 text-center text-[11px] font-black text-white">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateItemQty(item.menuItem.id, 1)}
                      className="w-4.5 h-4.5 rounded bg-zinc-900 flex items-center justify-center text-yellow-400 hover:bg-zinc-800 transition-colors"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  <button 
                    onClick={() => handleRemoveItemFromCart(item.menuItem.id)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="font-serif font-black text-white text-[11px] pt-1 shrink-0 w-12 text-right">
                  ₹{item.menuItem.price * item.quantity}
                </span>
              </div>
            ))}

            {activeItemsList.length === 0 && (
              <div className="text-center py-12 text-zinc-600 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-xs font-bold">Billing list is empty.</p>
                <p className="text-[10px] font-normal text-zinc-600 max-w-[150px] mx-auto">Select premium dishes from the middle menu grid to build checkout ticket.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer with summary and triggers */}
        <div className="p-6 border-t border-yellow-400/10 bg-zinc-950 space-y-4">
          
          {/* Payment summary ledger matching reference image */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400 font-bold">
              <span>Subtotal</span>
              <span className="font-serif text-white">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-zinc-400 font-bold">
              <span>SGST / CGST (5%)</span>
              <span className="font-serif text-white">₹{gst}</span>
            </div>
            <div className="flex justify-between text-zinc-400 font-bold pt-2 border-t border-yellow-400/5">
              <span>Total Bill</span>
              <span className="font-serif text-base font-black text-yellow-400">₹{grandTotal}</span>
            </div>
          </div>

          {/* Payment channels matching reference image */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Payment Method</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMethod('Cash')}
                className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                  paymentMethod === 'Cash'
                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/60'
                    : 'bg-black text-zinc-500 border-yellow-400/5 hover:border-yellow-400/20'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Cash</span>
              </button>

              <button
                onClick={() => setPaymentMethod('Scan')}
                className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                  paymentMethod === 'Scan'
                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/60'
                    : 'bg-black text-zinc-500 border-yellow-400/5 hover:border-yellow-400/20'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>UPI Scan</span>
              </button>

              <button
                onClick={() => setPaymentMethod('Credit')}
                className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                  paymentMethod === 'Credit'
                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/60'
                    : 'bg-black text-zinc-500 border-yellow-400/5 hover:border-yellow-400/20'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card</span>
              </button>
            </div>
          </div>

          {/* Double buttons print / order matching reference image bottom */}
          <div className="space-y-2 pt-2">
            <button
              onClick={triggerPrintReceipt}
              className="w-full py-3 rounded-xl border border-yellow-400/15 hover:border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-widest hover:bg-black transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={handleSettleOrPlace}
              className="w-full py-4.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 text-xs font-black uppercase tracking-widest transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>{currentDisplayedOrder ? 'Settle & Serve Order' : 'Order / Dispatch'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ==================== RECIEPT OVERLAY PRINT DIALOG ==================== */}
      <AnimatePresence>
        {showReceiptOverlay && receiptData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm print:absolute print:inset-0 print:bg-white print:text-black">
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-[#0a0705] border border-yellow-400/25 p-6 rounded-2xl shadow-2xl flex flex-col text-center space-y-6 print:border-none print:shadow-none print:p-0 print:bg-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowReceiptOverlay(false)}
                className="absolute top-4 right-4 p-1 rounded-full bg-zinc-900 border border-yellow-400/10 text-zinc-400 hover:text-white print:hidden cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Receipt Body */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <Flame className="w-8 h-8 text-yellow-400 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-white print:text-black uppercase">Spice Heritage</h3>
                  <p className="text-[9px] text-yellow-400 font-mono tracking-wider">★ BENGALURU TERMINAL ★</p>
                  <p className="text-[10px] text-zinc-500 font-normal">45 MG Road, Indiranagar, Bengaluru</p>
                </div>

                <div className="border-y border-dashed border-yellow-400/20 py-3.5 space-y-2.5 text-left text-xs font-semibold">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Receipt ID:</span>
                    <span className="text-white font-mono uppercase print:text-black">SH-TXN-{receiptData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Assigned Table:</span>
                    <span className="text-yellow-400 font-bold uppercase print:text-black">Table #{receiptData.tableNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Patron Guest:</span>
                    <span className="text-white font-bold print:text-black">{receiptData.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Payment:</span>
                    <span className="text-white font-bold print:text-black">{receiptData.paymentMethod}</span>
                  </div>
                </div>

                {/* Items breakdown list */}
                <div className="space-y-3.5 text-left text-xs">
                  <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider block">Items Details</span>
                  
                  <div className="space-y-2.5">
                    {receiptData.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-zinc-300 font-semibold truncate max-w-[200px] print:text-black">
                          {it.quantity}x {it.menuItem.name}
                        </span>
                        <span className="font-serif text-white font-bold print:text-black">
                          ₹{it.menuItem.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-yellow-400/10 pt-3.5 space-y-1.5">
                    <div className="flex justify-between text-zinc-400 font-semibold">
                      <span>Subtotal</span>
                      <span className="font-serif">₹{receiptData.items.reduce((s, it) => s + (it.menuItem.price * it.quantity), 0)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 font-semibold">
                      <span>CGST / SGST (5%)</span>
                      <span className="font-serif">₹{Math.round(receiptData.items.reduce((s, it) => s + (it.menuItem.price * it.quantity), 0) * 0.05)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-yellow-400 pt-2 border-t border-yellow-400/5 print:text-black">
                      <span>Total Invoice</span>
                      <span className="font-serif text-base text-white print:text-black">
                        ₹{Math.round(receiptData.items.reduce((s, it) => s + (it.menuItem.price * it.quantity), 0) * 1.05)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simulated barcode */}
                <div className="pt-4 space-y-1.5">
                  <div className="h-9 w-48 mx-auto flex gap-[1.5px] items-stretch justify-center opacity-70 bg-yellow-400/5 p-1 rounded border border-yellow-400/10">
                    {[2, 1, 3, 1, 1, 4, 2, 1, 2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 4].map((w, i) => (
                      <span key={i} className={`bg-yellow-400 shrink-0 print:bg-black`} style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">SH-REC-TKT-{receiptData.id}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 print:hidden">
                <button
                  onClick={() => setShowReceiptOverlay(false)}
                  className="flex-1 py-2.5 rounded-xl border border-yellow-400/25 text-white font-display text-xs font-bold uppercase hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTriggerBrowserPrint}
                  className="flex-1 py-2.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 font-display text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Paper</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
