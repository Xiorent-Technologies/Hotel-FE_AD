/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'

import { useEffect } from "react";
import { useBookingStore } from "../stores/useBookingStore";
// import { useRoomStore } from "../stores/useRoomStore"

function VendorEarnings({getVendorRooms,totalRooms}) {
  const {getEarnings,earnings} = useBookingStore();

  useEffect(() => {
    getVendorRooms()
    getEarnings()
  },[])

  return (
    <div className="flex justify-center items-center gap-10">
      <div className="h-60 w-64 bg-[#F2D1C3]  rounded-2xl">
        <div className="flex flex-col items-center justify-center"> 
            <img src="/dashboard1.png" alt="d1" className="h-32 w-28 relative mb-5"/>
            <p className="mb-3 font-bold text-lg">Total Earnings : </p>
            <button className="py-2 w-1/2 rounded-xl bg-white font-bold font-mono">{earnings?.totalEarnings}</button>
        </div>
      </div>
      <div className="h-60 w-36 rounded-2xl bg-[#FFCCCC]  ">
        <div className="flex flex-col items-center justify-center"> 
            <img src="/dashboard2.png" alt="d1" className="h-32 w-28 relative mb-5"/>
            <p className="mb-3 font-bold text-lg">Total Rooms : </p>
            <button className="py-2 w-1/2 rounded-xl bg-white font-bold font-mono">{totalRooms?.totalRooms}</button>
        </div>
      </div>
      <div className="h-60 w-48  rounded-2xl bg-[#F1ECFE] ">
        <div className="flex flex-col items-center justify-center"> 
            <img src="/dashboard3.png" alt="d1" className="h-32 w-28 relative mb-5"/>
            <p className="mb-3 font-bold text-lg">Upcoming Visits : </p>
            <button className="py-2 w-1/2 rounded-xl bg-white font-bold font-mono">0</button>
        </div>
      </div>
    </div>
  )
}

export default VendorEarnings
