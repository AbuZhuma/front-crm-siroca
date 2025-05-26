import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { ChangeEvent } from "react";

interface IPassword {
    new_password: string;
    confirm_password: string;
}

interface IFetch {
    passwordState: IPassword;
    passwordChange: (e: ChangeEvent<HTMLInputElement>) => void;
    resetPassword: (id: number | undefined, password: IPassword) => void;
}

export const resetPasswordApi = create<IFetch>((set) => ({
    passwordState: {
        new_password: "",
        confirm_password: "",
    },
    passwordChange: (e) => {
        set((prevState) => ({
            passwordState: {
                ...prevState.passwordState,
                [e.target.name]: e.target.value,
            },
        }));
    },
    resetPassword: async (id, password) => {
        try {
            const response = await axios.put(`${BASE_URL}/users/admin_reset_password/${id}/`, password, authToken);
            console.log(response);
        } catch (error) {
            console.log(error, "resetPasswordError");
        }
    },
}));
