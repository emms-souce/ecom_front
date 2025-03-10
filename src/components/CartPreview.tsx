"use client";

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function CartPreview() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-blue-600 relative"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed sm:absolute right-0 sm:right-0 top-16 sm:top-auto sm:mt-2 w-full sm:w-80 bg-white rounded-lg shadow-xl z-50 max-h-[calc(100vh-4rem)] sm:max-h-[80vh] overflow-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Panier</h3>
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
            ) : (
              <>
                <div className="space-y-4 mb-4 max-h-[50vh] sm:max-h-[40vh] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-2 border-b border-gray-100">
                      <Link href={`/shop/${item.id}`} className="flex-shrink-0">
                        <div className="relative h-16 w-16">
                          <Image
                            onClick={() => setIsOpen(false)}
                            src={item.image}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/shop/${item.id}`} onClick={() => setIsOpen(false)}>
                          <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate">{item.name}</h4>
                        </Link>
                        <p className="text-sm text-gray-500">{item.price.toFixed(2)} €</p>
                        <div className="flex items-center mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="mx-2 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-600"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-blue-600">{total.toFixed(2)} €</span>
                  </div>
                  <div className="space-y-2">
                    <button
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        // Implement checkout logic here
                        console.log('Proceed to checkout');
                      }}
                    >
                      Passer la commande
                    </button>
                    <button
                      className="w-full  py-2 px-4 rounded-md hover:underline hover:text-gray-600 transition-colors"
                      onClick={() => {
                        if (window.confirm('Voulez-vous vraiment vider votre panier ?')) {
                          clearCart();
                          setIsOpen(false);
                        }
                      }}
                    >
                      Vider le panier
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}