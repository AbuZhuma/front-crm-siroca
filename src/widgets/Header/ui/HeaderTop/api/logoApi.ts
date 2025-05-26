import axios from "axios";
import { create } from "zustand";
import { BASE_URL } from "../../../../../shared/variables";

interface IFetch {
    logo: string;
    getLogo: () => void;
}

export const logoApi = create<IFetch>((set) => ({
    logo: "",
    getLogo: async () => {
        try {
            const getResponse = await axios.get(`${BASE_URL}/company/logo`);
            set({ logo: getResponse.data });
        } catch (error) {
            console.log(error, "getLogoError");
        }
    },
}));
