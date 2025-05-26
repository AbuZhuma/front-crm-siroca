import { Dispatch, SetStateAction } from "react";

export interface IObject {
    id?: number;
    task_number: string;
    title: string;
    short_description: string;
    status: string;
    priority: string;
    start_date: string;
    finish_date: string;
    company: string;
    main_client: string;
    main_manager: string;
}

export interface IRequest {
    request: IObject;
    isAdminManager: boolean;
    view: boolean;
    setView: Dispatch<SetStateAction<boolean>>;
}
