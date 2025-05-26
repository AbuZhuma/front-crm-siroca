import { ReactNode } from "react";

export interface IReady {
    children: ReactNode;
    no: () => void;
    yes: () => void;
}
