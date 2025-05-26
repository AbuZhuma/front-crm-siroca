import { ReactNode } from "react";

export const capitalize = (word?: ReactNode) => {
    if (typeof word !== "string") return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
};
