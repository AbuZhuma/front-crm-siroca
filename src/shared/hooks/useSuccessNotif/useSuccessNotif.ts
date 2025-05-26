import { create } from "zustand";

interface IUseSuccessNotif {
    opened: boolean;
    setOpened: () => void;
}

export const useSuccessNotif = create<IUseSuccessNotif>((set) => ({
    opened: false,
    setOpened: () => {
        set({ opened: true });
    },
}));
