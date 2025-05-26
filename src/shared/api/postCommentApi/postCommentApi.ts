import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { IComment } from "@/shared/types";

interface IPostCommentApi {
    oneComment: IComment;
    postComment: (comment: IComment) => void;
}

export const postCommentApi = create<IPostCommentApi>((set) => ({
    oneComment: {
        application: 0,
        text: "",
    },
    postComment: async (comment) => {
        try {
            const response = await axios.post(`${BASE_URL}/applications/comments/`, comment, authToken);
            set({ oneComment: response.data });
        } catch (error) {
            console.log(error, "postCommentError");
        }
    },
}));
