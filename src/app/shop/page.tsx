"use client";

import { useState, useEffect, Suspense } from 'react';
import productsData from '@/data/products.json';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import ShopBanner from '@/components/ShopBanner';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filteredProducts = productsData.products.filter(product =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    );
    setProducts(filteredProducts);
  }, [searchQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    if (product.stock > 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <ShopBanner />

      <div className="flex items-center space-x-4 my-8 px-4">
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">Gadget</button>
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">Appliances</button>
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">Refrigerators</button>
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">Others</button>
        <div className="flex-1 min-w-[20px]"></div>
        <button className="text-xs sm:text-sm text-gray-600 hover:text-gray-800">See all</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 px-2 sm:px-4"
        >
          {currentItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative cursor-pointer group"
              onClick={() => window.location.href = `/shop/${product.id}`}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <div className="absolute top-2 right-2 z-10">
                  <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4">
                <div className="space-y-0.5 sm:space-y-1 mb-2 sm:mb-3">
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <h2 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h2>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                </div>
                <div className="flex items-center space-x-1 mb-2 sm:mb-3">
                  <span className="text-xs sm:text-sm font-semibold">{product.price.toFixed(2)} €</span>
                  {product.stock > 0 && <span className="text-xs text-gray-500 line-through">{(product.price * 1.2).toFixed(2)} €</span>}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <span className={`text-xs sm:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                  </span>
                  <button
                    className={`w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 text-white text-xs sm:text-sm rounded transition-colors ${product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={product.stock === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 disabled:opacity-50"
        >
          ←
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}