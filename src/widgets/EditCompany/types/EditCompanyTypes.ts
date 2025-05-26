import { Dispatch, SetStateAction } from "react";

export interface IViewCompanyModal {
    setModal: Dispatch<SetStateAction<boolean>>;
}

export interface IEditCompany {
    closeModalView: () => void;
    message: (text: string, number: number) => void;
    count: number;
    viewModal: boolean;
    page: number;
}
