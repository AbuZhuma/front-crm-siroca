import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";

interface IFetch {
    deleteRequest: (id: number) => void;
}

export const deleteRequestApi = create<IFetch>(() => ({
    deleteRequest: async (id: number) => {
        try {
            const response = await axios.delete(`${BASE_URL}/applications/form_view/${id}/`, authToken);
            console.log(response, "deleteRequestSuccess");
        } catch (error) {
            console.log(error, "deleteRequestError");
        }
    },
}));
