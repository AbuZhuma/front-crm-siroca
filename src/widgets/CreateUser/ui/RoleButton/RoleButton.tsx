import { FC } from "react";
import styles from "./RoleButton.module.scss";
import { postUserApi } from "../../api/postUserApi";

export const RoleButton: FC = () => {
    const { postUserState, postUserAdded, postUserChange } = postUserApi();
    return (
        <div className={styles.RoleButton}>
            <div className={styles.Name}>Тип роли</div>
            <div
                className={styles.Container}
                style={{ border: postUserAdded.role_type ? "none" : "2px solid #E51616" }}
            >
                <label>
                    Клиент
                    <input
                        checked={postUserState.role_type === "client" && true}
                        type="radio"
                        onChange={postUserChange}
                        name="role_type"
                        value="client"
                    />
                </label>
                <label>
                    Менеджер
                    <input
                        checked={postUserState.role_type === "manager" && true}
                        type="radio"
                        onChange={postUserChange}
                        name="role_type"
                        value="manager"
                    />
                </label>
            </div>
        </div>
    );
};
