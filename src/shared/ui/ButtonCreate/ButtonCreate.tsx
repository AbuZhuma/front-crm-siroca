import { FC } from "react";
import styles from "./ButtonCreate.module.scss";
import { AddSquare } from "iconsax-react";
import { useMediaQuery } from "@/shared/hooks";

export const ButtonCreate: FC<{
    onClick?: () => void;
    name?: string;
}> = ({ name, onClick }) => {
    const screenWidth = useMediaQuery();
    return (
        <button
            type="button"
            onClick={onClick}
            className={styles.ButtonCreate}
        >
            {name}
            <AddSquare size={screenWidth >= 1820 ? 24 : 18} />
        </button>
    );
};
