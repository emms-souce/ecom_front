"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import productsData from '@/data/products.json';
import { use } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
}

export default function ProductDetail({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = use(params);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  
  // Find the product based on the ID from the URL
  const product = productsData.products.find(
    (p) => p.id === parseInt(resolvedParams.productId)
  ) as Product;

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  // Ensure product has an images array, fallback to single image if not
  const productImages = product.images || [product.image];

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value);
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 md:h-[600px] w-full">
            <Image
              src={productImages[selectedImage]}
              alt={`${product.name} - Image ${selectedImage + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex space-x-4 overflow-x-auto py-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 flex-shrink-0 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-blue-600">
              {product.price.toFixed(2)} €
            </span>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-gray-600">{product.rating}</span>
              <span className="text-gray-400 ml-1">({product.reviews} reviews)</span>
            </div>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="border-t border-b py-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={handleDecrement}
                  className="px-3 py-1 border-r hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="w-16 text-center focus:outline-none"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1 border-l hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Stock disponible: <span className="font-semibold">{product.stock}</span>
            </p>
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}