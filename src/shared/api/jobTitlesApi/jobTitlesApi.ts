import axios from "axios";
import { create } from "zustand";
import { ChangeEvent } from "react";
import { BASE_URL, authToken } from "@/shared/variables";
import { IJobTitle } from "@/shared/types";

interface IJobTitlesApi {
    jobTitlesList: IJobTitle[];
    jobTitlesNamesList: string[];
    searchList: IJobTitle[];
    oneJobTitle: IJobTitle;
    jobTitleSearchInput: string;
    setJobTitleExists: (exists?: boolean) => void;
    setJobTitleSearchInput: (jobTitle: string) => void;
    jobTitleExists: boolean;
    jobTitleNotExists: boolean;
    setJobTitleNotExists: () => void;
    searchJobTitleList: string[];
    setJobTitlesNamesList: (jobTitle: string) => void;
    searchJobTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    jobTitleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setJobTilesList: (jobTile: IJobTitle) => void;
    getJobTitlesList: () => void;
    setSearchList: (searchState: IJobTitle[]) => void;
    postJobTitle: (postState: { title: string }) => void;
    deleteJobTitle: (id: number) => void;
}

export const jobTitlesApi = create<IJobTitlesApi>((set, get) => ({
    jobTitlesList: [],
    jobTitlesNamesList: [],
    searchList: [],
    oneJobTitle: {
        title: "",
    },
    jobTitleSearchInput: "",
    jobTitleExists: false,
    jobTitleNotExists: true,
    setJobTitleNotExists: () => {
        const jobTitlesNamesList = get().jobTitlesNamesList;
        const oneJobTitle = get().oneJobTitle.title;
        if (jobTitlesNamesList.some((user) => user === oneJobTitle)) {
            set({ jobTitleNotExists: false });
        } else if (jobTitlesNamesList.some((user) => user !== oneJobTitle)) {
            set({ jobTitleNotExists: true });
        }
    },
    searchJobTitleList: [],
    setJobTitlesNamesList: (jobTitle) => {
        const jobTitlesNamesList = get().jobTitlesNamesList;
        set({
            jobTitlesNamesList: [...jobTitlesNamesList, jobTitle],
        });
    },
    setJobTitleExists: (exists) => {
        const jobTitlesNamesList = get().jobTitlesNamesList;
        const jobTitleSearchInput = get().jobTitleSearchInput;
        if (jobTitlesNamesList.some((user) => user === jobTitleSearchInput)) {
            set({ jobTitleExists: true, searchJobTitleList: [] });
        } else if (!jobTitlesNamesList.some((user) => user === jobTitleSearchInput) && !exists) {
            set({ jobTitleExists: false });
        }
        set({ jobTitleExists: exists });
    },
    setJobTitleSearchInput: (jobTitle) => {
        set({ jobTitleSearchInput: jobTitle });
        const setJobTitleExists = get().setJobTitleExists;
        setJobTitleExists();
    },
    searchJobTitleChange: (e) => {
        const jobTitlesNamesList = get().jobTitlesNamesList;
        const jobTitleSearchInput = get().jobTitleSearchInput;
        set({
            jobTitleSearchInput: e.target.value,
            searchJobTitleList: jobTitlesNamesList.filter((jobTitle) => jobTitle.includes(jobTitleSearchInput)),
        });
        const setJobTitleExists = get().setJobTitleExists;
        setJobTitleExists();
    },
    jobTitleInputChange: (e) => {
        set((prevState) => ({
            oneJobTitle: {
                ...prevState.oneJobTitle,
                [e.target.name]: e.target.value,
            },
        }));
        const setJobTitleNotExists = get().setJobTitleNotExists;
        setJobTitleNotExists();
        const jobTitleNotExists = get().jobTitleNotExists;
        console.log(jobTitleNotExists, "jobTitleNotExists");
    },
    setJobTilesList: (jobTitle) => {
        const jobTitlesList = get().jobTitlesList;
        set({
            jobTitlesList: [...jobTitlesList, jobTitle],
        });
    },
    getJobTitlesList: async () => {
        const jobTitlesList = get().jobTitlesList;
        if (jobTitlesList.length === 0) {
            try {
                const response = await axios.get(`${BASE_URL}/company/list_job-title/`, authToken);
                set({
                    jobTitlesList: response.data,
                    searchList: response.data,
                    jobTitlesNamesList: response.data.map((jobTitle: IJobTitle) => jobTitle.title),
                });
            } catch (error) {
                console.log(error, "getJobTitlesListError");
            }
        }
    },
    setSearchList: (searchState) => {
        set({ searchList: searchState });
    },
    postJobTitle: async (postState) => {
        try {
            const response = await axios.post(`${BASE_URL}/company/create_job-title/`, postState, authToken);
            set((prevState) => ({
                jobTitleList: [...prevState.jobTitlesList, response.data],
                oneJobTitle: { title: "" },
            }));
        } catch (error) {
            console.log(error, "postJobTitleError");
        }
    },
    deleteJobTitle: async (id) => {
        try {
            const deleteResponse = await axios.delete(`${BASE_URL}/company/delete_job-title/${id}/`, authToken);
            const newJobTitlesList = get().jobTitlesList.filter((jobTitle) => jobTitle.id !== id);
            set({ jobTitlesList: newJobTitlesList, searchList: newJobTitlesList });
            console.log(deleteResponse, "deleteJobTitleSuccess");
        } catch (error) {
            console.log(error, "deleteJobTitleError");
        }
    },
}));
