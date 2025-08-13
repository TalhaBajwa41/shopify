'use client';
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ChevronUp,
  ChevronDown,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
  Star,
  Send
} from 'lucide-react';

const ShopifyFooter = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [emailSubscription, setEmailSubscription] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailSubscription) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmailSubscription('');
      }, 3000);
    }
  };

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Women\'s Fashion', href: '/womens' },
        { name: 'Men\'s Fashion', href: '/mens' },
        { name: 'Kids & Baby', href: '/kids' },
        { name: 'Home & Living', href: '/collec/home' },
        { name: 'Sale Items', href: '/collections/sale' },
        { name: 'New Arrivals', href: '/collections/new' }
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Contact Us', href: '/pages/contact' },
        { name: 'Size Guide', href: '/pages/size-guide' },
        { name: 'Shipping Info', href: '/pages/shipping' },
        { name: 'Returns & Exchanges', href: '/pages/returns' },
        { name: 'Track Your Order', href: '/pages/track-order' },
        { name: 'FAQ', href: '/pages/faq' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/pages/about' },
        { name: 'Our Story', href: '/pages/story' },
        { name: 'Careers', href: '/pages/careers' },
        { name: 'Press', href: '/pages/press' },
        { name: 'Sustainability', href: '/pages/sustainability' },
        { name: 'Blog', href: '/blogs/news' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Store Locator', href: '/pages/stores' },
        { name: 'Wholesale', href: '/pages/wholesale' },
        { name: 'Affiliate Program', href: '/pages/affiliates' },
        { name: 'Student Discount', href: '/pages/student-discount' },
        { name: 'Gift Cards', href: '/products/gift-card' },
        { name: 'Loyalty Program', href: '/pages/loyalty' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500' }
  ];

  const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay'];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Newsletter Signup Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 lg:p-12 backdrop-blur-sm border border-white/10">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Stay In The Loop
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Get exclusive access to new arrivals, special offers, and style inspiration delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={emailSubscription}
                    onChange={(e) => setEmailSubscription(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribed}
                  className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                    isSubscribed 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <span>✓ Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mt-4">
                Join 50,000+ fashion lovers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  StyleHub
                </h2>
                <p className="text-xs text-gray-400 -mt-1">Premium Fashion</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Curating premium fashion for the modern lifestyle. Quality, style, and sustainability in every piece.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">support@stylehub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title} className="lg:col-span-1">
              <button
                onClick={() => toggleSection(section.title)}
                className="lg:cursor-default flex items-center justify-between w-full lg:w-auto mb-6 lg:mb-6"
              >
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <div className="lg:hidden">
                  {expandedSections[section.title] ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              <div className={`space-y-3 transition-all duration-300 lg:block ${
                expandedSections[section.title] || window.innerWidth >= 1024 
                  ? 'block opacity-100 max-h-96' 
                  : 'hidden opacity-0 max-h-0 lg:opacity-100 lg:max-h-96'
              }`}>
                {section.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Security Section */}
        <div className="border-t border-gray-800 pt-12 mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Free Shipping</h4>
              <p className="text-gray-400 text-sm">Orders over $75</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <RotateCcw className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Easy Returns</h4>
              <p className="text-gray-400 text-sm">30-day guarantee</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Secure Payment</h4>
              <p className="text-gray-400 text-sm">SSL encrypted</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">5-Star Service</h4>
              <p className="text-gray-400 text-sm">10k+ reviews</p>
            </div>
          </div>
        </div>

        {/* Social Media & Payment Methods */}
        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
            
            {/* Social Media */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 transform hover:scale-110 hover:bg-white/10 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">Join 100k+ followers</p>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center lg:items-end">
              <h4 className="font-semibold text-white mb-4">We Accept</h4>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 flex items-center space-x-2 hover:bg-white/20 transition-all duration-300"
                  >
                    <CreditCard className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-300 font-medium">{method}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">256-bit SSL secured</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-xs">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>McAfee SECURE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span>Trustpilot 4.8/5</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Carbon Neutral Shipping</span>
            </div>
          </div>
        </div>
            
            {/* Copyright */}
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6 text-gray-400 text-sm">
              <p>&copy; 2025 StyleHub. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="/pages/privacy-policy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="/pages/terms-of-service" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="/pages/cookies" className="hover:text-white transition-colors duration-200">
                  Cookie Policy
                </a>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all duration-300 transform hover:scale-105 group"
            >
              <span className="text-sm font-medium">Back to Top</span>
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-xs">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>McAfee SECURE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span>Trustpilot 4.8/5</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Carbon Neutral Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 animate-bounce">
          <Phone className="w-6 h-6" />
        </button>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, blue 0%, transparent 50%)`
        }} />
      </div>
    </footer>
  );
};

export default ShopifyFooter;