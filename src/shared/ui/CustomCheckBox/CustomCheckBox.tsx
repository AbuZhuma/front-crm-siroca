import { FC } from "react";
import styles from "./CustomCheckBox.module.scss";
import { TickSquare } from "iconsax-react";
import { ICustomCheckBox } from "./types/CustomCheckBoxTypes";

export const CustomCheckBox: FC<ICustomCheckBox> = (props) => {
    const { checked, onClick } = props;
    return checked ? (
        <TickSquare
            cursor={"pointer"}
            variant="Bold"
            color="#1C6AB1"
            onClick={onClick}
        />
    ) : (
        <div
            onClick={onClick}
            className={styles.NotChecked}
        />
    );
};
