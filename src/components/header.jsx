'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, User, ShoppingBag, Heart, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const ShopifyHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { 
      name: 'Women', 
      href: '/womens',
      dropdown: ['Dresses', 'Tops & Blouses', 'Jeans & Pants', 'Shoes', 'Accessories', 'Sale']
    },
    { 
      name: 'Men', 
      href: '/mens',
      dropdown: ['Shirts', 'Pants & Jeans', 'Jackets', 'Shoes', 'Accessories', 'Sale']
    },
    { 
      name: 'Kids', 
      href: '/kids',
      dropdown: ['Boys', 'Girls', 'Baby', 'Shoes', 'Toys & Games']
    },
    { 
      name: 'Home & Living', 
      href: '/home',
      dropdown: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Storage']
    },
    { name: 'Sale', href: '/sale', highlight: true }
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 text-center text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-4">
          <span>🔥 FLASH SALE: Up to 70% OFF - Limited Time!</span>
          <button className="underline hover:no-underline transition-all duration-200">
            Shop Now
          </button>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div className="bg-gray-900 text-gray-300 py-2 text-xs border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3" />
              <span>+92 (340) 0050708</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3" />
              <span>talhabajwa1622@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3" />
              <span>Free shipping worldwide</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Follow us:</span>
            <div className="flex space-x-2">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <a key={social} href="#" className="hover:text-white transition-colors duration-200">
                  {social.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-2xl border-b border-gray-200' 
          : 'bg-white shadow-lg'
      }`}>
        
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 shadow-lg">
                    <span className="text-white font-bold text-xl">TB</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    TB
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">COLLECTION</p>
                </div>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products, brands, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-8">
                {categories.map((category, index) => (
                  <div 
                    key={category.name}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(category.dropdown ? index : null)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href={category.href}
                      className={`px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center space-x-1 group relative ${
                        category.highlight 
                          ? 'text-red-600 hover:text-red-700 font-semibold' 
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <span className="relative">
                        {category.name}
                        {category.highlight && (
                          <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        )}
                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                          category.highlight ? 'bg-red-500' : 'bg-purple-500'
                        }`} />
                      </span>
                      {category.dropdown && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      )}
                    </a>
                    
                    {/* Mega Menu Dropdown */}
                    {category.dropdown && activeDropdown === index && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 z-50">
                        <div className="px-4 pb-2 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-800">{category.name}</h3>
                        </div>
                        <div className="py-2">
                          {category.dropdown.map((item) => (
                            <a
                              key={item}
                              href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                              className="block px-4 py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 rounded-lg mx-2"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Icon - Mobile */}
              <button className="lg:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:bg-gray-100 rounded-xl">
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link href='/list' className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:bg-gray-100 rounded-xl relative group">
                <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-all duration-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:bg-gray-100 rounded-xl">
                <User className="w-5 h-5" />
              </button>

              {/* Shopping Cart */}
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:bg-gray-100 rounded-xl relative group">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-screen opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible'
          } overflow-hidden`}>
            <div className="px-4 pt-2 pb-6 space-y-2 bg-gray-50 rounded-2xl mt-4 border border-gray-100">
              {categories.map((category, index) => (
                <div key={category.name}>
                  <a
                    href={category.href}
                    className={`flex items-center justify-between px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-white rounded-xl ${
                      category.highlight 
                        ? 'text-red-600 hover:text-red-700' 
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center">
                      {category.name}
                      {category.highlight && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                          HOT
                        </span>
                      )}
                    </span>
                    {category.dropdown && <ChevronDown className="w-4 h-4" />}
                  </a>
                  {category.dropdown && (
                    <div className="ml-4 space-y-1 mt-2">
                      {category.dropdown.map((item) => (
                        <a
                          key={item}
                          href={`/collections/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Account Actions */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <a href="/account/login" className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Account</span>
                  </a>
                  <a href="" className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Demo Shopify Store Content */}
      <div className="pt-32 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Summer Collection 2025
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover the latest trends in fashion with our curated summer collection. 
              Free shipping on orders over $75.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Shop Collection
              </button>
              <button className="border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 px-8 py-4 rounded-2xl text-lg font-medium transition-all duration-300">
                View Lookbook
              </button>
            </div>
          </div>

          {/* Featured Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {categories.slice(0, 3).map((category, index) => (
              <div key={category.name} className="group cursor-pointer">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  <div className={`h-64 bg-gradient-to-br ${
                    index === 0 ? 'from-pink-400 to-purple-600' :
                    index === 1 ? 'from-blue-400 to-indigo-600' :
                    'from-green-400 to-teal-600'
                  } flex items-center justify-center`}>
                    <h3 className="text-3xl font-bold text-white">{category.name}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">Explore our latest {category.name.toLowerCase()} collection</p>
                    <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                      Shop Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopifyHeader;