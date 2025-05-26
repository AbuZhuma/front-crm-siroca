import { create } from "zustand";
import { FilterItem } from "../TimeFilter";

export interface IUseFilter {
    state: FilterItem[];
    setState: (data: FilterItem[]) => void;
}

export const useFilter = create<IUseFilter>((set) => ({
    state: [],
    setState: async (data) => {
        set({ state: data });
    },
}));
