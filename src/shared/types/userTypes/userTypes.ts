export interface IUserDetails {
    [key: string]: number | string;
    main_company: string;
    job_title: string;
    first_name: string;
    role_type: string;
    username: string;
    password: string;
    surname: string;
    image: string;
    id: number;
}

export interface IUsersListUser {
    [key: string]: number | string | undefined | boolean | null;
    main_company: string;
    job_title: string;
    full_name: string;
    role_type: string;
    username: string;
    id?: number;
}

export interface IAllUsersName {
    [key: string]: number | string;
    id: number;
    full_name: string;
    main_company: string;
    role_type: string;
}

export interface ISendUser {
    [key: string]: number | string | File | undefined | null;
    main_company: string;
    job_title: string;
    first_name: string;
    role_type: string;
    username: string;
    password: string;
    surname: string;
    image?: File | string;
}

export interface IAddUser {
    [key: string]: boolean;
    image: boolean;
    first_name: boolean;
    surname: boolean;
    role_type: boolean;
    username: boolean;
    password: boolean;
    main_company: boolean;
    job_title: boolean;
}
