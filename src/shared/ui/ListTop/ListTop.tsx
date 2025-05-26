import { FC, ReactNode } from "react";
import styles from "./ListTop.module.scss";

export const ListTop: FC<{ children: ReactNode; width?: number; maxWidth?: number; minWidth?: number }> = ({
    children,
    width,
    maxWidth,
    minWidth,
}) => {
    return (
        <div
            style={{ width: `${width}px`, maxWidth: `${maxWidth}px`, minWidth: `${minWidth}px` }}
            className={styles.ListTop}
        >
            {children}
        </div>
    );
};
