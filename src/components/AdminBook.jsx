/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'

import { Edit2, MoreVertical, Filter, Search, PenTool } from "lucide-react";
import { useRefundStore } from "../stores/useRefundStore";
import { useEffect } from "react";
import { useBookingStore } from "../stores/useBookingStore";
import { useGlobalStore } from "../stores/useGlobalStore";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminBook() {
    const {getRefunds,refunds} = useRefundStore();
      const {getMonthly,data} = useBookingStore();
      const {selectedDate} = useGlobalStore();

    useEffect(() =>{
        getRefunds();
    },[])

    const HOTEL_ID = "68d292e08b19d2074beb4142"

  useEffect(() => {
    getMonthly(HOTEL_ID);
  },[])

    
  return (
    <>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* LEFT COLUMN (65%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* ---- ROOM BOOKING SUMMARY ---- */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Room Booking Summary
              </h2>
              <button className="flex items-center gap-2 text-sm text-gray-600">
                <Edit2 size={16} />
                Edit
              </button>
            </div>

            {/* your summary content here */}
            <div className="grid grid-cols-2 gap-12">
              <div> 
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-800">120</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Rooms Currently Booked
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ready for Guests</span>
                    <span className="font-semibold text-gray-800">75</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Being Cleaning</span>
                    <span className="font-semibold text-gray-800">25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Checked</span>
                    <span className="font-semibold text-gray-800">50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Checked</span>
                    <span className="font-semibold text-gray-800">50</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-800">15</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Rooms Available
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ready for Guests</span>
                    <span className="font-semibold text-gray-800">25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Being Cleaning</span>
                    <span className="font-semibold text-gray-800">15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Checked</span>
                    <span className="font-semibold text-gray-800">25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Checked</span>
                    <span className="font-semibold text-gray-800">25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---- BOOKING REVENUE COMPONENT ---- */}
          {/* ⬇️ add your revenue chart component here */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Booking Revenue Overview
              </h2>
              {/* <div className="flex items-center gap-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
                  <span>📅</span>
                  July 2024
                </button>
                <button className="text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div> */}
            </div>
            {/* ADD YOUR BOOKING REVENUE COMPONENT HERE */}
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
                    {/* </div> */}
          </div>
        </div>

        {/* RIGHT COLUMN (35%) */}
        <div className="lg:col-span-4">
          {/* ---- BOOKED EARNINGS COMPONENT ---- */}
          <div className="bg-white rounded-lg shadow p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Booked earnings
              </h2>
              <button className="text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="h-full flex items-center justify-center text-gray-400">
              Your Booked Earnings Component
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button className="bg-red-50 text-red-500 px-5 py-2 rounded-full text-sm font-medium">
              Refunds
            </button>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                <Filter size={16} />
                Filter
              </button>
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by room number/ID"
                  className="outline-none text-sm w-64"
                />
              </div>
              <button className="text-gray-600 p-2 hover:bg-gray-50 rounded">
                <PenTool size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Refunds Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Refund Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Refund Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Refund Amount
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Refund Actions
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {refunds.map((refund) => (
                <tr key={refund?._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{refund?._id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{refund?.refundDetails?.reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {refund?.refundDetails?.amountRequested}
                  </td>
                  {/* <td className="px-6 py-4 text-sm text-gray-900"></td> */}
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {refund?.refundDetails?.amountActual}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        refund?.refundStatus === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {refund?.refundStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-1">
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
            &lt;
          </button>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <button
              key={page}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                page === 1
                  ? "bg-red-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-4 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 ml-1">
            Next
          </button>
        </div>
      </div>
          </>
  )
}

export default AdminBook
