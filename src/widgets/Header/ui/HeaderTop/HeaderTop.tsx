import { FC } from "react";
import styles from "./HeaderTop.module.scss";
import { StatusNumber } from "./ui/StatusNumber";
import { useMediaQuery } from "@/shared/hooks";
import { LoginButton, ProfileData } from "@/shared/ui";

export const HeaderTop: FC<{ isAdminManager: boolean }> = ({ isAdminManager }) => {
    const w = useMediaQuery();
    const proc = w / 100;
    const bigTopInner = w > 1900 ? 1820 : proc * 96;
    const smallTopInner = w > 1900 ? 1764 : proc * 89;
    return (
        <div className={styles.HeaderTop}>
            <div
                className={styles.HeaderTopInner}
                style={{ width: isAdminManager ? `${smallTopInner}px` : `${bigTopInner}px` }}
            >
                <div className={styles.HeaderLogo}>
                    {isAdminManager ? null : <img src="/Logo.svg" />}
                    <StatusNumber />
                </div>
                <div className={styles.DataProfile}>
                    <ProfileData />
                    {isAdminManager ? null : <LoginButton variant="Primary" />}
                </div>
            </div>
        </div>
    );
};
