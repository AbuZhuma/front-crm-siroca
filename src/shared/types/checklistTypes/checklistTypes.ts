export interface ISubtask {
    id?: number;
    text: string;
    completed?: boolean;
    deadline?: string;
    checklist: number;
    manager?: string;
}

export interface ICreateSubtask {
    text: string;
    completed?: boolean;
    deadline?: string;
    checklist: number | undefined;
    manager?: string;
}

export interface IChecklist {
    id?: number;
    completed?: boolean;
    main_manager?: string;
    subtasks?: ISubtask[];
    name: string;
    application: number | null | string;
}
