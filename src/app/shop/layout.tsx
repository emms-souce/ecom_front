"use client"
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen">
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main content with sidebar */}
      <div className="flex pt-16">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Page content */}
        <div className="flex-1 md:ml-64 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}