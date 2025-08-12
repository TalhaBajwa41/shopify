'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// Mock wishlist data - replace with your actual data source
const mockWishlistItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    originalPrice: 129.99,
    image: "/api/placeholder/300/300",
    brand: "AudioTech",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    discount: 23,
    addedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    originalPrice: 399.99,
    image: "/api/placeholder/300/300",
    brand: "TechWear",
    rating: 4.8,
    reviews: 567,
    inStock: true,
    discount: 25,
    addedDate: "2024-01-10"
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    price: 179.99,
    originalPrice: 199.99,
    image: "/api/placeholder/300/300",
    brand: "BrewMaster",
    rating: 4.3,
    reviews: 89,
    inStock: false,
    discount: 10,
    addedDate: "2024-01-20"
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 249.99,
    originalPrice: 349.99,
    image: "/api/placeholder/300/300",
    brand: "ComfortSeating",
    rating: 4.6,
    reviews: 145,
    inStock: true,
    discount: 29,
    addedDate: "2024-01-08"
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    originalPrice: 99.99,
    image: "/api/placeholder/300/300",
    brand: "GamePro",
    rating: 4.4,
    reviews: 312,
    inStock: true,
    discount: 20,
    addedDate: "2024-01-25"
  },
  {
    id: 6,
    name: "4K Action Camera",
    price: 199.99,
    originalPrice: 279.99,
    image: "/api/placeholder/300/300",
    brand: "AdventureCam",
    rating: 4.7,
    reviews: 198,
    inStock: true,
    discount: 29,
    addedDate: "2024-01-12"
  }
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    // Simulate loading from API or localStorage
    setTimeout(() => {
      setWishlistItems(mockWishlistItems);
      setLoading(false);
    }, 1000);
  }, []);

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  const addToCart = (product) => {
    // Implement add to cart functionality
    console.log('Adding to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  const getSortedAndFilteredItems = () => {
    let filteredItems = wishlistItems;

    // Filter items
    if (filterBy === 'inStock') {
      filteredItems = filteredItems.filter(item => item.inStock);
    } else if (filterBy === 'outOfStock') {
      filteredItems = filteredItems.filter(item => !item.inStock);
    } else if (filterBy === 'onSale') {
      filteredItems = filteredItems.filter(item => item.discount > 0);
    }

    // Sort items
    return filteredItems.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.addedDate) - new Date(a.addedDate);
        case 'oldest':
          return new Date(a.addedDate) - new Date(b.addedDate);
        case 'priceHigh':
          return b.price - a.price;
        case 'priceLow':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  const sortedAndFilteredItems = getSortedAndFilteredItems();

  return (
    <>
      <Head>
        <title>My Wishlist</title>
        <meta name="description" content="Your saved favorite products" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                <p className="mt-1 text-gray-600">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="name">Name A-Z</option>
                </select>

                {/* Filter Dropdown */}
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Items</option>
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                  <option value="onSale">On Sale</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {sortedAndFilteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {wishlistItems.length === 0 ? 'Your wishlist is empty' : 'No items match your filters'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {wishlistItems.length === 0 
                    ? 'Start adding products you love to see them here!' 
                    : 'Try adjusting your filters to see more items.'}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedAndFilteredItems.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="relative">
                    <div className="aspect-square bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Product Image</span>
                    </div>
                    
                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        -{product.discount}%
                      </div>
                    )}

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute top-3 right-3 bg-gray-800 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        Out of Stock
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 bg-white hover:bg-red-50 text-red-500 p-2 rounded-full shadow-md transition-colors duration-200"
                      title="Remove from wishlist"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <div className="mb-2">
                      <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                          product.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}