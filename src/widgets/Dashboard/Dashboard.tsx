import { FC } from "react";
import styles from "./Dashboard.module.scss";
import { Home, TagUser } from "iconsax-react";
import { PATHS } from "@/shared/variables";
import { NavLink } from "react-router-dom";
import { LoginButton } from "@/shared/ui";
import { useMediaQuery } from "@/shared/hooks";

export const Dashboard: FC = () => {
    const screen = useMediaQuery();
    return (
        <div className={styles.Dashboard}>
            <div className={styles.Logo}>
                <img
                    alt="logo"
                    src="/Logo.svg"
                />
            </div>
            <div className={styles.Line} />
            <div className={styles.Buttons}>
                <NavLink
                    aria-label="link"
                    to={PATHS.main}
                    className={styles.DashboardButton}
                >
                    <Home size={screen > 1820 ? 24 : 18} />
                </NavLink>
                <NavLink
                    to={PATHS.admin}
                    aria-label="link"
                    className={styles.DashboardButton}
                >
                    <TagUser size={screen > 1820 ? 24 : 18} />
                </NavLink>
            </div>
            <LoginButton variant="Secondary" />
        </div>
    );
};
