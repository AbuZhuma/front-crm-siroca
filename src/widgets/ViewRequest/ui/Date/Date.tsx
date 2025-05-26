import { getOneRequestApi } from "@/shared/api";
import styles from "./Date.module.scss";
import { FC } from "react";

export const Date: FC = () => {
    const fetchData = getOneRequestApi();
    return (
        <div className={styles.Date}>
            <div className={styles.Name}>
                <p>Дата начала:</p>
                <p>Срок выполнения:</p>
                <p>Дата отправки КП:</p>
                <p>Дата завершения:</p>
                <p>Дата подачи:</p>
                <p>Дата утверждения:</p>
                <p>Статус оплаты:</p>
            </div>
            <div className={styles.Data}>
                <p>{fetchData.oneRequest.start_date}</p>
                <p>{fetchData.oneRequest.deadline_date}</p>
                <p>{fetchData.oneRequest.offer_date}</p>
                <p>{fetchData.oneRequest.finish_date}</p>
                <p>{fetchData.oneRequest.application_date}</p>
                <p>{fetchData.oneRequest.confirm_date}</p>
                <p>{fetchData.oneRequest.payment_state}</p>
            </div>
        </div>
    );
};
