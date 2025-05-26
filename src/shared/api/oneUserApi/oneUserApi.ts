import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { IUserDetails } from "@/shared/types";

interface IOneUserApi {
    oneUserState: IUserDetails;
    getOneUser: (id?: number) => void;
}

export const oneUserApi = create<IOneUserApi>((set) => ({
    oneUserState: {
        id: 0,
        first_name: "",
        image: "",
        job_title: "",
        main_company: "",
        password: "",
        role_type: "",
        surname: "",
        username: "",
    },
    getOneUser: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}/`, authToken);
            set({ oneUserState: response.data });
        } catch (error) {
            console.log(error, "getOneUserError");
        }
    },
}));
