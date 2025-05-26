import { ChangeEvent } from "react";

export interface ICustomTextArea {
    placeholder: string;
    name?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    maxLength?: number;
    paddingRight?: number;
}
