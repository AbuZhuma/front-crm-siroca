import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IRole {
    trim: boolean | undefined;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    role?: string | null;
}

export interface IEditImage {
    added: boolean | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface IEditUserModal {
    setModal: Dispatch<SetStateAction<boolean>>;
}
