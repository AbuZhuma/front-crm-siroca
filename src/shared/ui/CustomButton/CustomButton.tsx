import { FC, useState } from "react";
import styles from "./CustomButton.module.scss";
import { IButton } from "./types";
import { useMediaQuery } from "@/shared/hooks";

export const CustomButton: FC<IButton> = (props) => {
    const { width, variant, text, type, onClick, name } = props;
    const [isPressed, setIsPressed] = useState(false);
    const screenWidth = useMediaQuery();

    return (
        <button
            name={name}
            onClick={onClick}
            type={type}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)} // Сброс состояния при уходе курсора
            style={{ width: `${screenWidth >= 1820 ? width : (width / 100) * 75}px` }}
            className={`${styles.button} ${styles[variant]} ${isPressed ? styles.buttonPressed : ''}`}
        >
            {text}
        </button>
    );
};
