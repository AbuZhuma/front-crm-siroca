import { Dispatch, SetStateAction } from "react";

export interface IEditRequest {
    requestFrom: "CreateRequest" | "ViewRequest";
    setModal: Dispatch<SetStateAction<boolean>>;
}

interface ICheckList {
    text?: string;
    completed?: boolean;
    deadline?: string;
    application?: number | null;
    manager?: number | null;
}

interface IComments {
    text?: string;
    application?: number | null;
}

interface IFile {
    id?: number;
    file: string;
    application: number;
}

export interface IRequest {
    id?: number;
    checklist?: ICheckList[];
    comments?: IComments[];
    task_number?: string;
    title?: string;
    description?: string;
    short_description?: string;
    files: IFile[];
    jira?: string;
    status?: string;
    payment_state?: string;
    priority?: string;
    application_date?: string;
    confirm_date?: string;
    offer_date?: string;
    start_date?: string;
    finish_date?: string;
    deadline_date?: string;
    company?: string;
    main_client?: string;
    main_manager?: string;
}
