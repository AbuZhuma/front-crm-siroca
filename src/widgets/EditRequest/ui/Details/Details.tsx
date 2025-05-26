import { FC } from "react";
import styles from "./Details.module.scss";
import { CustomInput } from "@/shared/ui";
import { editRequestApi } from "../../api/editRequestApi";
import { prioritiesList, statusesList } from "@/shared/variables";
import { DetailsSelect } from "./ui/DetailsSelect";

export const Details: FC = () => {
    const { requestState, requestChange } = editRequestApi();
    return (
        <div className={styles.Details}>
            <div className={styles.Container}>
                <div className={styles.Text}>Название заявки:</div>
                <CustomInput
                    value={requestState.title}
                    name="title"
                    width={350}
                    placeholder="Введите текст..."
                    change={requestChange}
                />
            </div>
            <div className={styles.Container}>
                <div className={styles.Text}>Приоритет:</div>
                <DetailsSelect list={prioritiesList} />
            </div>
            <div className={styles.Container}>
                <div className={styles.Text}>Статус заявки:</div>
                <DetailsSelect list={statusesList} />
            </div>
        </div>
    );
};
