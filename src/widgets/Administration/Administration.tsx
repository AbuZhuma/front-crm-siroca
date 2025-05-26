import { FC } from "react";
import styles from "./Administration.module.scss";
import { AdminNavigate } from "./ui/AdminNavigate";
import { ProfileData, SuccessNotif } from "@/shared/ui";

export const Administration: FC = () => {
    return (
        <div className={styles.Inner}>
            <div className={styles.Administration}>
                <div className={styles.HeaderTop}>
                    <div className={styles.Name}>Администрирование</div>
                    <ProfileData />
                </div>
                <div className={styles.HeaderBottom}>
                    <AdminNavigate />
                    <SuccessNotif />
                </div>
            </div>
        </div>
    );
};
