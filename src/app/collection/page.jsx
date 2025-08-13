'use client';
import React, { useState } from 'react';
import { ShoppingBag, Star, ChevronRight } from 'lucide-react';

const productsData = [
  {
    id: 1,
    name: 'Classic Leather Jacket',
    price: 120,
    image: 'https://via.placeholder.com/400x500',
    category: 'Men',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Elegant Summer Dress',
    price: 95,
    image: 'https://via.placeholder.com/400x500',
    category: 'Women',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Urban Sneakers',
    price: 75,
    image: 'https://via.placeholder.com/400x500',
    category: 'Men',
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Vintage Handbag',
    price: 110,
    image: 'https://via.placeholder.com/400x500',
    category: 'Women',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Smartwatch Pro',
    price: 150,
    image: 'https://via.placeholder.com/400x500',
    category: 'Accessories',
    rating: 4.6,
  },
];

export default function ShopCollection() {
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Men', 'Women', 'Accessories'];

  const filteredProducts =
    category === 'All'
      ? productsData
      : productsData.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Shop Our Collection
        </h1>
        <p className="text-gray-600 mt-2">
          Explore our latest arrivals and timeless classics.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all duration-200 ${
              category === cat
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* Image */}
            <div className="relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white text-sm rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ShoppingBag size={16} /> Add to Cart
              </button>
            </div>

            {/* Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-900 font-bold">${product.price}</span>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} className="fill-yellow-500" />{' '}
                  <span className="ml-1 text-sm">{product.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <button className="px-6 py-3 bg-black text-white rounded-full flex items-center mx-auto hover:bg-gray-800 transition-all">
          View More <ChevronRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
