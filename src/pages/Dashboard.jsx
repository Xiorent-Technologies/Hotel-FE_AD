/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PaymentPie from "../components/PaymentPie";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DailyTraffic from "../components/DailyTraffic";
import TodayOccupancy from "../components/TodayOccupancy";
import { useUserStore } from "../stores/useUserStore";
import {useGlobalStore} from "../stores/useGlobalStore"
import VendorEarnings from "../components/VendorEarnings";
import { useBookingStore } from "../stores/useBookingStore";
import { useVacancyStore } from "../stores/useVacancyStore";
import { useRoomStore } from "../stores/useRoomStore";


const Dashboard = () => {
  // const [percentage, setPercentage] = useState(60);
  const { user } = useUserStore();
  const { selectedDate, setSelectedDate } = useGlobalStore(); // ✅ use Zustand state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {getMonthly,data} = useBookingStore();
  const {fetchToday,visitor} = useVacancyStore()
  const {getVendorRooms,totalRooms} = useRoomStore();

 const occupied = Number(visitor?.occupiedRooms) || 0;
const total = Number(totalRooms) || 0;
const percentage = total > 0 ? (occupied / total) * 100 : 0;

  const HOTEL_ID = "68d292e08b19d2074beb4142"

  useEffect(() => {
    getMonthly(HOTEL_ID);
    getVendorRooms();
  },[])

   useEffect(() => {
    fetchToday(selectedDate,HOTEL_ID);
   },[selectedDate])

  return (
    <div className="p-3 sm:p-6 bg-[#f8f5e5] min-h-screen font-sans">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* LEFT SIDE (2/3 width) */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#5D4037]">
              Hello {user?.name}!
            </h1>
            <p className="font-bold text-xs sm:text-sm text-gray-700 mt-1 flex items-center gap-2">
              July activity
              <button
                onClick={() => setShowDatePicker((prev) => !prev)}
                className="bg-red-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded text-[10px] sm:text-xs font-medium hover:bg-red-700 transition"
              >
                📅 {selectedDate}
              </button>

              {/* Hidden Date Input */}
              {showDatePicker && (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setShowDatePicker(false);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-xs bg-white shadow-sm"
                />
              )}
            </p>
          </div>

          {/* Banner Image / Earnings */}
          <div className="rounded-lg overflow-hidden">
            <VendorEarnings getVendorRooms={getVendorRooms} totalRooms={totalRooms}/>
          </div>

          {/* Occupancy Statistics */}
          <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                Occupancy Statistics
              </h3>
              <span className="bg-red-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-md">
                {selectedDate}
              </span>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] min-w-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.data}>
                  <XAxis
                    dataKey="month"
                     interval={0}
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f87171" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (1/3 width) */}
        <div className="space-y-4 sm:space-y-6">
          {/* Daily Traffic */}
          <div className="bg-white p-3 sm:p-4 rounded-lg">
            <DailyTraffic />
          </div>

          {/* Payout */}
          <div className="bg-white p-3 sm:p-4 rounded-lg">
            <PaymentPie />
          </div>

          {/* Today's Occupancy */}
          <div className="bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col items-center flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-4">
                Today's Occupancy
              </h3>
              <TodayOccupancy percentage={percentage} />
            </div>
            <div className="flex flex-col items-center text-xs sm:text-sm text-gray-500 w-full sm:w-auto gap-1">
              <span>Occupied Rooms</span>
              <span>Ready to book</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
