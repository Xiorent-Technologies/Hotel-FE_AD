import axios from "axios";
import { create } from "zustand";

export const useRefundStore = create((set) => ({
    refunds : [],

    getRefunds : async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/refund/fetch-refunds");
            set({refunds : res.data});
            console.log(res.data);
            
        } catch (error) {
            console.error("Failed to fetch refunds:", error);
        }
    }
}))