/* eslint-disable react-hooks/exhaustive-deps */
import { FaCalendar } from "react-icons/fa6";
import { useRoomStore } from "../stores/useRoomStore";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Availabilty() {
  const { getRoomTypes, roomTypes } = useRoomStore();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Default today
  );
  const [availability, setAvailability] = useState({});
  const dateInputRef = useRef(null);

  useEffect(() => {
    getRoomTypes();
  }, []);

  // When date changes or rooms load, fetch availability
  useEffect(() => {
    if (roomTypes?.length > 0) {
      fetchAllAvailability(selectedDate);
    }
  }, [roomTypes, selectedDate]);

  // Fetch availability for all rooms
  const fetchAllAvailability = async (date) => {
    try {
      const allRooms = roomTypes.flatMap((group) => group.rooms || []);
      const availabilityMap = {};

      await Promise.all(
        allRooms.map(async (room) => {
          try {
            const res = await axios.post(
              `https://hotel-be-n0rh.onrender.com/api/vacancy/get-date/${room._id}`,
              { date }
            );
            availabilityMap[room._id] = res.data?.data || null;
          } catch (err) {
            // if 404, means no record exists
            availabilityMap[room._id] = null;
          }
        })
      );

      setAvailability(availabilityMap);
    } catch (error) {
      console.error("Error fetching room availability:", error);
    }
  };

  // Calendar click
  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.();
      dateInputRef.current.focus();
    }
  };

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

        <div className="relative">
          <button
            onClick={handleCalendarClick}
            className="bg-red-500 text-white px-4 py-2 rounded-xl flex gap-2 items-center text-sm sm:text-base"
          >
            <FaCalendar />
            {formattedDate}
          </button>
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

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {roomTypes?.map((group) =>
          group.rooms?.map((room) => {
            const record = availability[room._id];
            const availableRooms = record
              ? record.availableRooms
              : room.totalRooms;

            return (
              <div
                key={room._id}
                className="rounded-lg p-4 shadow-lg bg-white flex flex-col"
              >
                <div className="text-green-600 font-bold bg-emerald-300/20 w-fit px-3 rounded-2xl text-sm mb-2">
                  {availableRooms === 0 ? "Sold Out" : "Available"}
                </div>

                <div className="font-semibold text-sm sm:text-base">
                  {group.type}
                </div>

                <p className="text-xs sm:text-sm text-gray-500">
                  {availableRooms}/{room.totalRooms} rooms available
                </p>

                <p className="text-red-600 font-bold text-lg sm:text-xl">
                  ₹{record?.price ?? room.basePrice}
                  <span className="text-gray-500 text-xs sm:text-sm">/day</span>
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <div className="px-4 py-2 border-b">
          <h3 className="font-semibold text-xl text-red-500">Room Rates</h3>
        </div>
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-gray-100 text-gray-500 text-left">
            <tr>
              <th className="py-3 px-4">Room type</th>
              <th className="py-3 px-4">Rate</th>
              <th className="py-3 px-4">Availability</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes?.map((group) =>
              group.rooms?.map((room) => {
                const record = availability[room._id];
                const availableRooms = record
                  ? record.availableRooms
                  : room.totalRooms;

                return (
                  <tr key={room._id} className="border-t border-gray-200">
                    <td className="py-3 px-4">{group.type}</td>
                    <td className="py-3 px-4">
                      ₹{record?.price ?? room.basePrice}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs sm:text-sm ${
                          availableRooms > 0
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {availableRooms}/{room.totalRooms}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Availabilty;
