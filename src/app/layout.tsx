"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { quicksand } from './fonts';
import "./globals.css";
import { useState } from 'react';
import { CartProvider, useCart } from '@/contexts/CartContext';
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function CartIcon() {
  const { itemsCount } = useCart();

  return (
    <div className="relative">
      <button className="text-gray-600 hover:text-blue-600">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
      {itemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemsCount}
        </span>
      )}
    </div>
  );
}

function NavigationContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${quicksand.variable}`}>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-20 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex md:hidden items-center justify-center p-2 text-gray-600 hover:text-blue-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/" className="text-2xl font-bold text-blue-600 ml-2 md:ml-0">
                EShop
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link href="/shop" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">Shop</Link>
                <Link href="/categories" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">Categories</Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">About</Link>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">Contact</Link>
              </div>
            </div>

            {/* Mobile menu button and icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-600 hover:text-blue-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-blue-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <CartIcon />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/shop" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">Shop</Link>
              <Link href="/categories" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">Categories</Link>
              <Link href="/about" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">About</Link>
              <Link href="/contact" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">{children}</main>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
          <NavigationContent>{children}</NavigationContent>
        </CartProvider>
      </body>
    </html>
  );
}
