import { user } from "@/widgets/Companies/api/componiesApi";
import { create } from "zustand";

// Добавляем объявление Symbol.iterator для типа number | undefined[]
declare global {
    interface NumberOrUndefinedArray extends Array<number | undefined> {
        [Symbol.iterator](): IterableIterator<number>;
    }
}
// Модифицированный интерфейс DataAddCompanies
export interface DataAddCompanies {
    id?: number;
    name: string;
    company_code: string;
    country: string;
    managers: (number | undefined)[];
    main_manager: number | null;
    domain: string;
    count_users?: number;
    count_applications?: number;
    created_at?: string;
    last_updated_at?: string;
    users?: user[];
}

interface DataInputCompaniesStore {
    changeInput: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    resetInput: () => void;
    dataInputCompanies: DataAddCompanies;
    addManager: (manager: number | undefined) => void;
    addMainManager: (manager: number | undefined) => void;
    addManagers: (manager: number | undefined) => void;
    company_code: (text: string) => void;
}
// Создаем хранилище Zustand
export const useDataInputCompaniesStore = create<DataInputCompaniesStore>((set) => ({
    dataInputCompanies: {
        name: "",
        company_code: "",
        country: "",
        managers: [],
        main_manager: null,
        domain: "",
    },
    // Функция изменения
    changeInput: (e) => {
        set((state) => ({
            dataInputCompanies: {
                ...state.dataInputCompanies,
                [e.target.name]: e.target.value,
            },
        }));
    },
    addManager: (manager) => {
        set((state) => ({
            dataInputCompanies: {
                ...state.dataInputCompanies,
                // Добавляем проверку на undefined
                managers: Array.isArray(state.dataInputCompanies.managers)
                    ? [...state.dataInputCompanies.managers, manager]
                    : [manager],
            },
        }));
    },
    addMainManager: (manager) => {
        set((state) => ({
            dataInputCompanies: {
                ...state.dataInputCompanies,
                main_manager:
                    typeof manager === "number" && !isNaN(manager) ? manager : state.dataInputCompanies.main_manager,
            },
        }));
    },
    addManagers: (data) => {
        set((state) => ({
            dataInputCompanies: {
                ...state.dataInputCompanies,
                managers: [...state.dataInputCompanies.managers, data],
            },
        }));
    },
    // Новая функция сброса
    resetInput: () => {
        set({
            dataInputCompanies: {
                name: "",
                company_code: "",
                country: "",
                managers: [],
                main_manager: 0,
                domain: "",
            },
        });
    },
    company_code: (text) => {
        set((state) => ({
            dataInputCompanies: {
                ...state.dataInputCompanies,
                company_code: text,
            },
        }));
    },
}));
