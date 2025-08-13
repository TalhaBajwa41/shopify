'use client';
import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Truck, Shield, CreditCard } from 'lucide-react';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
      category: 'Electronics',
      inStock: true
    },
    {
      id: 2,
      name: 'Premium Coffee Mug',
      price: 24.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93d?w=150&h=150&fit=crop',
      category: 'Home & Kitchen',
      inStock: true
    },
    {
      id: 3,
      name: 'Organic Cotton T-Shirt',
      price: 39.99,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop',
      category: 'Clothing',
      inStock: false
    },
    {
      id: 4,
      name: 'Smartphone Stand',
      price: 15.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1558618047-fcd87c3cd062?w=150&h=150&fit=crop',
      category: 'Accessories',
      inStock: true
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo({ code: 'SAVE10', discount: 0.1, type: 'percentage' });
      setPromoCode('');
    } else if (promoCode.toLowerCase() === 'free5') {
      setAppliedPromo({ code: 'FREE5', discount: 5, type: 'fixed' });
      setPromoCode('');
    } else {
      alert('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promoDiscount = appliedPromo 
    ? appliedPromo.type === 'percentage' 
      ? subtotal * appliedPromo.discount 
      : appliedPromo.discount
    : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const inStockItems = cartItems.filter(item => item.inStock);
  const outOfStockItems = cartItems.filter(item => !item.inStock);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {cartItems.length} items
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* In Stock Items */}
              {inStockItems.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Available Items</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {inStockItems.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border border-gray-200 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-gray-50 transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-3 py-2 min-w-[50px] text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Out of Stock Items */}
              {outOfStockItems.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-red-600">Out of Stock Items</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {outOfStockItems.map((item) => (
                      <div key={item.id} className="p-6 opacity-60">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-xl grayscale"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-center justify-center">
                              <span className="text-white text-xs font-medium bg-red-500 px-2 py-1 rounded">
                                Out of Stock
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-red-600 hover:text-red-800 transition-colors"
                            >
                              Remove from cart
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-400 line-through">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-2 flex items-center justify-between bg-green-50 text-green-800 px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span className="text-sm font-medium">{appliedPromo.code} applied</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Free Shipping</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {subtotal >= 50 ? 
                      'Your order qualifies for free shipping!' : 
                      `Add $${(50 - subtotal).toFixed(2)} more for free shipping`
                    }
                  </p>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>

                {/* Checkout Button */}
                <button 
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  disabled={inStockItems.length === 0}
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}