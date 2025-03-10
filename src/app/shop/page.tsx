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
    <div className="px-4 md:px-6 lg:px-8">
      <ShopBanner />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">Notre Boutique</h1>
        <p className="text-sm md:text-base text-gray-600">Découvrez nos produits de haute qualité</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">{products.length} produits disponibles</p>
          <select
            className="border rounded-md px-2 py-1"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={6}>6 par page</option>
            <option value={9}>9 par page</option>
            <option value={12}>12 par page</option>
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {currentItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 relative cursor-pointer before:absolute before:inset-0 before:border-2 before:border-blue-600 before:rounded-lg before:opacity-0 before:scale-90 hover:before:opacity-100 hover:before:scale-100 before:transition-all before:duration-300"
              onClick={() => window.location.href = `/shop/${product.id}`}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3 md:p-4">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <span className="text-lg md:text-xl font-bold text-blue-600">{product.price.toFixed(2)} €</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-xs md:text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <span className={`text-xs md:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                  </span>
                  <button
                    className={`w-full sm:w-auto px-3 py-2 text-white text-sm rounded-md transition-colors ${product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
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