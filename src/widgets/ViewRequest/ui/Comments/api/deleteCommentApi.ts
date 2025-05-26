import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";

interface IFetch {
    deleteComment: (id: number) => void;
}

export const deleteCommentApi = create<IFetch>(() => ({
    deleteComment: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/applications/comments/${id}/`, authToken);
            console.log(response, "deleteCommentSuccess");
        } catch (error) {
            console.log(error, "deleteCommentError");
        }
    },
}));
