import { create } from "zustand"
import axios from "axios"   

export const useRoomStore = create((set,get) => ({

    roomTypes : [],
    HotelRooms : [],
    vendorHotels :[],
    hotels : [],
    totalRooms : null,
    
    getRoomTypes : async() => {
    try {
      const res = await axios.get("http://localhost:5000/api/room/get-roomtypes/68d292e08b19d2074beb4142");
      console.log(res.data.data);

      // Update the state
      set({ roomTypes: res.data.data });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
    },

getHotelRooms: async (filters = {}) => {
  try {
    const hotelId = "68d292e08b19d2074beb4142";

    // Build query params string
    const params = new URLSearchParams();

    // FIXED: Only add params if they have valid values
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      params.append("minPrice", filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      params.append("maxPrice", filters.maxPrice.toString());
    }

    // FIXED: Ensure amenities array exists and has items
    if (filters.amenities && Array.isArray(filters.amenities) && filters.amenities.length > 0) {
      filters.amenities.forEach((amenity) => {
        params.append("amenities", amenity);
      });
    }

    const url = `http://localhost:5000/api/room/get-hotel-rooms/${hotelId}${params.toString() ? '?' + params.toString() : ''}`;
    console.log("Fetching URL:", url);

    const res = await axios.get(url);

    console.log("Response:", res.data);

    // Update the state - FIXED: Handle empty results
    set({ HotelRooms: res.data.rooms || [] });
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    // FIXED: Set empty array on error to prevent UI issues
    set({ HotelRooms: [] });
  }
},




    getVendorRooms : async() => {
    try {
      const res = await axios.get("http://localhost:5000/api/room/total-vendor-rooms", {withCredentials: true})
      set({totalRooms : res.data});
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      // set({ : [] });
    }
  },


  getVendorHotels : async(vendorId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/hotel/vendor-hotels/${vendorId}`);
      // set({vendorHotels :res.data});
      // console.log(res.data);
      return res.data;


    } catch (error) {
      console.error("Failed to fetch hotels", error);
    }
  },


  getAllHotels : async() => {
    try {
      const res = await axios.get("http://localhost:5000/api/hotel/get-hotels");
      set({hotels : res.data});
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch hotels", error);
    }
  },

  createNewHotel: async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/hotel/create-hotel", data);
      set((state) => ({
        hotels: [...state.hotels, res.data.hotel],
      }));
      console.log("Hotel created:", res.data);
    } catch (error) {
      console.error("Failed to create hotel", error);
    }
  },
}))
