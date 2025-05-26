import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { ChangeEvent } from "react";

interface IDescriptionApi {
    descriptionState: {
        description: string;
    };
    setDescriptionState: (description: string) => void;
    descriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    putDescription: (id: number | undefined) => void;
    clearDescription: (id: number | undefined) => void;
}

export const descriptionApi = create<IDescriptionApi>((set, get) => ({
    descriptionState: {
        description: "",
    },
    setDescriptionState: (description) => {
        set({
            descriptionState: {
                description: description,
            },
        });
    },
    descriptionChange: (e) => {
        set({
            descriptionState: {
                description: e.target.value,
            },
        });
    },
    putDescription: async (id) => {
        try {
            const descriptionState = get().descriptionState;
            const setDescriptionState = get().setDescriptionState;
            const response = await axios.put(
                `${BASE_URL}/applications/description/${id}/`,
                descriptionState,
                authToken,
            );
            setDescriptionState(response.data.description);
        } catch (error) {
            console.log(error, "putDescriptionError");
        }
    },
    clearDescription: (id) => {
        set({ descriptionState: { description: "" } });
        const putDescription = get().putDescription;
        putDescription(id);
    },
}));
