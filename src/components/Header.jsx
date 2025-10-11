import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import { useUserStore } from "../stores/useUserStore";

function Header() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const {user} = useUserStore();

  return (
    <>
      <header className="w-full bg-[#f8f5e5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between h-16 sm:h-20 md:h-24">

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              src="/flashrooms.png"
              alt="Flash Rooms"
              className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
            />
          </div>

          {/* Desktop Search */}
          <div className="flex-1 flex justify-center px-2 w-full sm:w-auto sm:flex hidden">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-full border border-black/20 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Button */}
            <button
              type="button"
              className="sm:hidden p-2 rounded-md hover:bg-black/5"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Open search"
            >
              <FiSearch size={18} className="text-red-500" />
            </button>

            {/* Username + Icon */}
            <div className="flex items-center gap-1">
              <FaUserCircle size={28} className="text-red-700" />
              <p className="hidden sm:block font-medium text-red-500 truncate max-w-[100px]">
                {user.name}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start p-4">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-full flex items-center px-3 py-2 shadow">
              <FiSearch className="text-red-500 mr-2" size={18} />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="flex-1 text-sm outline-none"
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 ml-2"
                aria-label="Close search"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
