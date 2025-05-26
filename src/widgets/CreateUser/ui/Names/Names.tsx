import { FC } from "react";
import styles from "./Names.module.scss";
import { CustomInput } from "@/shared/ui";
import { postUserApi } from "../../api/postUserApi";

export const Names: FC = () => {
    const { postUserState, postUserAdded, postUserChange } = postUserApi();
    return (
        <div className={styles.Names}>
            <div className={styles.Text}>Имя</div>
            <CustomInput
                value={postUserState.first_name}
                trim={postUserAdded.first_name}
                name="first_name"
                width={340}
                placeholder="Напишите..."
                change={postUserChange}
            />
            <div className={styles.Text}>Фамилия</div>
            <CustomInput
                value={postUserState.surname}
                trim={postUserAdded.surname}
                name="surname"
                width={340}
                placeholder="Напишите..."
                change={postUserChange}
            />
        </div>
    );
};
