import styles from "./People.module.scss";
import { FC } from "react";
import { ManagerSelect } from "./ui/ManagerSelect/ManagerSelect";
import { UserSelect } from "./ui/UserSelect/UserSelect";

export const People: FC = () => {
    return (
        <div className={styles.People}>
            <ManagerSelect />
            <UserSelect />
        </div>
    );
};
