'use client';
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Check, ArrowRight, Clock, Shield, Truck, Award } from 'lucide-react';

const SalesPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialTimer);
  }, []);

  const testimonials = [
    { name: "Sarah M.", text: "This product completely transformed my daily routine. Amazing quality!", rating: 5 },
    { name: "Mike R.", text: "Fast shipping and exactly what I expected. Highly recommend!", rating: 5 },
    { name: "Emma L.", text: "Best purchase I've made this year. Worth every penny!", rating: 5 }
  ];

  const features = [
    { icon: <Shield className="w-6 h-6" />, title: "Premium Quality", desc: "Made with the finest materials" },
    { icon: <Truck className="w-6 h-6" />, title: "Fast Shipping", desc: "Free delivery in 2-3 business days" },
    { icon: <Award className="w-6 h-6" />, title: "1-Year Warranty", desc: "Full coverage on all products" },
    { icon: <Check className="w-6 h-6" />, title: "30-Day Returns", desc: "Hassle-free return policy" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            TB COLLECTION
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm opacity-75">Trusted by 10,000+ customers</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative z-10 px-6 py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
              🔥 LIMITED TIME OFFER
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Life Today
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Experience the revolutionary product that's changing lives across the globe. 
              Join thousands of satisfied customers who've made the switch.
            </p>

            {/* Countdown Timer */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-semibold">SALE ENDS IN:</span>
              </div>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-sm opacity-75">HOURS</div>
                </div>
                <div className="text-3xl font-bold text-red-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-sm opacity-75">MINUTES</div>
                </div>
                <div className="text-3xl font-bold text-red-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-sm opacity-75">SECONDS</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                <span>Buy Now - 50% OFF</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-purple-400 hover:bg-purple-400/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>

          {/* Product Image/Video Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-800/50 to-blue-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 transform hover:scale-105 transition-all duration-500">
              <div className="aspect-square bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <div className="text-6xl opacity-50">📦</div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold line-through opacity-50">$199.99</span>
                  <span className="text-3xl font-bold text-green-400">$99.99</span>
                </div>
                <div className="text-green-400 font-semibold">Save $100 Today!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose Our Product?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-2xl mb-6 transition-all duration-500">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            <cite className="text-purple-400 font-semibold">
              - {testimonials[currentTestimonial].name}
            </cite>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-gray-300">
            Join 10,000+ satisfied customers who've made the change. Limited time offer!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button className="group bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate-pulse flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6 group-hover:animate-bounce" />
              <span>ORDER NOW - $99.99</span>
            </button>
            <div className="text-center">
              <div className="text-sm opacity-75">✅ 30-Day Money Back Guarantee</div>
              <div className="text-sm opacity-75">✅ Free Worldwide Shipping</div>
              <div className="text-sm opacity-75">✅ 24/7 Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-purple-500/30 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400">
            © 2025 YourStore. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SalesPage;