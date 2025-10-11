import React, { useEffect } from "react";
import { MoreVertical, CreditCard, Check, X, ChevronDown } from "lucide-react";
import { useBookingStore } from "../stores/useBookingStore";
import LineChart from "./Linechart"; // ✅ custom line chart component
import ErrorBoundary from "./ErrorBoundary"; // optional but useful for chart errors

const PaymentKeys = () => {
  const { bookings, getAllBookings } = useBookingStore();

  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);

  // ✅ Helper functions
  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.pricing?.totalAmount || 0),
    0
  );
  const totalRooms = bookings.reduce(
    (sum, b) => sum + (b.rooms?.length || 1),
    0
  );

  // ✅ Safe data for summary charts
  const summaryData = [
    {
      title: "Total Bookings",
      value: bookings.length || 0,
      note: bookings.length
        ? `▲ ${Math.round((bookings.length / 700) * 100)}% compared`
        : "No data yet",
      data:
        bookings.length > 0
          ? bookings.map((_, i) => (i * 10) % 100)
          : [0, 20, 40, 60],
      color: "green",
      id: 1,
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      note: "Revenue generated",
      data:
        bookings.length > 0
          ? bookings.map((b) => b.pricing?.totalAmount || 0)
          : [10, 50, 80, 60],
      color: "red",
      id: 2,
    },
    {
      title: "Total Rooms",
      value: totalRooms || 0,
      note: "Total rooms booked",
      data: null,
      color: null,
      id: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 🔹 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaryData.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-700">{s.title}</h3>
                <MoreVertical size={16} className="text-gray-500" />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-600 mt-1">{s.note}</p>
                </div>
                {s.data && s.color && (
                  <div className="w-full sm:w-32 h-16">
                    <ErrorBoundary>
                      <LineChart data={s.data} color={s.color} id={s.id} />
                    </ErrorBoundary>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Booking Overview + Payment Overview + Review Bookings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ✅ Booking Overview */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-gray-700">Booking Overview</h4>
              <MoreVertical size={16} className="text-gray-500" />
            </div>

            <div className="space-y-6">
              {["Pending Reservations", "Completed Reservations", "Checked Out Reservations"].map((label, idx) => {
                let filteredBookings = [];
                if (label === "Pending Reservations") {
                  filteredBookings = bookings.filter((b) => b.paymentStatus === "pending");
                } else if (label === "Completed Reservations") {
                  filteredBookings = bookings.filter((b) => b.paymentStatus === "paid");
                } else if (label === "Checked Out Reservations") {
                  filteredBookings = bookings.filter((b) => b.status === "checked-out");
                }

                const pct = bookings.length
                  ? Math.round((filteredBookings.length / bookings.length) * 100)
                  : 0;
                const count = `${filteredBookings.length}/${bookings.length}`;
                const color =
                  label === "Pending Reservations"
                    ? "bg-yellow-400"
                    : label === "Completed Reservations"
                    ? "bg-red-500"
                    : "bg-green-500";

                return (
                  <div key={idx}>
                    <div className="flex justify-between items-center flex-wrap">
                      <div className="text-sm text-gray-700 font-medium">{label}</div>
                      <div className="text-xs text-gray-500">{pct}% Confirmed</div>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{count} Rooms</div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`${color} h-full rounded-full`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ✅ Payment Overview */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-gray-700">Payment Overview</h4>
              <MoreVertical size={16} className="text-gray-500" />
            </div>
            <div className="flex justify-around mt-6">
              {["31-60 days", "61-90 days", "0-30 days"].map((label, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-6 h-24 bg-red-400 rounded-t-md"></div>
                  <div className="text-xs text-gray-500 mt-2">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Upcoming Reservations
            </p>
          </div>

          {/* ✅ Review Bookings */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-gray-700">Review Bookings</h4>
              <MoreVertical size={16} className="text-gray-500" />
            </div>
            <ul className="space-y-3">
              {bookings.length > 0 ? (
                bookings.map((b, i) => {
                  const statusColor =
                    b.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : b.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800";

                  return (
                    <li key={b._id || i} className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {new Date(b.dates.checkIn).toLocaleDateString()} ·{" "}
                          {b.roomType || "Room"}
                        </div>
                        <div className="text-xs text-gray-500">
                          #{b._id?.slice(-5) || "N/A"}
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-md text-xs font-medium ${statusColor}`}
                      >
                        {b.paymentStatus}
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="py-3 text-center text-gray-500">
                  No bookings to review
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* 🔹 Booking Requests Table */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 overflow-x-auto">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <CreditCard size={16} className="mr-2 text-red-600" />
              Booking Requests
            </h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select className="appearance-none pr-8 pl-3 py-1 rounded-md bg-white text-sm border border-gray-200 focus:outline-none">
                  <option>Recent Bookings</option>
                  <option>Last 30 Days</option>
                  <option>All Bookings</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
              <button className="text-sm text-gray-600 underline">
                View All Bookings
              </button>
            </div>
          </div>


          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="py-3">Booking Id</th>
                <th className="py-3">Name</th>
                <th className="py-3">Contact No.</th>
                <th className="py-3">Check In</th>
                <th className="py-3">Check Out</th>
                <th className="py-3">Total Amount</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length > 0 && (
                bookings.map((b, idx) => (
                  <tr key={b._id || idx}>
                    <td className="py-3">{b._id}</td>
                    <td className="py-3">{b.guestDetails?.primaryGuest || "N/A"}</td>
                    <td className="py-3">{b.guestDetails?.phone || "N/A"}</td>
                    <td className="py-3">
                      {new Date(b.dates.checkIn).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      {new Date(b.dates.checkOut).toLocaleDateString()}
                    </td>
                    <td className="py-3">₹{b.pricing?.totalAmount || 0}</td>
                    <td
                      className={`py-3 font-medium ${
                        b.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {b.paymentStatus}
                    </td>
                    <td className="py-3 flex items-center space-x-3">
                      <button className="p-1 bg-gray-100 hover:bg-gray-200 rounded-md">
                        <Check size={16} className="text-green-600" />
                      </button>
                      <button className="p-1 bg-gray-100 hover:bg-gray-200 rounded-md">
                        <X size={16} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentKeys;