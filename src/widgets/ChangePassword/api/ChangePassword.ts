import { create } from "zustand";

interface DataStore {
    changePasswordScc: string;
    openModalScc: () => void;
    closeModalScc: () => void;
}

const usePassword = create<DataStore>((set) => ({
    changePasswordScc: "none",
    openModalScc: () => {
        set({ changePasswordScc: "block" });
    },
    closeModalScc: () => {
        set({ changePasswordScc: "none" });
    },
}));

export { usePassword };
