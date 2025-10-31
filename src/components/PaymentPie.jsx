import React, { useEffect, useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useBookingStore } from "../stores/useBookingStore";

const COLORS = {
  pending: "#F1ECFE",
  processing: "#F2D1C3",
  completed: "#799BF9",
  scheduled: "#8EFC9F",
  canceled: "#FF6F6F",
};

function PaymentPie() {
  const { getAllBookings, bookings } = useBookingStore();

  // Fetch bookings when the component mounts
  useEffect(() => {
    getAllBookings(); // you can pass hotelId if needed
  }, []);

  // Group bookings by paymentStatus
  const pieData = useMemo(() => {
    if (!bookings?.length) return [];

    const statusCount = bookings.reduce((acc, booking) => {
      const status = booking.paymentStatus?.toLowerCase() || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusCount).map((status) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: statusCount[status],
      color: COLORS[status] || "#D1D5DB", // fallback gray
    }));
  }, [bookings]);

  return (
    <div className="bg-white rounded-2xl p-5">
      <h2 className="text-xl font-bold mb-4">Payout Status</h2>

      {pieData.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No booking data available</p>
      ) : (
        <div className="h-50">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                paddingAngle={10}
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  const labelName = pieData[index]?.name || "";
                  return (
                    <g>
                      <text
                        x={x}
                        y={y - 8}
                        fill="#222"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                      <text
                        x={x}
                        y={y + 10}
                        fill="#222"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="8"
                      >
                        {labelName}
                      </text>
                    </g>
                  );
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default PaymentPie;
