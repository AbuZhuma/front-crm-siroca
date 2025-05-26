import { Dispatch, SetStateAction } from "react";

export interface ICreateRequestModal {
    setModal: Dispatch<SetStateAction<boolean>>;
}
export interface IAddedCreateRequest {
    [key: string]: string | null | undefined | boolean;
    title: boolean;
    company: boolean;
}
