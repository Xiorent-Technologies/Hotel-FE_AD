import { create } from "zustand";
import axios from "axios";

export const useBookingStore = create((set, get) => ({
  bookings: [],
  data : [],
  earnings: null,

  getAllBookings: async (roomId = "", paymentStatus = "") => {
    try {
      let url = `http://localhost:5000/api/bookings/get-bookings/68d292e08b19d2074beb4142`;
      
      const params = new URLSearchParams();
      if (roomId) params.append("roomId", roomId);
      if (paymentStatus) params.append("paymentStatus", paymentStatus);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await axios.get(url);

      set({ bookings: res.data });
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      set({ bookings: [] });
    }
  },

  getEarnings : async() => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings/get-earnings", {withCredentials: true})
      set({earnings : res.data});
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      // set({ : [] });
    }
  },

  getMonthly : async (hotelId) => {
    try{
      const res = await axios.get(`http://localhost:5000/api/bookings/get-monthly-bookings/${hotelId}`);
      set({data : res.data})
      console.log(res.data);
    }
    catch(error){
      console.error("Failed to fetch bookings:", error);
    }
  }

}));