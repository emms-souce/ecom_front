"use client";

import { useMemo } from 'react';
import productsData from '@/data/products.json';

// interface Category {
//   id: string;
//   name: string;
//   description: string;
// }

export default function Categories() {
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(productsData.products.map(product => product.category)));
    return uniqueCategories.map((category, index) => ({
      id: String(index + 1),
      name: category.charAt(0).toUpperCase() + category.slice(1),
      description: `Découvrez notre sélection de produits ${category}`
    }));
  }, []);

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">Catégories</h1>
        <p className="text-sm md:text-base text-gray-600">Explorez nos différentes catégories de produits</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <a
                href={`/shop?category=${category.id}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Voir les produits
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}