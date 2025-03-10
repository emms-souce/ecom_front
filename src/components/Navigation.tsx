"use client"

import { useState } from 'react';
import CartPreview from './CartPreview';
import { Quicksand } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface NavigationProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navigation({ searchQuery, setSearchQuery, setIsSidebarOpen }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/shop' && pathname !== '/shop/orders') {
      return pathname.startsWith(path);
    }
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
              className="inline-flex md:hidden items-center justify-center p-2 text-gray-600 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className={`text-2xl font-bold text-blue-600 ml-2 md:ml-0 ${quicksand.className}`}>
              EShop
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="w-full max-w-lg relative">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={`ml-10 flex items-center space-x-4 ${quicksand.className}`}>
              <Link href="/shop" className={`px-3 py-2 rounded-md font-medium ${isActive('/shop') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Shop</Link>
              <Link href="/shop/orders" className={`px-3 py-2 rounded-md font-medium ${isActive('/shop/orders') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Mes Commandes</Link>
              <Link href="/categories" className={`px-3 py-2 rounded-md font-medium ${isActive('/categories') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Categories</Link>
              <Link href="/about" className={`px-3 py-2 rounded-md font-medium ${isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>About</Link>
              <Link href="/contact" className={`px-3 py-2 rounded-md font-medium ${isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Contact</Link>
            </div>
          </div>

          {/* Mobile menu button and cart */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-blue-600 p-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <CartPreview />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out md:hidden z-30 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={`p-4 space-y-2 ${quicksand.className}`}>
              <Link 
                href="/shop" 
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/shop') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/shop/orders" 
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/shop/orders') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Mes Commandes
              </Link>
              <Link 
                href="/categories" 
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/categories') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/about" 
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/about') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/contact') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}