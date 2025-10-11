/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { FiSearch, FiFilter, FiCheckCircle, FiXCircle, FiChevronDown } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useBookingStore } from "../stores/useBookingStore";

function Booking() {
  const { getAllBookings, bookings } = useBookingStore();
  const [roomId, setRoomId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getAllBookings();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilter = () => {
    getAllBookings(roomId.trim(), paymentStatus);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleFilter();
  };

  const handleStatusSelect = (status) => {
    setPaymentStatus(status);
    setIsDropdownOpen(false);
  };

  const handleClearFilters = () => {
    setRoomId("");
    setPaymentStatus("");
    getAllBookings();
  };

  const getStatusLabel = () => {
    if (!paymentStatus) return "All Status";
    return paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-red-600">Bookings</h1>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Status Filter Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 border px-3 py-2 rounded-md text-sm sm:text-base hover:bg-gray-50 w-full sm:w-40"
            >
              <div className="flex items-center gap-2">
                <FiFilter />
                <span>{getStatusLabel()}</span>
              </div>
              <FiChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-1 w-full sm:w-40 bg-white border rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleStatusSelect("")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    paymentStatus === "" ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  All Status
                </button>
                <button
                  onClick={() => handleStatusSelect("pending")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    paymentStatus === "pending" ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusSelect("paid")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    paymentStatus === "paid" ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  Paid
                </button>
                <button
                  onClick={() => handleStatusSelect("cancelled")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    paymentStatus === "cancelled" ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  Cancelled
                </button>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-60">
            <input
              type="text"
              placeholder="Search by Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border rounded-md pl-8 pr-3 py-2 w-full text-sm"
            />
            <FiSearch
              size={16}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Apply Filter Button */}
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm sm:text-base hover:bg-red-700"
          >
            Apply
          </button>

          {/* Clear Filters Button */}
          {(roomId || paymentStatus) && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 border rounded-md text-sm sm:text-base hover:bg-gray-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">Booking ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Contact No.</th>
              <th className="py-3 px-4">Check In</th>
              <th className="py-3 px-4">Check Out</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b._id} className="border-b text-sm">
                  <td className="py-2 px-4">{b?._id}</td>
                  <td className="py-2 px-4">
                    {b?.guestDetails?.firstName} {b?.guestDetails?.lastName}
                  </td>
                  <td className="py-2 px-4">{b?.guestDetails?.phone}</td>
                  <td className="py-2 px-4">{b?.dates?.checkIn}</td>
                  <td className="py-2 px-4">{b?.dates?.checkOut}</td>
                  <td className="py-2 px-4 font-semibold">
                    ₹{b?.pricing?.totalAmount}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        b.paymentStatus === "pending"
                          ? "bg-red-100 text-red-600"
                          : b.paymentStatus === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <FiCheckCircle className="text-green-600 cursor-pointer hover:scale-110" />
                    <FiXCircle className="text-red-600 cursor-pointer hover:scale-110" />
                    <BsThreeDotsVertical className="text-gray-500 cursor-pointer hover:scale-110" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Booking;