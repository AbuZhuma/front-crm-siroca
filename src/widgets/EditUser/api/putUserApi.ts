import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { ISendUser, IUserDetails } from "@/shared/types";
import { ChangeEvent } from "react";

interface IPutUserApi {
    putUserState: ISendUser;
    setPutUserState: (user: ISendUser | IUserDetails) => void;
    putUserChange: (e: ChangeEvent<HTMLInputElement>) => void;
    putUser: (id?: number) => void;
}

export const putUserApi = create<IPutUserApi>((set, get) => ({
    putUserState: {
        image: "",
        first_name: "",
        surname: "",
        role_type: "",
        username: "",
        job_title: "",
        main_company: "",
        password: "",
    },
    setPutUserState: (user) => {
        set({ putUserState: user });
    },
    putUserChange: (e) => {
        set((prevState) => ({
            putUserState: {
                ...prevState.putUserState,
                [e.target.name]: e.target.name === "image" && e.target.files ? e.target.files[0] : e.target.value,
            },
        }));
    },
    putUser: async (id) => {
        try {
            const putUserState = get().putUserState;
            if (typeof putUserState.image === "string") {
                delete putUserState.image;
            }
            const formData = new FormData();
            Object.entries(putUserState).forEach(([key, value]) => {
                formData.append(key, value as string);
            });
            const response = await axios.put(`${BASE_URL}/users/edit/${id}/`, formData, authToken);
            console.log(response, "putUserSuccess");
        } catch (error) {
            console.log(error, "putUserError");
        }
    },
}));
