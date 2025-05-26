import { FC } from "react";
import styles from "./RoleButton.module.scss";
import { IRole } from "../../types/types";

export const RoleButton: FC<IRole> = (props) => {
    const { onChange, role, trim } = props;
    return (
        <div className={styles.RoleButton}>
            <div className={styles.Name}>Тип роли</div>
            <div
                className={styles.RoleContainer}
                style={{ border: trim ? "none" : "2px solid #E51616" }}
            >
                <div className={styles.Role}>
                    <label className={styles.Text}>
                        Клиент
                        <input
                            type="radio"
                            onChange={onChange}
                            name="role_type"
                            value="client"
                            checked={role === "client" ? true : false}
                        />
                    </label>
                </div>
                <div className={styles.Role}>
                    <label className={styles.Text}>
                        Менеджер
                        <input
                            type="radio"
                            onChange={onChange}
                            name="role_type"
                            value="manager"
                            checked={role === "manager" ? true : false}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};
