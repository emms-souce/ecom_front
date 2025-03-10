"use client"

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside className={`fixed top-16 bottom-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-white shadow-md overflow-y-auto`}>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
              Electronics
            </a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
              Clothing
            </a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
              Books
            </a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
              Home & Garden
            </a>
          </nav>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <input type="range" className="w-full" min="0" max="1000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="form-checkbox text-blue-600" />
                      <span className="ml-2 text-gray-600">{rating} stars & up</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}