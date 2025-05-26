import { FC } from "react";
import styles from "./ExpandIcon.module.scss";
import { ArrowDown2 } from "iconsax-react";
import { useMediaQuery } from "@/shared/hooks";

export const ExpandIcon: FC<{ isActive?: boolean }> = ({ isActive }) => {
    const screen = useMediaQuery();
    return (
        <div className={styles.ExpandIcon}>
            <ArrowDown2
                size={screen >= 1820 ? 24 : 18}
                color="#1C6AB1"
                style={{ rotate: isActive ? "0deg" : "270deg" }}
            />
        </div>
    );
};
