import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";

interface IDeleteFileApi {
    deleteFile: (id: number | undefined) => void;
}

export const deleteFileApi = create<IDeleteFileApi>(() => ({
    deleteFile: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/applications/delete_file/${id}/`, authToken);
            console.log(response, "deleteFileApiSuccess");
        } catch (error) {
            console.log(error, "deleteFileApiError");
        }
    },
}));
