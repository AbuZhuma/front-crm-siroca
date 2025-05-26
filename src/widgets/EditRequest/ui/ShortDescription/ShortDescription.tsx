import { FC } from "react";
import { CustomTextArea } from "@/shared/ui";
import styles from "./ShortDescription.module.scss";
import { editRequestApi } from "../../api/editRequestApi";

export const ShortDescription: FC = () => {
    const { requestState, requestChange } = editRequestApi();
    const length: number = requestState.short_description ? requestState.short_description.length : 0;
    return (
        <div className={styles.ShortDescription}>
            <CustomTextArea
                name="short_description"
                placeholder="Напишите..."
                onChange={requestChange}
                maxLength={60}
                value={requestState.short_description === null ? "" : requestState.short_description}
            />
            <p>{length}/60</p>
        </div>
    );
};
