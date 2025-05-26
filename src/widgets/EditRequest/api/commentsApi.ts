import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { ChangeEvent } from "react";

export interface IComments {
    text: string;
    user?: number | null;
    application: number | null;
}

interface IFetch {
    commentState: IComments;
    commentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    postComment: (comment: IComments) => void;
}

export const commentsApi = create<IFetch>((set) => ({
    commentState: {
        text: "",
        application: 0,
    },
    commentChange: (e) => {
        set((prevState) => ({
            commentState: {
                ...prevState.commentState,
                [e.target.name]: e.target.value,
            },
        }));
    },
    postComment: async (comment) => {
        try {
            const postResponse = await axios.post(`${BASE_URL}/applications/comments/`, comment, authToken);
            console.log(postResponse, "postCommentSuccess");
        } catch (error) {
            console.log(error, "postCommentsError");
        }
    },
}));
