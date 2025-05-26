import { FC } from "react";
import styles from "./SuccessNotif.module.scss";
import { CloseSquare, TickCircle } from "iconsax-react";
import { successNotifApi } from "@/shared/api";

export const SuccessNotif: FC = () => {
    const { opened, state, setOpened } = successNotifApi();
    return (
        <div
            className={styles.SuccessNotif}
            style={{ display: opened ? "flex" : "none" }}
        >
            <TickCircle />
            {state}
            <CloseSquare
                cursor="pointer"
                onClick={() => setOpened(false)}
            />
        </div>
    );
};
