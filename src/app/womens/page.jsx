'use client';
import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  Heart, 
  ShoppingBag, 
  Star, 
  Eye,
  X,
  Check,
  ArrowUpDown,
  Zap
} from 'lucide-react';

const WomenCollectionPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    size: [],
    color: [],
    price: [],
    brand: []
  });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Elegant Silk Blouse',
      brand: 'StyleHub',
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      rating: 4.8,
      reviews: 124,
      colors: ['black', 'white', 'navy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: 'tops',
      isNew: false,
      isSale: true,
      image: '/api/placeholder/300/400',
      hoverImage: '/api/placeholder/300/400',
      description: 'Luxurious silk blouse perfect for office or evening wear'
    },
    {
      id: 2,
      name: 'High-Waisted Mom Jeans',
      brand: 'DenimCo',
      price: 79.99,
      originalPrice: null,
      discount: 0,
      rating: 4.6,
      reviews: 89,
      colors: ['blue', 'black', 'white'],
      sizes: ['24', '26', '28', '30', '32'],
      category: 'jeans',
      isNew: true,
      isSale: false,
      image: '/api/placeholder/300/400',
      hoverImage: '/api/placeholder/300/400',
      description: 'Comfortable high-waisted jeans with vintage-inspired fit'
    },
    {
      id: 3,
      name: 'Floral Summer Dress',
      brand: 'Bloom & Co',
      price: 69.99,
      originalPrice: 99.99,
      discount: 30,
      rating: 4.9,
      reviews: 203,
      colors: ['floral', 'navy', 'pink'],
      sizes: ['XS', 'S', 'M', 'L'],
      category: 'dresses',
      isNew: false,
      isSale: true,
      image: '/api/placeholder/300/400',
      hoverImage: '/api/placeholder/300/400',
      description: 'Lightweight floral dress perfect for summer occasions'
    },
    {
      id: 4,
      name: 'Classic Leather Handbag',
      brand: 'LuxeBags',
      price: 199.99,
      originalPrice: null,
      discount: 0,
      rating: 4.7,
      reviews: 156,
      colors: ['black', 'brown', 'tan'],
      sizes: ['One Size'],
      category: 'accessories',
      isNew: true,
      isSale: false,
      image: '/api/placeholder/300/400',
      hoverImage: '/api/placeholder/300/400',
      description: 'Timeless leather handbag crafted from premium materials'
    },
    {
      id: 5,
      name: 'Cozy Knit Sweater',
      brand: 'WarmCo',
      price: 59.99,
      originalPrice: 89.99,
      discount: 33,
      rating: 4.5,
      reviews: 67,
      colors: ['cream', 'pink', 'gray'],
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'tops',
      isNew: false,
      isSale: true,
      image: '/api/placeholder/300/400',
      hoverImage: '/api/placeholder/300/400',
      description: 'Ultra-soft knit sweater for ultimate comfort'
    },
    {
      id: 6,
      name: 'Ankle Boots',
      brand: 'StepStyle',
      price: 129.99,
      originalPrice: null,
      discount: 0,
      rating: 4.4,
      reviews: 98,
      colors: ['black', 'brown', 'burgundy'],
      sizes: ['6', '7', '8', '9', '10'],
      category: 'shoes',
      isNew: true,
      isSale: false,
      image: '/api/placeholder/300/400',
      hoverImage: '/api/placeholder/300/400',
      description: 'Versatile ankle boots with comfortable block heel'
    }
  ];

  const filterOptions = {
    category: [
      { value: 'dresses', label: 'Dresses', count: 24 },
      { value: 'tops', label: 'Tops & Blouses', count: 18 },
      { value: 'jeans', label: 'Jeans & Pants', count: 15 },
      { value: 'shoes', label: 'Shoes', count: 12 },
      { value: 'accessories', label: 'Accessories', count: 8 }
    ],
    size: [
      { value: 'XS', label: 'XS', count: 12 },
      { value: 'S', label: 'S', count: 28 },
      { value: 'M', label: 'M', count: 35 },
      { value: 'L', label: 'L', count: 22 },
      { value: 'XL', label: 'XL', count: 15 }
    ],
    color: [
      { value: 'black', label: 'Black', count: 31 },
      { value: 'white', label: 'White', count: 24 },
      { value: 'navy', label: 'Navy', count: 18 },
      { value: 'pink', label: 'Pink', count: 16 },
      { value: 'blue', label: 'Blue', count: 14 }
    ],
    price: [
      { value: '0-50', label: 'Under $50', count: 12 },
      { value: '50-100', label: '$50 - $100', count: 28 },
      { value: '100-200', label: '$100 - $200', count: 19 },
      { value: '200+', label: '$200+', count: 8 }
    ]
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rated' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const toggleFilter = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      size: [],
      color: [],
      price: [],
      brand: []
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((count, filters) => count + filters.length, 0);
  };

  const ProductCard = ({ product }) => (
    <div 
      className="group relative bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {/* Product Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        {product.isNew && (
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>NEW</span>
          </span>
        )}
        {product.isSale && product.discount > 0 && (
          <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:scale-110"
      >
        <Heart 
          className={`w-5 h-5 transition-colors duration-200 ${
            wishlist.has(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
          }`} 
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <img
          src={hoveredProduct === product.id ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
          hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
            <button
              onClick={() => setQuickViewProduct(product)}
              className="px-4 py-2 bg-white text-gray-900 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Quick View</span>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium transition-all duration-300 hover:from-purple-700 hover:to-blue-700 flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Color Options */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs text-gray-500">Colors:</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={color}
                className={`w-5 h-5 rounded-full border-2 border-gray-200 ${
                  color === 'black' ? 'bg-black' :
                  color === 'white' ? 'bg-white' :
                  color === 'navy' ? 'bg-blue-900' :
                  color === 'pink' ? 'bg-pink-400' :
                  color === 'blue' ? 'bg-blue-500' :
                  color === 'floral' ? 'bg-gradient-to-r from-pink-300 to-purple-300' :
                  'bg-gray-400'
                }`}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-5 h-5 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-600">+{product.colors.length - 4}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {product.sizes.length} sizes
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">Home</a>
            <span className="text-gray-300">/</span>
            <a href="/collections" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">Collections</a>
            <span className="text-gray-300">/</span>
            <span className="text-purple-600 font-medium">Women</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Women's Collection
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
              Discover our curated selection of premium women's fashion. From everyday essentials to statement pieces.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free Shipping Over $75</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>30-Day Returns</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Size Guide Available</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <div className="flex items-center space-x-3">
                  {getActiveFilterCount() > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Filter Sections */}
              {Object.entries(filterOptions).map(([filterType, options]) => (
                <div key={filterType} className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4 capitalize">
                    {filterType === 'category' ? 'Category' : filterType}
                  </h3>
                  <div className="space-y-3">
                    {options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedFilters[filterType].includes(option.value)}
                              onChange={() => toggleFilter(filterType, option.value)}
                              className="w-5 h-5 rounded border-2 border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
                            />
                            {selectedFilters[filterType].includes(option.value) && (
                              <Check className="absolute top-0.5 left-0.5 w-3 h-3 text-white pointer-events-none" />
                            )}
                          </div>
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                            {option.label}
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm">({option.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                    {getActiveFilterCount() > 0 && (
                      <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                        {getActiveFilterCount()}
                      </span>
                    )}
                  </button>
                  
                  <div className="text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{products.length}</span> of{' '}
                    <span className="font-semibold text-gray-900">127</span> products
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-2xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-xl transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-white shadow-sm text-purple-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-xl transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-white shadow-sm text-purple-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {getActiveFilterCount() > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm text-gray-600 mr-2">Active filters:</span>
                    {Object.entries(selectedFilters).map(([filterType, values]) =>
                      values.map((value) => (
                        <span
                          key={`${filterType}-${value}`}
                          className="inline-flex items-center space-x-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                        >
                          <span>{value}</span>
                          <button
                            onClick={() => toggleFilter(filterType, value)}
                            className="hover:bg-purple-200 rounded-full p-0.5 transition-colors duration-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Load More Products
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Showing 6 of 127 products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Quick View</h2>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div>
                <div className="mb-4">
                  <span className="text-purple-600 font-medium text-sm">{quickViewProduct.brand}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{quickViewProduct.name}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({quickViewProduct.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">${quickViewProduct.price}</span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">${quickViewProduct.originalPrice}</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{quickViewProduct.description}</p>
                
                {/* Size Selection */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Size</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className="border border-gray-300 rounded-xl py-2 px-3 text-center hover:border-purple-500 hover:text-purple-600 transition-all duration-200"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color Selection */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">Color</h4>
                  <div className="flex space-x-3">
                    {quickViewProduct.colors.map((color, index) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 border-gray-300 ${
                          color === 'black' ? 'bg-black' :
                          color === 'white' ? 'bg-white' :
                          color === 'navy' ? 'bg-blue-900' :
                          'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Add to Wishlist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WomenCollectionPage;