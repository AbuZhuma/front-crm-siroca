import { FC } from "react";
import { HeaderBottom, HeaderTop } from "./ui";
import styles from "./Header.module.scss";

export const Header: FC<{ isAdminManager: boolean }> = ({ isAdminManager }) => {
    return (
        <header
            className={styles.Header}
            style={{
                width: isAdminManager ? "92vw" : "100vw",
                marginLeft: isAdminManager ? "8vw" : "",
            }}
        >
            <HeaderTop isAdminManager={isAdminManager} />
            <HeaderBottom isAdminManager={isAdminManager} />
        </header>
    );
};
