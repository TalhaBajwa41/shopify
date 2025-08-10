'use client';
import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Filter, Search, Home, Grid, List, Eye, Truck, Shield, RotateCcw } from 'lucide-react';

const HomeLivingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid');

  // Sample products data - replace with actual Shopify data
  const products = [
    {
      id: 1,
      name: "Modern Geometric Table Lamp",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      category: "lighting",
      room: "living-room",
      rating: 4.8,
      reviews: 124,
      badge: "Sale",
      description: "Contemporary brass table lamp with geometric design",
      colors: ["Brass", "Black", "White"],
      inStock: true
    },
    {
      id: 2,
      name: "Handwoven Boho Area Rug",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      category: "rugs",
      room: "living-room",
      rating: 4.9,
      reviews: 89,
      badge: "Best Seller",
      description: "Soft jute and cotton blend rug with intricate patterns",
      colors: ["Natural", "Navy", "Terracotta"],
      inStock: true
    },
    {
      id: 3,
      name: "Minimalist Wall Art Set",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      category: "decor",
      room: "bedroom",
      rating: 4.7,
      reviews: 203,
      badge: "New",
      description: "Set of 3 abstract prints in modern frames",
      colors: ["Black Frame", "Natural Wood", "White Frame"],
      inStock: true
    },
    {
      id: 4,
      name: "Ceramic Planter Collection",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
      category: "decor",
      room: "kitchen",
      rating: 4.6,
      reviews: 156,
      description: "Set of 3 glazed ceramic planters in varying sizes",
      colors: ["White", "Sage Green", "Charcoal"],
      inStock: false
    },
    {
      id: 5,
      name: "Velvet Throw Pillows",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      category: "textiles",
      room: "living-room",
      rating: 4.8,
      reviews: 97,
      badge: "Popular",
      description: "Luxurious velvet cushions with hidden zippers",
      colors: ["Emerald", "Navy", "Blush", "Gold"],
      inStock: true
    },
    {
      id: 6,
      name: "Industrial Floor Lamp",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      category: "lighting",
      room: "living-room",
      rating: 4.9,
      reviews: 178,
      description: "Adjustable industrial-style floor lamp with Edison bulb",
      colors: ["Black Metal", "Antique Brass"],
      inStock: true
    },
    {
      id: 7,
      name: "Scandinavian Coffee Table",
      price: 399.99,
      originalPrice: 499.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      category: "furniture",
      room: "living-room",
      rating: 4.8,
      reviews: 145,
      badge: "Sale",
      description: "Solid oak coffee table with clean lines and storage",
      colors: ["Natural Oak", "Walnut", "White Oak"],
      inStock: true
    },
    {
      id: 8,
      name: "Luxury Candle Collection",
      price: 54.99,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
      category: "decor",
      room: "bedroom",
      rating: 4.7,
      reviews: 89,
      description: "Set of 3 soy wax candles with premium fragrances",
      colors: ["Vanilla", "Sandalwood", "Lavender"],
      inStock: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Home },
    { id: 'furniture', name: 'Furniture', icon: Home },
    { id: 'lighting', name: 'Lighting', icon: '💡' },
    { id: 'decor', name: 'Home Decor', icon: '🎨' },
    { id: 'textiles', name: 'Textiles', icon: '🛏️' },
    { id: 'rugs', name: 'Rugs', icon: '🏠' }
  ];

  const rooms = [
    { id: 'all', name: 'All Rooms' },
    { id: 'living-room', name: 'Living Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'dining-room', name: 'Dining Room' },
    { id: 'bathroom', name: 'Bathroom' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-50', name: 'Under $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100-250', name: '$100 - $250' },
    { id: '250+', name: '$250+' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesRoom = selectedRoom === 'all' || product.room === selectedRoom;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = product.price;
      switch (priceRange) {
        case '0-50': matchesPrice = price < 50; break;
        case '50-100': matchesPrice = price >= 50 && price < 100; break;
        case '100-250': matchesPrice = price >= 100 && price < 250; break;
        case '250+': matchesPrice = price >= 250; break;
      }
    }
    
    return matchesCategory && matchesRoom && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'New': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Sale': return 'bg-red-100 text-red-800 border-red-200';
      case 'Popular': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {product.badge && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium border ${getBadgeColor(product.badge)}`}>
            {product.badge}
          </div>
        )}

        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
            Out of Stock
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              favorites.has(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white hover:text-gray-800 backdrop-blur-sm transition-all">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {product.colors && (
          <div className="flex gap-1 mb-4">
            {product.colors.slice(0, 4).map((color, index) => (
              <div key={index} className="w-6 h-6 rounded-full border-2 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              </div>
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500 self-center ml-1">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <button 
          disabled={!product.inStock}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            product.inStock 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Home & Living
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Transform your space with our curated collection of modern furniture, decor, and lifestyle essentials
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {/* Search and View Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="space-y-4">
            {/* Categories */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Rooms and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Room</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  {priceRanges.map((range) => (
                    <option key={range.id} value={range.id}>{range.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No products found */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $100</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <RotateCcw className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Secure Payment</h3>
              <p className="text-gray-600 text-sm">Your payment is protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLivingPage;