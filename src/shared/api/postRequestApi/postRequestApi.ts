import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { ChangeEvent } from "react";

export interface IPostRequest {
    [key: string]: string | number | null | boolean | undefined;
    id?: number;
    title: string;
    company: string;
    task_number?: string;
}

interface IPostRequestApi {
    postRequestState: IPostRequest;
    addCompanyToPostRequest: (company: string) => void;
    resetPostRequest: () => void;
    postRequestChange: (e: ChangeEvent<HTMLInputElement>) => void;
    postRequest: () => void;
}

export const postRequestApi = create<IPostRequestApi>((set, get) => ({
    postRequestState: {
        title: "",
        company: "",
    },
    addCompanyToPostRequest: (company) => {
        const postRequestState = get().postRequestState;
        set({
            postRequestState: { ...postRequestState, company: company },
        });
    },
    resetPostRequest: () => {
        set({
            postRequestState: {
                id: 0,
                title: "",
                company: "",
                task_number: "",
            },
        });
    },
    postRequestChange: (e) => {
        set((prevState) => ({
            postRequestState: {
                ...prevState.postRequestState,
                [e.target.name]: e.target.value,
            },
        }));
    },
    postRequest: async () => {
        try {
            const postRequestState = get().postRequestState;
            const response = await axios.post(`${BASE_URL}/applications/create/`, postRequestState, authToken);
            set({ postRequestState: response.data });
        } catch (error) {
            console.log(error, "postRequestError");
        }
    },
}));
