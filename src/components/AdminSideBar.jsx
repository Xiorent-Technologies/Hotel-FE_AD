import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdMeetingRoom,
  MdPayments,
  MdSettings,
} from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { RiBook2Fill } from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";

function AdminSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard size={22} />, path: "/admin" },
    // { name: "Rooms", icon: <MdMeetingRoom size={22} />, path: "/rooms" },
    // { name: "Availability & Pricing", icon: <FaTags size={22} />, path: "/availabilty" },
    { name: "Booking", icon: <RiBook2Fill size={22} />, path: "/admin-bookings" },
    { name: "Vendors", icon: <MdPayments size={22} />, path: "/vendors" },
    { name: "Settings", icon: <MdSettings size={22} />, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-3 text-red-600 fixed top-4 left-4 z-50 bg-white shadow rounded-md"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-[#f8f5e5] w-64 p-4 z-40 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button (Mobile only) */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold text-red-600">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-red-100"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)} // close menu on click (mobile)
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-red-500 font-bold bg-red-100"
                    : "text-black hover:bg-red-100"
                }`
              }
            >
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}
    </>
  );
}

export default AdminSideBar;
