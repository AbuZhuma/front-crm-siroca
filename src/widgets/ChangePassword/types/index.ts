import { Dispatch, SetStateAction } from "react";

export interface IChangeModal {
    setModal: Dispatch<SetStateAction<boolean>>;
    setModalProfile: Dispatch<SetStateAction<boolean>>;
}
