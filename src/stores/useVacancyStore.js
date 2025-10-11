import { create } from "zustand";
import axios from "axios";

// Zustand store for API data
export const useVacancyStore = create((set) => ({
  dailyVisitors: [],
  totalVisitors: 0,
  loading: false,
  error: null,
  visitor : null,

  fetchDailyVisitors: async (date, hotelId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/vacancy/daily-visitors/${hotelId}`,
        { date },{withCredentials : true}
      );
      
      if (response.data.success) {
        set({
          dailyVisitors: response.data.data,
          totalVisitors: response.data.summary.totalVisitors,
          loading: false
        });
      } else {
        set({ 
          error: response.data.message || 'Failed to fetch data', 
          loading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message, 
        loading: false 
      });
    }
  },


  fetchToday : async(date,hotelId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/vacancy/get-daily-occupancy/${hotelId}`,{date})
      set({visitor : res.data});
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }



}));
