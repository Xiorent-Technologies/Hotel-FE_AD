import { create } from "zustand";
import axios from "axios";

export const useBookingStore = create((set, get) => ({
  bookings: [],
  data : [],
  earnings: null,

  getAllBookings: async (roomId = "", paymentStatus = "") => {
    try {
      let url = `https://hotel-be-n0rh.onrender.com/api/bookings/get-bookings/68d292e08b19d2074beb4142`;
      
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
      const res = await axios.get("https://hotel-be-n0rh.onrender.com/api/bookings/get-earnings", {withCredentials: true})
      set({earnings : res.data});
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      // set({ : [] });
    }
  },

  getMonthly : async (hotelId) => {
    try{
      const res = await axios.get(`https://hotel-be-n0rh.onrender.com/api/bookings/get-monthly-bookings/${hotelId}`);
      set({data : res.data})
      console.log(res.data);
    }
    catch(error){
      console.error("Failed to fetch bookings:", error);
    }
  },

  updatePaymentStatus: async (bookingId) => {
    try {
      const res = await axios.put(
        `https://hotel-be-n0rh.onrender.com/api/bookings/status/${bookingId}`
      );

      const updatedBooking = res.data.data;
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b._id === updatedBooking._id ? updatedBooking : b
        ),
      }));

      console.log("Payment updated:", updatedBooking);
      return true;
    } catch (error) {
      console.error("Failed to update payment status:", error);
      return false;
    }
  },



}));