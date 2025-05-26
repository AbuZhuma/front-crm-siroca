import { create } from "zustand";

interface ISuccessNotif {
    opened: boolean;
    state: string;
    setOpened: (opened: boolean) => void;
    setState: (state: string) => void;
}

export const successNotifApi = create<ISuccessNotif>((set) => ({
    opened: false,
    state: "",
    setOpened: (opened) => {
        set({ opened: opened });
    },
    setState: (state) => {
        set({ state: state, opened: true });
        setTimeout(() => set({ opened: false }), 5000);
    },
}));
