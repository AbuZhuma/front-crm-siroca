import { getOneRequestApi } from "@/shared/api";
import styles from "./People.module.scss";
import { FC } from "react";

export const People: FC = () => {
    const fetchRequest = getOneRequestApi();
    return (
        <div className={styles.People}>
            <div className={styles.Name}>
                <p>Заявитель: </p>
                <p>Менеджер: </p>
            </div>
            <div className={styles.Data}>
                <p>{fetchRequest.oneRequest.main_client}</p>
                <p>{fetchRequest.oneRequest.main_manager}</p>
            </div>
        </div>
    );
};
