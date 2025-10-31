import axios from "axios";
import { create } from "zustand";

export const useRefundStore = create((set,get) => ({
  refunds: [],
  loading: false,

  // Option 1: Search by bookingId (exact match)
  getRefunds: async (bookingId = "") => {
    set({ loading: true });
    try {
      let url = "https://hotel-be-n0rh.onrender.com/api/refund/fetch-refunds";
      const params = new URLSearchParams();
      
      const trimmedId = bookingId.trim();
      if (trimmedId) {
        params.append("bookingId", trimmedId);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log("Fetching refunds from:", url);

      const res = await axios.get(url);

      set({ refunds: res.data, loading: false });
      console.log("Fetched refunds:", res.data);
    } catch (error) {
      console.error("Failed to fetch refunds:", error);
      set({ refunds: [], loading: false });
    }
  },

  
approveRefund: async (id) => {
    try {
      const res = await axios.put(`https://hotel-be-n0rh.onrender.com/api/refund/pay-refund/${id}`);
      // Update the store optimistically using the response
      const updatedRefunds = get().refunds.map((r) =>
        r._id === id ? { ...r, refundStatus: res.data.data.refundStatus } : r
      );
      set({ refunds: updatedRefunds });
      alert("Refund approved successfully!");
    } catch (error) {
      console.error("Error approving refund:", error);
      alert("Failed to approve refund");
    }
  },
}))