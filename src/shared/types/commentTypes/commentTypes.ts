export interface IComment {
    id?: number;
    user?: string;
    text: string;
    date_added?: string;
    application: number;
    formatted_date_added?: string;
    user_image?: string;
    user_id?: number;
}
