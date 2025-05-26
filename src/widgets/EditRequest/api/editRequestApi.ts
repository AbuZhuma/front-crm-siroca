import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { IRequest } from "../types";
import { ChangeEvent } from "react";

interface IFile {
    id?: number;
    file: string;
    application: number;
    file_name?: string;
}

interface IFetch {
    requestState: IRequest;
    setRequestData: (request: IRequest) => void;
    setFile: (file: IFile) => void;
    requestChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    editRequest: () => void;
}

export const editRequestApi = create<IFetch>((set, get) => ({
    requestState: {
        id: 0,
        title: "",
        company: "",
        task_number: "",
        description: "",
        short_description: "",
        jira: "",
        status: "",
        payment_state: "",
        priority: "",
        application_date: "",
        confirm_date: "",
        offer_date: "",
        start_date: "",
        finish_date: "",
        deadline_date: "",
        main_client: "",
        main_manager: "",
        files: [],
    },
    setRequestData: (request) => {
        set({ requestState: request });
    },
    setFile: (file) => {
        set((prevState) => ({
            requestState: {
                ...prevState.requestState,
                files: [...prevState.requestState.files, file],
            },
        }));
    },
    requestChange: (e) => {
        set((prevState) => ({
            requestState: {
                ...prevState.requestState,
                [e.target.name]: e.target.value,
            },
        }));
        const state = get().requestState;
        console.log(state, "editRequstState");
    },
    editRequest: async () => {
        const requestState = get().requestState;
        if (
            requestState.main_manager === undefined ||
            requestState.main_manager === null ||
            requestState.main_manager === ""
        ) {
            delete requestState.main_manager;
        }
        if (
            requestState.main_client === undefined ||
            requestState.main_client === null ||
            requestState.main_client === ""
        ) {
            delete requestState.main_client;
        }
        try {
            const editResponse = await axios.put(
                `${BASE_URL}/applications/form_edit/${requestState.id}/`,
                requestState,
                authToken,
            );
            console.log(editResponse, "editRequestSuccess");
        } catch (error) {
            console.log(error, "editRequestError");
        }
    },
}));
