import { Dispatch, SetStateAction } from "react";

export interface ICreateUserModal {
    company?: string
    setModal: Dispatch<SetStateAction<boolean>>;
}
