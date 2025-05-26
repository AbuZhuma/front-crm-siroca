import { create } from "zustand";
import axios from "axios";
import { Data } from "iconsax-react";
import { DataAddCompanies } from "@/widgets/EditCompany/api/dataInputCompanies";
import { ChangeEvent } from "react";
import { authToken, BASE_URL } from "@/shared/variables";

export interface dataAddCompanies {
    name: string;
    company_code: string;
    country: string;
    managers: (number | undefined)[];
    main_manager: number | null;
    domain: string;
}
export interface userCompany {
    first_name: string;
    last_name: string;
    id: number;
}
export interface dataCompanies {
    id: number;
    name: string;
    country: string;
    count_users: string;
    count_applications: string;
    main_manager: number;
    last_updated_at: string;
    created_at: string | null | string;

    users?: userCompany[];
    company_code?: string;
    managers?: (number | undefined)[];
    domain?: string;
}
interface Data {
    data: dataCompanies[];
}
export interface manager {
    id?: number;
    first_name: string;
    surname: string;
    role_type: string;
    full_name: string;
}
export interface user {
    id: number;
    first_name: string;
    surname: string;
}
interface DataStore extends Data {
    fetchDatas: (page: number) => Promise<void>;
    addCompany: (company: dataAddCompanies, page: number) => Promise<void>;
    selectedIdCompany: (id: number) => Promise<void>;
    selectedCompanyData: DataAddCompanies;
    deleteCompany: (id: number, page: number) => Promise<void>;
    newSelectedCompany: (data: DataAddCompanies) => void;
    idCompany: number;
    modalViewCompany: boolean;
    openModalView: () => void;
    closeModalView: () => void;
    changeInputOne: (mainManager: number | undefined | false, maangers: (number | undefined)[]) => void;
    changeInputCompany: (e: ChangeEvent<HTMLInputElement>) => void;
    searchCompanies: (text: string) => Promise<void>;
    searchReset: (data: dataCompanies[]) => void;
    addedNewManagers: (id: number) => Promise<void>;
    lamp: (text: string) => Promise<void>;
    countCompany: number;
}

const fetchData = async (page?: number) => {
    try {
        if (page !== undefined) {
            const response = await axios.get(`${BASE_URL}/company/list/?page=${page}`, authToken);
            return response.data;
        }
    } catch (error) {
        console.error(error, "getCompaniesListError");
        return null;
    }
};

const addCompanies = async (datas: dataAddCompanies) => {
    try {
        const response = await axios.post(`${BASE_URL}/company/create/`, datas, authToken);
        return response.data;
    } catch (error) {
        console.error("Ошибка при добавлении компании:", error);
        return null;
    }
};
const deleteCompanies = async (id: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/company/edit/${id}/`, authToken);
        return response;
    } catch (error) {
        console.error("Ошибка при удалении компании:", error);
        return null;
    }
};

const selectedId = async (id: number | undefined) => {
    try {
        const response = await axios.get(`${BASE_URL}/company/detail/${id}/`, authToken);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const useDataStoreComponies = create<DataStore>((set, get) => ({
    data: [],
    countCompany: 0,
    modalViewCompany: false,
    selectedCompanyData: {
        name: "",
        company_code: "",
        country: "",
        managers: [],
        main_manager: 0,
        domain: "",
    },
    idCompany: 0,

    openModalView: () => {
        set({ modalViewCompany: true });
    },
    closeModalView: () => {
        set({ modalViewCompany: false });
    },
    fetchDatas: async (page: number) => {
        const datas = await fetchData(page);
        if (datas !== null) {
            set({ data: datas.data });
            set({ countCompany: datas.count });
        }
    },
    addCompany: async (company, page) => {
        await addCompanies(company);
        const newData = await fetchData(page);
        set({ countCompany: newData.count });

        if (newData !== null) {
            set({ data: newData.data });
        }
    },
    selectedIdCompany: async (id: number) => {
        const data = await selectedId(id);
        set((state) => {
            return {
                ...state,
                selectedCompanyData: data,
                idCompany: id,
            };
        });
    },
    deleteCompany: async (id, page) => {
        await deleteCompanies(id);
        const newData = await fetchData(page);
        if (newData !== null) {
            set({ data: newData.data });
            set({ countCompany: newData.count });
        }
    },
    changeInputCompany: (e) => {
        const { name, value } = e.target;
        
        set((state) => ({
            ...state,
            selectedCompanyData: {
                ...state.selectedCompanyData,
                [name]: value,
            },
        }));
    },

    changeInputOne: async (mainManager, managers) => {
        const { selectedCompanyData } = get();

        try {
            const response = await axios.put(
                `${BASE_URL}/company/edit/${selectedCompanyData.id}/`,
                {
                    ...selectedCompanyData,
                    main_manager: mainManager ? Number(mainManager) : null,
                    managers: managers,
                },
                authToken,
            );
            if (response.data) {
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    },
    searchCompanies: async (text) => {
        try {
            const response = await axios.get(`${BASE_URL}/company/list/?search=${text}`, authToken);
            set({ data: response.data.data });
        } catch (error) {
            console.log(error);
        }
    },
    searchReset: (data) => {
        set({ data: data });
    },
    addedNewManagers: async (id) => {
        const companies = get().selectedCompanyData;
        const data = {
            ...companies,
            managers: [...companies.managers, id],
        };
        try {
            const response = await axios.put(`${BASE_URL}/company/edit/${companies.id}/`, data, authToken);
            if (response.data) {
                const selectedCompany = await selectedId(companies.id);
                set({ selectedCompanyData: selectedCompany });
            }
        } catch (error) {
            console.log(error);
        }
    },
    newSelectedCompany: (data) => {
        set({ selectedCompanyData: data });
    },
    lamp: async (text) => {
        try {
            const response = await axios.get(`${BASE_URL}/company/code/?company_name=${text}`);
            return response.data.codes;
        } catch (error) {
            console.log(error);
        }
    },
}));

export { useDataStoreComponies };
