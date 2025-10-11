import { create } from "zustand";

// Helper function to ensure proper format: YYYY-MM-DD
// const formatDate = (date) => {
//   if (!date) return "";
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

export const useGlobalStore = create((set) => ({
  selectedDate: new Date().toISOString().split('T')[0],
  setSelectedDate: (date) => {
    const formatted = new Date(date).toISOString().split('T')[0];
    set({ selectedDate: formatted });
  },
}));