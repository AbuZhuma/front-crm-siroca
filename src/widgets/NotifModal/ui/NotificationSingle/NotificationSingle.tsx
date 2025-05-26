import { FC } from "react";
import styles from "./NotificationSingle.module.scss";
import { CloseSquare } from "iconsax-react";
import axios from "axios";
import { BASE_URL, authToken } from "@/shared/variables";

interface INotificationSingle {
    active: boolean;
    notif: {
        id: number;
        created_at: string;
        form_id: null | number | string;
        made_change: string;
        task_number: string;
        text: string;
        title: string;
    };
    udDate: () => void;
}

export const NotificationSingle: FC<INotificationSingle> = ({ active, notif, udDate }) => {
    const delNotif = async () => {
        try {
            await axios.delete(`${BASE_URL}/applications/notifications/delete/${notif.id}/`, authToken);
            udDate();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.NotificationSingle}>
            <div className={styles.HeaderBlockSingle}>
                <div className={active ? styles.HeaderBlockActive : styles.HeaderBlockAnactive}></div>
                <p className={styles.TimeOnWose}>
                    {notif.created_at}{" "}
                    <CloseSquare
                        onClick={delNotif}
                        size={20}
                        style={{ cursor: "pointer" }}
                    />
                </p>
            </div>
            <div className={styles.NotificationContent}>
                <p className={styles.NumNotification}>
                    <span className={styles.Span}>{notif.task_number}</span>
                    {notif.title}
                </p>
                <p className={styles.NumNotification}>
                    {notif.made_change === " " ? "Admin  " :notif.made_change + "   "}
                    {notif.text}
                </p>
            </div>
        </div>
    );
};
