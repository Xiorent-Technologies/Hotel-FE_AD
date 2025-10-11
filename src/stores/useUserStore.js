import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set,get) => ({
    user : null,
    vendors : [],


    loginUser : async({email,password}) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login",{email,password},{withCredentials:true})
            console.log(res.data);
            set({user : res.data});
        } catch (error) {
             console.error("Failed to fetch bookings:", error);
        }
    } ,

    getUser : async() => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/get-user", {withCredentials: true} );
            console.log(res.data);
            set({user : res.data});

        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    },


    updateUser: async (id, updatedData) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/auth/update/${id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const updated = res.data?.data ?? res.data?.user ?? res.data;

    const prev = get().user || {};
    const merged = {
      ...prev,
      ...updated,
      lastLogin: prev.lastLogin || updated.lastLogin || null,
      devices: prev.devices || updated.devices || [],
    };

    set({ user: merged });
    return merged;
  } catch (err) {
    console.error("updateUser error:", err);
    throw err;
  }
},

      getAllVendors : async() => {
        try {
    const res = await axios.get("http://localhost:5000/api/auth/vendors");
    set({vendors : res.data});
    console.log(res.data);
    
  } catch (err) {
    console.error("updateUser error:", err);
    
  }
}

    
}))