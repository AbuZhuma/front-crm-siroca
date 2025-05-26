import { CloseSquare } from "iconsax-react";
import styles from "./ViewLogs.module.scss";
import { Dispatch, FC, SetStateAction } from "react";
import { getOneRequestApi } from "@/shared/api";

export const ViewLogs: FC<{ setViewLogs: Dispatch<SetStateAction<boolean>> }> = ({ setViewLogs }) => {
    const { oneRequest } = getOneRequestApi();

    return (
        <div className={styles.ViewLogs}>
            <div className={styles.Header}>
                <p>История изменений</p>
                <CloseSquare
                    size={32}
                    style={{ cursor: "pointer" }}
                    onClick={() => setViewLogs(false)}
                />
            </div>
            {oneRequest.logs.map((el, i) => {

                return (
                    <div key={i}>
                        <div className={styles.Log}>
                            <div className={styles.LogHeader}>
                                {
                                    el.user_image ?
                                        <img
                                            src={el.user_image}
                                            alt=""
                                        />
                                        :
                                        <p className={styles.defoltAva}>{el.user === " " ? "A" : el.user.slice(0, 1)}</p>
                                }
                                <p className={styles.Name}>{el.user}</p>
                                <p className={styles.Time}>Внес изменения-{el.formatted_created_at}</p>
                            </div>
                            <div className={styles.LogMain}>
                                <div className={styles.MainItem}>
                                    <div className={styles.Prev}>{el.field}</div>
                                </div>
                                <div className={styles.MainItem}>
                                    <div className={styles.Prev}>Изначальное:</div>
                                    <div className={styles.Content}>
                                        <p>{el.initially ? el.initially : "-----------"}</p>
                                    </div>
                                </div>
                                <div className={styles.MainItem}>
                                    <div className={styles.Prev}>
                                        Новое: <p> </p>
                                    </div>
                                    <div className={styles.Content}>
                                        <p>{el.new}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                );
            })}
        </div>
    );
};
