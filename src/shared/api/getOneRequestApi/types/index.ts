import { IComment } from "@/shared/types";

interface ILog {
    field: string;
    formatted_created_at: string;
    id: number;
    initially: string;
    new: string;
    user: string;
    task_number: string;
    user_image: string | null;
}

interface ISubtask {
    id?: number;
    text: string;
    completed?: boolean;
    deadline?: string;
    checklist: number;
    manager?: string;
}

interface ICheckList {
    id?: number;
    completed?: boolean;
    main_manager?: string;
    subtasks?: ISubtask[];
    name: string;
    application: number | null | string;
}

interface IFile {
    id?: number;
    file: string;
    application: number;
    file_name?: string;
}

interface IOneRequest {
    id: number;
    logs: ILog[];
    company: string;
    main_client: string;
    main_manager: string;
    checklists: ICheckList[];
    comments: IComment[];
    task_number: string;
    title: string;
    description: string;
    short_description: string;
    files: IFile[];
    jira: string;
    status: string;
    payment_state: string;
    priority: string;
    application_date: string;
    confirm_date: string;
    offer_date: string;
    start_date: string;
    finish_date: string;
    deadline_date: string;
}

export interface IGetOneRequestApi {
    oneRequest: IOneRequest;
    addChecklistToOneRequest: (checklist: ICheckList) => void;
    deleteChecklistFromChecklists: (id?: number) => void;
    setSubtaskToOneRequest: (subtask: ISubtask) => void;
    editSubtaskInOneRequest: (subtask: ISubtask) => void;
    setSubtaskCompletedFromOneRequest: (id: number | undefined) => void;
    deleteSubtaskFromOneRequest: (id: number | undefined) => void;
    setFile: (file: IFile) => void;
    deleteFileFromFiles: (id?: number) => void;
    setComment: (comment: IComment) => void;
    editCommentInOneRequest: (comment: IComment) => void;
    deleteCommentFromComments: (id?: number) => void;
    getOneRequest: (id: number | undefined) => void;
}
