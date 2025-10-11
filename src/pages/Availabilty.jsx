/* eslint-disable react-hooks/exhaustive-deps */
import { FaCalendar, FaFilter } from "react-icons/fa6";
import { useRoomStore } from "../stores/useRoomStore";
import { useEffect, useState, useRef } from "react";

function Availabilty() {
  const { getRoomTypes, roomTypes } = useRoomStore();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Default: today's date
  );
  const dateInputRef = useRef(null);

  useEffect(() => {
    getRoomTypes();
  }, []);

  // Open native date picker when calendar button clicked
  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.(); // modern browsers
      dateInputRef.current.focus(); // fallback
    }
  };

  // Format DD-MM-YYYY for button display
  const formattedDate = new Date(selectedDate)
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-2xl sm:text-3xl text-red-500 font-semibold">
          Rooms
        </h2>

        {/* Calendar Button */}
        <div className="relative">
          <button
            onClick={handleCalendarClick}
            className="bg-red-500 text-white px-4 py-2 rounded-xl flex gap-2 items-center text-sm sm:text-base"
          >
            <FaCalendar />
            {formattedDate}
          </button>

          {/* Hidden date input */}
          <input
            type="date"
            ref={dateInputRef}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Room Types Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {roomTypes?.map((group) =>
          group.rooms?.map((room) => (
            <div
              key={room._id}
              className="rounded-lg p-4 shadow-lg bg-white flex flex-col"
            >
              <div className="text-green-600 font-bold bg-emerald-300/20 w-fit px-3 rounded-2xl text-sm mb-2">
                2 Deals
              </div>

              {/* Room type */}
              <div className="font-semibold text-sm sm:text-base">
                {group.type}
              </div>

              {/* Available rooms */}
              <p className="text-xs sm:text-sm text-gray-500">
                2/{room.totalRooms} available
              </p>

              {/* Price */}
              <p className="text-red-600 font-bold text-lg sm:text-xl">
                {room.basePrice}
                <span className="text-gray-500 text-xs sm:text-sm">/day</span>
              </p>
            </div>
          ))
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 border-b gap-2 sm:gap-0">
          <h3 className="font-semibold text-xl text-red-500">Room Rates</h3>
          <div className="flex flex-wrap gap-2">
            {/* <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base">
              Add rate
            </button>
            <button className="border px-4 py-2 rounded-lg flex gap-2 items-center text-sm sm:text-base">
              <FaFilter />
              Filter
            </button> */}
          </div>
        </div>

        <table className="w-full text-sm sm:text-base min-w-[100%] md:min-w-[600px]">
          <thead className="bg-gray-100 text-gray-500 text-left">
            <tr>
              <th className="py-3 px-4">Room type</th>
              <th className="py-3 px-4">Special Offers</th>
              <th className="py-3 px-4">Cancellation policy</th>
              <th className="py-3 px-4">Deal price</th>
              <th className="py-3 px-4">Rate</th>
              <th className="py-3 px-4">Availability</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes?.map((group) =>
              group.rooms?.map((room) => (
                <tr key={room._id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{group?.type}</td>
                  <td className="py-3 px-4">Family Deal</td>
                  <td className="py-3 px-4">
                    {group?.hotel?.policies?.cancellationPolicy}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{room?.basePrice}</td>
                  <td className="py-3 px-4 font-semibold">{room?.basePrice}</td>
                  <td className="py-3 px-4">
                    <span className="text-blue-500 bg-blue-100 px-3 py-1 rounded-lg text-xs sm:text-sm">
                      {room?.totalRooms} rooms
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Availabilty;
