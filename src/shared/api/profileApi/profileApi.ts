import axios from "axios";
import { create } from "zustand";
import { ChangeEvent } from "react";
import { authToken, BASE_URL } from "@/shared/variables";

export interface IUserProfile {
    id?: string | null;
    first_name: string;
    image?: File | FileList | string | undefined;
    job_title: string;
    main_company: string;
    surname?: string;
    username: string;
    main_manager?: string;
    role_type?: string;
}

export interface adminContacts {
    email: string;
    phone_number: number | null;
    whatsapp_number: number | null;
}

interface IProfileApi {
    profileState: IUserProfile;
    adminContactsState: adminContacts;
    getUserProfile: (id?: string) => void;
    profileStateChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setProfileState: (data: IUserProfile) => void;
    putOneUser: () => Promise<void>;
    getAdminContacts: () => Promise<void>;
    putAdminContacts: (data: adminContacts) => Promise<void>;
    adminContactsChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const profileApi = create<IProfileApi>((set, get) => ({
    profileState: {
        id: null,
        first_name: "",
        image: "",
        job_title: "",
        main_company: "",
        surname: "",
        username: "",
        main_manager: "",
        role_type: "",
    },
    adminContactsState: {
        email: "",
        phone_number: null,
        whatsapp_number: null,
    },

    getAdminContacts: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/admin_contacts/`, authToken);
            set({ adminContactsState: response.data });
        } catch (error) {
            console.log(error, "getAdminContactsError");
        }
    },
    putAdminContacts: async (data) => {
        try {
            const response = await axios.put(`${BASE_URL}/users/admin_contacts/`, data, authToken);
            set({ adminContactsState: response.data });
        } catch (error) {
            console.log(error, "putAdminContactsError");
        }
    },
    adminContactsChange(e) {
        set((prevState) => ({
            adminContactsState: {
                ...prevState.adminContactsState,
                [e.target.name]: e.target.value,
            },
        }));
        console.log([e.target.name], e.target.value, "this is");
    },
    getUserProfile: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}/`, authToken);
            set({ profileState: response.data });
        } catch (error) {
            console.log(error, "getUserProfileError");
        }
    },
    profileStateChange: (e) => {
        set((prevState) => ({
            profileState: {
                ...prevState.profileState,
                [e.target.name]: e.target.name === "image" && e.target.files ? e.target.files[0] : e.target.value,
            },
        }));
    },
    setProfileState: (profileState) => {
        set({ profileState: profileState });
    },
    putOneUser: async () => {
        try {
            const profileState = get().profileState;
            if (profileState) {
                if (typeof profileState.image === "string") {
                    delete profileState.image;
                }
                const formData = new FormData();
                Object.entries(profileState).forEach(([key, value]) => {
                    formData.append(key, value as string);
                });
                const response = await axios.put(`${BASE_URL}/users/edit/${profileState.id}/`, formData, authToken);
                set({ profileState: response.data });
            }
        } catch (error) {
            console.log(error, "putOneUserError");
        }
    },
}));
