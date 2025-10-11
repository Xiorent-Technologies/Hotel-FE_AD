import React, { useState } from "react";
import { Edit2, MoreVertical, Filter, Search, PenTool } from "lucide-react";
import AdminBook from "../components/AdminBook";
import AdminHotels from "../components/AdminHotels";
import AddHotel from "../components/AddHotel";
import AddRooms from "../components/AddRooms";



const AdminBookings = () => {
  // Track which tab is active
  const [activeTab, setActiveTab] = useState("bookings");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "bookings":
        return <AdminBook />;
      case "allHotels":
        return <AdminHotels/>;
      case "addHotel":
        return <AddHotel />;
      case "addRoom":
        return <AddRooms/>
      default:
        return <AdminBook />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* -------- NAVIGATION HEADER -------- */}
      <div className="mb-8 flex items-center gap-6 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`text-sm font-medium pb-2 ${
            activeTab === "bookings"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-600 hover:text-red-400"
          }`}
        >
          Bookings
        </button>

        <button
          onClick={() => setActiveTab("allHotels")}
          className={`text-sm font-medium pb-2 ${
            activeTab === "allHotels"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-600 hover:text-red-400"
          }`}
        >
          All Hotels
        </button>

        <button
          onClick={() => setActiveTab("addHotel")}
          className={`text-sm font-medium pb-2 ${
            activeTab === "addHotel"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-600 hover:text-red-400"
          }`}
        >
          Add New Hotel
        </button>
              <button
          onClick={() => setActiveTab("addRoom")}
          className={`text-sm font-medium pb-2 ${
            activeTab === "addRoom"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-600 hover:text-red-400"
          }`}
        >
          Add Rooms
        </button>
      </div>


      {/* </div> */}

      {/* -------- ACTIVE COMPONENT -------- */}
      <div className="transition-all duration-300">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AdminBookings;
