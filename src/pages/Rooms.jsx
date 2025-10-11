import { FaLocationDot } from "react-icons/fa6";
import { useRoomStore } from "../stores/useRoomStore";
import { useEffect, useState } from "react";
import SidebarFilters from "../components/RoomFilters";

function Rooms() {
  const { getRoomTypes, roomTypes, getHotelRooms, HotelRooms } = useRoomStore();
  
  // FIXED: Initialize with proper default values
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    amenities: [],
  });

  const handleSidebarChange = (sidebarFilters) => {
    console.log("Sidebar filters changed:", sidebarFilters);
    setFilters((prev) => ({ ...prev, ...sidebarFilters }));
  };

  useEffect(() => {
    getRoomTypes();
  }, []);

  // FIXED: Separate effect for hotel rooms with proper dependency
  useEffect(() => {
    console.log("Fetching rooms with filters:", filters);
    getHotelRooms(filters);
  }, [filters]);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl text-red-500 font-semibold mb-4">Rooms</h2>

      {/* Room type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {roomTypes?.map((group) =>
          group.rooms?.map((room) => (
            <div key={room._id} className="rounded-lg p-4 shadow-lg bg-white flex flex-col">
              <div className="text-green-600 font-bold bg-emerald-300/20 w-fit px-3 rounded-2xl text-sm mb-2">
                2 Deals
              </div>
              <div className="font-semibold text-sm sm:text-base">{group.type}</div>
              <p className="text-xs sm:text-sm text-gray-500">
                2/{room.totalRooms} available
              </p>
              <p className="text-red-600 font-bold text-lg sm:text-xl">
                {room.basePrice}
                <span className="text-gray-500 text-xs sm:text-sm">/day</span>
              </p>
            </div>
          ))
        )}
      </div>

      {/* Main grid: Hotels + Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Hotels Section */}
        <div className="lg:col-span-3 space-y-4">
          {/* FIXED: Add loading and empty states */}
          {!HotelRooms ? (
            <div className="text-center py-8">Loading rooms...</div>
          ) : HotelRooms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No rooms found matching your filters. Try adjusting your criteria.
            </div>
          ) : (
            HotelRooms.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row p-4 gap-4"
              >
                <img
                  src="/roompage1.png"
                  alt={hotel.name}
                  className="rounded-lg w-full sm:w-40 h-40 sm:h-32 object-cover"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl">{hotel.hotelId.name}</h3>
                    <p className="text-sm sm:text-base flex items-center gap-2 text-gray-800">
                      <FaLocationDot className="text-red-500" />
                      {hotel.hotelId.location.city}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {Array.isArray(hotel.amenities) ? hotel.amenities.join(", ") : hotel.amenities}
                    </p>
                  </div>

                  <div className="mt-3 mb-2 flex flex-wrap gap-3">
                    <button className="px-3 sm:px-4 rounded-xl py-1 text-emerald-600 bg-emerald-200/50 text-sm sm:text-base">
                      Available
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-sm sm:text-base text-black">
                      <span>{hotel.hotelId.rating.average}</span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        ({hotel.hotelId.rating.totalReviews} Reviews)
                      </span>
                    </div>
                    <p className="font-bold text-lg sm:text-2xl">
                      ${hotel.basePrice}{" "}
                      <span className="text-gray-500 text-sm sm:text-lg font-medium">
                        Onwards
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Filters Section */}
        <SidebarFilters onChange={handleSidebarChange} />
      </div>
    </div>
  );
}

export default Rooms;
