import { FC } from "react";
import styles from "./CustomErrorCircle.module.scss";
import { ICustomErrorCircle } from "./types/CustomErrorCircleTypes";
import { Popover } from "antd";
import { InfoCircle } from "iconsax-react";
import { useMediaQuery } from "@/shared/hooks";

export const CustomErrorCircle: FC<ICustomErrorCircle> = (props) => {
    const { exist, text } = props;
    const screen = useMediaQuery();
    return (
        exist === false && (
            <Popover
                placement="top"
                content={<div className={styles.Text}>{text}</div>}
            >
                <InfoCircle
                    size={screen >= 1820 ? 24 : 18}
                    color="#E51616"
                    className={styles.Icon}
                />
            </Popover>
        )
    );
};
