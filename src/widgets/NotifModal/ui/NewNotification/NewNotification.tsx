import styles from "./NewNotification.module.scss";
import { FC } from "react";
import { NotificationSingle } from "../NotificationSingle/NotificationSingle";

export interface INotification {
    id: number;
    created_at: string;
    form_id: null | number | string;
    made_change: string;
    task_number: string;
    text: string;
    title: string;
}

export const NewNotification: FC<{ active: boolean; notifications: INotification[], getNotification: () => void }> = ({
    active, notifications, getNotification
}) => {
    return (
        <div className={styles.newNotificationCont}>
            <div className={styles.newNotificationContH4}>
                <h4 className={active ? styles.headerH4NewNotification : styles.headerH4NewNotification2}>
                    {active ? "Новые" : "Прочитанные"}
                </h4>
            </div>
            {notifications
                ? notifications.map((el: INotification, i) => {
                      return (
                          <NotificationSingle
                              key={i}
                              active={active}
                              notif={el}
                              udDate={getNotification}
                          />
                      );
                  })
                : null}
        </div>
    );
};
