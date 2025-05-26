import styles from "./NotifModal.module.scss";
import { CloseSquare } from "iconsax-react";
import { FC } from "react";
import axios from "axios";
import { BASE_URL } from "@/shared/variables";
import { NewNotification } from "./ui";
import { INotification } from "./ui/NewNotification/NewNotification";

export const NotifModal: FC<{ setClose: (bul: boolean) => void, notifications:{new: INotification[], read: INotification[]}, getNotification: () => void, isHave: boolean, setIsHave: (data: boolean) => void}> = ({ setClose, notifications, getNotification, isHave, setIsHave}) => {
    const setTrue = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/applications/notifications/true/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    const clearNotification = async () => {
        try {
            await axios.delete(`${BASE_URL}/applications/notifications/delete/all/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                },
            });
            setIsHave(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.NotifModal}>
            <div className={styles.Container}>
                <div className={styles.NotifHeader}>
                    <h3 className={styles.NotifH3}>Уведомление</h3>
                    <button
                        className={styles.ClearBtn}
                        onClick={clearNotification}
                    >
                        Очистить все
                    </button>
                    <CloseSquare
                        cursor={"pointer"}
                        size={34}
                        onClick={() => {
                            setTrue();
                            setClose(false);
                        }}
                    />
                </div>
                <div className={styles.ContentBlock}>
                    {isHave ? (
                        <div className={styles.InnerCont}>
                            <NewNotification
                                active={true}
                                getNotification={getNotification}
                                notifications={notifications.new}
                            />
                            <NewNotification
                                active={false}
                                getNotification={getNotification}
                                notifications={notifications.read}
                            />
                        </div>
                    ) : (
                        <p className={styles.noList}>Список пуст!</p>
                    )}
                </div>
            </div>
        </div>
    );
};
