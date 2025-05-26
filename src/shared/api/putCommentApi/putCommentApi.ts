import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { IComment } from "@/shared/types";

interface IPutCommentApi {
    changed: boolean;
    setChanged: (changes: boolean) => void;
    putCommentState: IComment;
    setPutCommentState: (state: IComment) => void;
    putComment: (comment: IComment) => void;
}

export const putCommentApi = create<IPutCommentApi>((set, get) => ({
    changed: true,
    putCommentState: {
        application: 0,
        text: "",
    },
    setChanged: (changed) => {
        set({ changed: changed });
    },
    setPutCommentState: (state) => {
        set({ putCommentState: state });
    },
    putComment: async (comment) => {
        try {
            const putCommentState = get().putCommentState;
            const response = await axios.put(
                `${BASE_URL}/applications/comments/${putCommentState.id}/`,
                comment,
                authToken,
            );
            set({ putCommentState: response.data });
        } catch (error) {
            console.log(error, "putCommentError");
        }
    },
}));
