import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";

interface IFetch {
    deleteUser: (id: number | undefined) => void;
}

export const deleteUserApi = create<IFetch>(() => ({
    deleteUser: async (id) => {
        try {
            const deleteResponse = await axios.delete(`${BASE_URL}/users/${id}/`, authToken);
            console.log(deleteResponse, "deleteUserSuccess");
        } catch (error) {
            console.log(error, "deleteUserError");
        }
    },
}));
