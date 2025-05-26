import axios from "axios";
import { create } from "zustand";
import { ChangeEvent } from "react";
import { BASE_URL, authToken } from "@/shared/variables";
import { ISubtask } from "@/shared/types";

interface IPostSubtaskApi {
    postSubtaskState: ISubtask;
    setPostSubtaskState: (subtask: ISubtask) => void;
    addManagerToPostSubtask: (manager: string) => void;
    addUserToPostSubtask: (user: string) => void;
    postSubtaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
    postSubTask: () => void;
}

export const postSubtaskApi = create<IPostSubtaskApi>((set, get) => ({
    postSubtaskState: {
        text: "",
        checklist: 0,
    },
    setPostSubtaskState: (subtask) => {
        set({ postSubtaskState: subtask });
    },
    addManagerToPostSubtask: (manager) => {
        set((prevState) => ({
            postSubtaskState: {
                ...prevState.postSubtaskState,
                manager: manager,
            },
        }));
    },
    addUserToPostSubtask: (user) => {
        const text = get().postSubtaskState.text;
        set((prevState) => ({
            postSubtaskState: {
                ...prevState.postSubtaskState,
                text: `${text} @${user}`,
            },
        }));
    },
    postSubtaskChange: (e) => {
        set((prevState) => ({
            postSubtaskState: {
                ...prevState.postSubtaskState,
                [e.target.name]: e.target.value,
            },
        }));
    },
    postSubTask: async () => {
        try {
            const postSubtaskState = get().postSubtaskState;
            const response = await axios.post(`${BASE_URL}/applications/subtask/`, postSubtaskState, authToken);
            set({ postSubtaskState: response.data });
        } catch (error) {
            console.log(error, "createSubtaskError");
        }
    },
}));
