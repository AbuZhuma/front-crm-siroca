import axios from "axios";
import { create } from "zustand";
import { BASE_URL, authToken } from "@/shared/variables";
import { ChangeEvent } from "react";
import { IAllCompaniesName } from "../../types/companyTypes/companyTypes";

interface IAllCompaniesListApi {
    companyInputState: string;
    companyExists: boolean;
    allCompaniesNamesList: string[];
    searchCompaniesNamesList: string[];
    setCompanyInputState: (companyInputState: string) => void;
    companyInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setCompanyExists: (notExist?: boolean) => void;
    getAllCompaniesList: () => void;
}

export const allCompaniesListApi = create<IAllCompaniesListApi>((set, get) => ({
    companyInputState: "",
    companyExists: false,
    allCompaniesList: [],
    allCompaniesNamesList: [],
    searchCompaniesNamesList: [],
    setCompanyInputState: (companyInputState) => {
        set({ companyInputState: companyInputState });
        const setCompanyExists = get().setCompanyExists;
        setCompanyExists(false);
    },
    companyInputChange: (e) => {
        const companyInputState = get().companyInputState;
        const allCompaniesNamesList = get().allCompaniesNamesList;
        set({
            companyInputState: e.target.value,
            searchCompaniesNamesList: allCompaniesNamesList.filter((jobTitle) => jobTitle.includes(companyInputState)),
        });
        const setCompanyExists = get().setCompanyExists;
        setCompanyExists();
    },
    setCompanyExists: (notExist) => {
        const companyInputState = get().companyInputState;
        const allCompaniesNamesList = get().allCompaniesNamesList;
        if (allCompaniesNamesList.some((company) => company === companyInputState)) {
            set({ companyExists: true, searchCompaniesNamesList: [] });
        } else if (!allCompaniesNamesList.some((company) => company === companyInputState) && !notExist) {
            set({ companyExists: false });
        }
    },
    getAllCompaniesList: async () => {
        const allCompaniesNamesList = get().allCompaniesNamesList;
        if (allCompaniesNamesList.length === 0) {
            try {
                const response = await axios.get(`${BASE_URL}/company/name_list/`, authToken);
                set({
                    allCompaniesNamesList: response.data.map((company: IAllCompaniesName) => company.name),
                });
            } catch (error) {
                console.log(error, "getAllCompaniesListError");
            }
        }
    },
}));
