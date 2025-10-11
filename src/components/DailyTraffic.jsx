import React, { useEffect, useState } from "react";
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useGlobalStore } from "../stores/useGlobalStore";
import { useVacancyStore } from "../stores/useVacancyStore";

function DailyTraffic() {
  const { selectedDate } = useGlobalStore();
  const { dailyVisitors, totalVisitors, loading, error, fetchDailyVisitors } = useVacancyStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const HOTEL_ID = "68d292e08b19d2074beb4142";

  useEffect(() => {
    // Fetch data when component mounts or date changes
    fetchDailyVisitors(selectedDate, HOTEL_ID);
  }, [selectedDate, fetchDailyVisitors]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform API data for chart (keep only day number for x-axis)
  const chartData = dailyVisitors.map(item => ({
    day: new Date(item.date).getDate().toString().padStart(2, '0'),
    visitors: item.visitors,
    fullDate: item.date
  }));

  // Calculate percentage change (mock calculation - you can adjust based on your logic)
  const percentageChange = totalVisitors > 0 ? "+2.45%" : "0%";

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
            Daily Traffic
          </h2>
          {loading ? (
            <p className="text-xl text-gray-500 mt-2">Loading...</p>
          ) : error ? (
            <p className="text-xl text-red-500 mt-2">Error: {error}</p>
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1 sm:mt-2">
              {totalVisitors.toLocaleString()}{" "}
              <span className="text-base sm:text-lg text-gray-500 font-normal">
                Visitors
              </span>
            </p>
          )}
        </div>
        <p className="text-green-500 font-bold text-sm sm:text-base">
          {percentageChange}
        </p>
      </div>

      {/* Chart */}
      <div className="mt-4 h-[200px] sm:h-[250px] md:h-[300px]">
        {!loading && !error && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                label={{ value: 'Day of Month', position: 'insideBottom', offset: -5, fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                        <p className="text-sm font-semibold">{payload[0].payload.fullDate}</p>
                        <p className="text-sm text-gray-600">
                          Visitors: {payload[0].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="visitors"
                fill="url(#grad)"
                radius={[8, 8, 0, 0]}
                barSize={windowWidth < 640 ? 18 : 30}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff0000" />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        ) : !loading && !error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DailyTraffic;