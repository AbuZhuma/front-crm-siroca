import { FC, useEffect } from "react";
import styles from "./ViewUserProfile.module.scss";
import { Popover } from "antd";
import { IViewUserProfile } from "./types/ViewUserProfileTypes";
import { oneUserApi } from "@/shared/api";

export const ViewUserProfile: FC<IViewUserProfile> = (props) => {
    const { children, userId } = props;
    const { oneUserState, getOneUser } = oneUserApi();
    useEffect(() => {
        if (oneUserState.id !== userId) {
            getOneUser(userId);
        }
    }, []);
    return (
        <Popover
            zIndex={2}
            placement="bottomLeft"
            trigger="click"
            content={
                <div className={styles.ViewUserProfile}>
                    <div className={styles.Names}>
                        <p>Аватар:</p>
                        <p>Имя пользователя:</p>
                        <p>Компания:</p>
                        <p>Должность:</p>
                        <p>Тип роли:</p>
                        <p>Логин:</p>
                    </div>
                    <div className={styles.Data}>
                        <div>
                            <img
                                src={oneUserState.image}
                                alt="image"
                            />
                        </div>
                        <p>
                            {oneUserState.first_name} {oneUserState.surname}
                        </p>
                        <p>{oneUserState.main_company}</p>
                        <p>{oneUserState.job_title}</p>
                        <p>{oneUserState.role_type}</p>
                        <p>{oneUserState.username}</p>
                    </div>
                </div>
            }
        >
            {children}
        </Popover>
    );
};
