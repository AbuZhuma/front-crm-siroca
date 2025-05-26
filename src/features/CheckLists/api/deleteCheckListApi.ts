import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "../../../shared/variables";

interface IFetch {
    deleteCheckList: (id: number | undefined) => void;
}

export const deleteCheckListApi = create<IFetch>(() => ({
    deleteCheckList: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/applications/checklist/${id}`, authToken);
            console.log(response, "deleteCheckListSuccess");
        } catch (error) {
            console.log(error, "deleteCheckListError");
        }
    },
}));
