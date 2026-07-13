import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, Sparkles, ChefHat, Bike, Compass, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onAddToast?: (msg: string) => void;
}

type OrderStatus = 'none' | 'submitting' | 'confirmed' | 'preparing' | 'dispatched' | 'completed';

export default function OrderDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddToast,
}: OrderDrawerProps) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('none');
  const [activeStep, setActiveStep] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Auto-fill mock credentials if requested
  useEffect(() => {
    if (isOpen && orderStatus !== 'none' && orderStatus !== 'submitting') {
      // Simulate live order tracking steps
      const timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev < 3) {
            return prev + 1;
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 7000); // 7s per step progression

      return () => clearInterval(timer);
    }
  }, [isOpen, orderStatus]);

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const packagingAndDelivery = subtotal > 499 ? 0 : 49;
  const grandTotal = subtotal + gst + packagingAndDelivery;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      if (onAddToast) {
        onAddToast('Error: Please fill out all checkout fields.');
      } else {
        alert('Please fill out all checkout fields.');
      }
      return;
    }

    setOrderStatus('submitting');
    setTimeout(() => {
      setOrderStatus('confirmed');
      setActiveStep(0);
      onClearCart(); // Clears active cart once order is registered
    }, 1500);
  };

  const trackingSteps = [
    { title: 'Order Registered', desc: 'Arjun Mehta is reviewing spice balances', icon: <ShoppingBag className="w-5 h-5 text-yellow-400" /> },
    { title: 'Saffron Prep & Simmering', desc: 'Infusing signature traditional woodsmoke aromas', icon: <ChefHat className="w-5 h-5 text-yellow-400" /> },
    { title: 'Out for Premium Dispatch', desc: 'Securely packed in eco-friendly copper seals', icon: <Bike className="w-5 h-5 text-yellow-400" /> },
    { title: 'Delivered', desc: 'Enjoy your hot culinary masterpiece!', icon: <CheckCircle2 className="w-5 h-5 text-green-400" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-zinc-950 border-l border-yellow-400/10 flex flex-col justify-between shadow-2xl relative"
            >
              {/* Header */}
              <div className="p-6 border-b border-yellow-400/10 flex items-center justify-between bg-zinc-950">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-serif text-xl font-bold text-white">
                    {orderStatus === 'none' ? 'Your Basket' : 'Order Progress'}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black border border-transparent hover:border-yellow-400/20 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {orderStatus === 'none' && (
                  <>
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center border border-yellow-400/20 bg-zinc-900/40 text-yellow-400">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="font-serif text-lg font-bold text-white">Your basket is empty</p>
                          <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto font-normal">
                            Add authentic clay-oven tandoori chicken, biryani, or mango lassis to begin your culinary journey.
                          </p>
                        </div>
                        <button
                          onClick={onClose}
                          className="px-5 py-2.5 rounded-xl border border-yellow-400/20 text-yellow-400 text-xs font-black uppercase tracking-widest hover:bg-black transition-colors cursor-pointer"
                        >
                          Explore Menu
                        </button>
                      </div>
                    ) : (
                      /* Cart Item List */
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-yellow-400/10">
                          <span className="text-xs font-display text-zinc-400 uppercase tracking-widest font-black">
                            Selected Delicacies
                          </span>
                          <button
                            onClick={onClearCart}
                            className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center space-x-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Empty Basket</span>
                          </button>
                        </div>

                        <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                          {cartItems.map((item) => (
                            <div
                              key={item.menuItem.id}
                              className="p-3.5 rounded-xl bg-black border border-yellow-400/10 flex gap-3.5 relative hover:border-yellow-400/25 transition-colors"
                            >
                              {/* Thumbnail */}
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 border border-yellow-400/10">
                                <img
                                  src={item.menuItem.image}
                                  alt={item.menuItem.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              {/* Details */}
                              <div className="flex-grow min-w-0">
                                <div className="flex justify-between items-start gap-1">
                                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                                    {item.menuItem.name}
                                  </h4>
                                  <span className="text-xs sm:text-sm font-bold text-yellow-400 shrink-0 font-serif">
                                    ₹{item.menuItem.price * item.quantity}
                                  </span>
                                </div>
                                
                                {item.specialInstructions && (
                                  <p className="text-[10px] text-zinc-300 italic bg-zinc-900 px-2 py-0.5 rounded mt-1 truncate font-normal">
                                    "{item.specialInstructions}"
                                  </p>
                                )}

                                {/* Quantity Adjusters */}
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center space-x-2 bg-black rounded-lg p-0.5 border border-yellow-400/15">
                                    <button
                                      onClick={() => onUpdateQuantity(item.menuItem.id, Math.max(1, item.quantity - 1))}
                                      className="w-6 h-6 rounded flex items-center justify-center text-yellow-400 hover:bg-zinc-900 transition-colors cursor-pointer"
                                    >
                                      <Minus className="w-2.5 h-2.5" />
                                    </button>
                                    <span className="text-xs font-black font-display w-6 text-center text-white">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                                      className="w-6 h-6 rounded flex items-center justify-center text-yellow-400 hover:bg-zinc-900 transition-colors cursor-pointer"
                                    >
                                      <Plus className="w-2.5 h-2.5" />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => onRemoveItem(item.menuItem.id)}
                                    className="p-1.5 text-red-400 hover:text-red-300 hover:bg-zinc-900 rounded transition-colors cursor-pointer"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Checkout Form */}
                        <form onSubmit={handleCheckout} className="border-t border-yellow-400/10 pt-4 space-y-3.5">
                          <span className="text-xs font-display text-zinc-400 uppercase tracking-widest font-black block">
                            Delivery Coordinates
                          </span>
                          <div className="space-y-2.5">
                            <input
                              type="text"
                              required
                              placeholder="Full Name"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-black border border-yellow-400/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-yellow-400 transition-all font-semibold"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="Phone Number (e.g. +91 98765 43210)"
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-black border border-yellow-400/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-yellow-400 transition-all font-semibold"
                            />
                            <textarea
                              required
                              rows={2}
                              placeholder="Full Delivery Address"
                              value={customerAddress}
                              onChange={(e) => setCustomerAddress(e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-black border border-yellow-400/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-yellow-400 transition-all resize-none font-semibold"
                            />
                          </div>
                          
                          {/* Payment disclaimer */}
                          <div className="p-2.5 rounded-lg bg-black border border-yellow-400/10 flex items-center space-x-2 text-[10px] text-zinc-300 font-normal">
                            <CreditCard className="w-4 h-4 flex-shrink-0 text-yellow-400" />
                            <span>Cash on Delivery (COD) / UPI Scan at Doorstep only</span>
                          </div>

                          {/* Submit checkout hidden trigger handles validations */}
                          <button id="submitCheckoutBtn" type="submit" className="hidden" />
                        </form>
                      </div>
                    )}
                  </>
                )}

                {/* Tracking order screen */}
                {orderStatus !== 'none' && (
                  <div className="space-y-6">
                    {orderStatus === 'submitting' ? (
                      <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full border-2 border-yellow-450 border-t-transparent animate-spin" />
                        <div>
                          <p className="font-serif text-base font-bold text-white">Transmitting Order...</p>
                          <p className="text-xs text-zinc-400 mt-1">Connecting to Spice Heritage kitchens</p>
                        </div>
                      </div>
                    ) : (
                      /* Active Step Tracking Dashboard */
                      <div className="space-y-6 py-2">
                        {/* Status Summary Banner */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-yellow-400/10 text-center space-y-1">
                          <div className="inline-flex items-center justify-center space-x-1.5 px-2 py-0.5 rounded-full bg-green-950 border border-green-500/30 text-green-400 text-[10px] uppercase tracking-wider font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span>Live Kitchen Feed</span>
                          </div>
                          <h4 className="font-serif text-lg font-bold text-white mt-2">
                            {trackingSteps[activeStep].title}
                          </h4>
                          <p className="text-xs text-zinc-300 leading-normal max-w-xs mx-auto font-normal">
                            {trackingSteps[activeStep].desc}
                          </p>
                          <p className="text-[10px] text-yellow-400 font-mono pt-2 font-black">
                            Estimated Delivery: 35-40 mins
                          </p>
                        </div>

                        {/* Step Line */}
                        <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-yellow-400/10">
                          {trackingSteps.map((step, idx) => {
                            const isPast = idx < activeStep;
                            const isCurrent = idx === activeStep;
                            const isFuture = idx > activeStep;

                            return (
                              <div key={idx} className="relative flex gap-4">
                                {/* Indicator Circle */}
                                <div
                                  className={`absolute -left-8 w-7.5 h-7.5 rounded-full border flex items-center justify-center z-10 transition-all duration-500 ${
                                    isPast
                                      ? 'bg-green-950 border-green-500 text-green-450'
                                      : isCurrent
                                      ? 'bg-black border-yellow-400 text-yellow-450 ring-2 ring-yellow-400/20'
                                      : 'bg-zinc-950 border-yellow-400/10 text-zinc-650'
                                  }`}
                                >
                                  {isPast ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : step.icon}
                                </div>

                                <div className="space-y-1 pl-2">
                                  <h5
                                    className={`text-xs sm:text-sm font-bold transition-colors duration-500 ${
                                      isCurrent
                                        ? 'text-yellow-400'
                                        : isPast
                                        ? 'text-zinc-400 line-through decoration-yellow-400/20'
                                        : 'text-zinc-600'
                                    }`}
                                  >
                                    {step.title}
                                  </h5>
                                  <p
                                    className={`text-[11px] leading-relaxed transition-colors duration-500 font-normal ${
                                      isCurrent
                                        ? 'text-zinc-300'
                                        : isPast
                                        ? 'text-zinc-400'
                                        : 'text-zinc-600'
                                    }`}
                                  >
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Reset button to let them place another test order */}
                        <button
                          onClick={() => setOrderStatus('none')}
                          className="w-full py-3 rounded-xl border border-yellow-400/20 text-yellow-400 font-display text-xs font-black uppercase tracking-widest hover:bg-black transition-colors cursor-pointer"
                        >
                          Place Another Order
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Checkout Trigger Footer */}
              {orderStatus === 'none' && cartItems.length > 0 && (
                <div className="p-6 border-t border-yellow-400/10 bg-zinc-950 space-y-4">
                  {/* Ledger */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-400 font-bold">
                      <span>Item Subtotal</span>
                      <span className="font-serif font-bold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-400 font-bold">
                      <span>SGST / CGST (5%)</span>
                      <span className="font-serif font-bold">₹{gst}</span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-400 font-bold">
                      <span>Packaging & Delivery</span>
                      {packagingAndDelivery === 0 ? (
                        <span className="text-green-405 font-bold font-display uppercase tracking-widest text-[10px]">
                          FREE Over ₹499
                        </span>
                      ) : (
                        <span className="font-serif font-bold">₹{packagingAndDelivery}</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-yellow-400/10">
                      <span>Grand Total</span>
                      <span className="font-serif text-yellow-400 text-base font-black">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Checkout Action */}
                  <button
                    onClick={() => {
                      const btn = document.getElementById('submitCheckoutBtn');
                      if (btn) btn.click();
                    }}
                    className="w-full py-4 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 font-display font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Proceed to Order (COD)</span>
                    <Sparkles className="w-4 h-4 text-black" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
