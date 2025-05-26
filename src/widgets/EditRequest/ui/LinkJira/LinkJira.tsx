import { FC } from "react";
import styles from "./LinkJira.module.scss";
import { CustomInput } from "@/shared/ui";
import { Link1 } from "iconsax-react";
import { editRequestApi } from "../../api/editRequestApi";

export const LinkJira: FC = () => {
    const { requestState, requestChange } = editRequestApi();
    return (
        <div className={styles.LinkJira}>
            <CustomInput
                name="jira"
                width={580}
                placeholder="https://"
                paddingLeft={45}
                change={requestChange}
                value={requestState.jira === null ? "" : requestState.jira}
            />
            <Link1
                className={styles.LinkIcon}
                size={24}
                color="#5C5C5C"
            />
        </div>
    );
};
