import { Dispatch, SetStateAction } from "react";

export interface IJobTitleModal {
    position: number;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    modalReady: boolean;
    setModalReady: Dispatch<SetStateAction<boolean>>;
}
