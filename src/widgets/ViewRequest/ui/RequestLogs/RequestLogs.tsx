import { FC } from "react";
import styles from "./RequestLogs.module.scss";
import { getOneRequestApi } from "@/shared/api";

export const RequestLogs: FC = () => {
    const fetchRequest = getOneRequestApi();
    return (
        <div className={styles.Logs}>
            {fetchRequest.oneRequest.logs.map((card, i) => (
                <div
                    id={card.task_number}
                    key={i}
                    className={styles.Log}
                >
                    <div className={styles.LogHeader}>
                        {
                            card.user_image ?
                                <img
                                    src={card.user_image}
                                    alt=""
                                />
                                :
                            <p className={styles.defoltAva}>{card.user === " " ? "A" : card.user.slice(0,1)}</p>
                        }
                        <p className={styles.Name}>{card.user === " " ? "Admin" : card.user}</p>
                        <p className={styles.Time}>Внес изменения {card.formatted_created_at}</p>
                    </div>
                    <div className={styles.LogMain}>
                        <div className={styles.TypeOf}>
                            <p>{card.field?.slice(0, 10)}</p>
                        </div>
                        <div className={styles.Prev}>
                            Изначальное: <p>{card.initially?.slice(0, 10)}...</p>
                        </div>
                        <div className={styles.Prev}>
                            Новое: <p>{card.new?.slice(0, 10)}...</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
