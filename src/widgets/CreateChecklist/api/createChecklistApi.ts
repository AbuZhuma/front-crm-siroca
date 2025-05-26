import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { ChangeEvent } from "react";

interface ISubtask {
    id?: number;
    text: string;
    completed?: boolean;
    deadline?: string;
    checklist: number;
    manager?: string;
}

interface ICheckList {
    id?: number;
    completed?: boolean;
    main_manager?: string;
    subtasks?: ISubtask[];
    name: string;
    application: number | null | string;
}

interface ICreateChecklistApi {
    oneChecklist: ICheckList;
    resetOneChecklist: () => void;
    oneChecklistChange: (e: ChangeEvent<HTMLInputElement>) => void;
    postChecklist: (checklist: ICheckList) => void;
}

export const createChecklistApi = create<ICreateChecklistApi>((set) => ({
    oneChecklist: {
        name: "",
        application: 0,
    },
    resetOneChecklist: () => {
        set({
            oneChecklist: {
                id: 0,
                name: "",
                application: 0,
                subtasks: [],
                completed: false,
                main_manager: "",
            },
        });
    },
    oneChecklistChange: (e) => {
        set((prevState) => ({
            oneChecklist: {
                ...prevState.oneChecklist,
                name: e.target.value,
            },
        }));
    },
    postChecklist: async (checklist) => {
        try {
            const response = await axios.post(`${BASE_URL}/applications/checklist/`, checklist, authToken);
            set({ oneChecklist: response.data });
        } catch (error) {
            console.log(error, "createChecklistApiError");
        }
    },
}));
