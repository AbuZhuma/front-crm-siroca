import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { ChangeEvent } from "react";
import { ISubtask } from "@/shared/types";

interface IPutSubtaskApi {
    putSubtaskState: ISubtask;
    setPutSubtaskState: (subtask: ISubtask) => void;
    addManagerToPutSubtask: (manager: string) => void;
    putSubtaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setSubtaskCompleted: (subtask: ISubtask) => void;
    putSubtask: () => void;
    deleteSubtask: (id?: number) => void;
}

export const putSubtaskApi = create<IPutSubtaskApi>((set, get) => ({
    putSubtaskState: {
        text: "",
        checklist: 0,
    },
    setPutSubtaskState: (subtask) => {
        set({ putSubtaskState: subtask });
    },
    addManagerToPutSubtask: (manager) => {
        set((prevState) => ({
            putSubtaskState: {
                ...prevState.putSubtaskState,
                manager: manager,
            },
        }));
    },
    putSubtaskChange: (e) => {
        set((prevState) => ({
            putSubtaskState: {
                ...prevState.putSubtaskState,
                [e.target.name]: e.target.value,
            },
        }));
    },
    setSubtaskCompleted: async (subtask) => {
        const completedSubtask = {
            ...subtask,
            completed: !subtask.completed,
        };
        if (completedSubtask.manager === undefined || completedSubtask.manager === null) {
            delete completedSubtask.manager;
        }
        try {
            const response = await axios.put(
                `${BASE_URL}/applications/subtask/${subtask.id}/`,
                completedSubtask,
                authToken,
            );
            console.log(response, "setSubtaskCompletedSuccess");
        } catch (error) {
            console.log(error, "setSubtaskCompletedError");
        }
    },
    putSubtask: async () => {
        try {
            const putSubtaskState = get().putSubtaskState;
            const response = await axios.put(
                `${BASE_URL}/applications/subtask/${putSubtaskState.id}/`,
                putSubtaskState,
                authToken,
            );
            set({ putSubtaskState: response.data });
        } catch (error) {
            console.log(error, "putSubtaskError");
        }
    },
    deleteSubtask: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/applications/subtask/${id}/`, authToken);
            console.log(response, "deleteSubtaskSuccess");
        } catch (error) {
            console.log(error, "deleteSubtaskError");
        }
    },
}));
