import { FC } from "react";
import styles from "./CustomInput.module.scss";
import { IInput } from "./types";
import { useMediaQuery } from "@/shared/hooks";

export const CustomInput: FC<IInput> = (props) => {
    const {
        width,
        title,
        placeholder,
        height,
        background,
        value,
        name,
        type,
        change,
        paddingLeft,
        paddingRight,
        defaultValue,
        onClick,
        readOnly,
        id,
        trim,
        maxLength,
        color,
    } = props;
    const screenWidth = useMediaQuery();
    return (
        <input
            title={title}
            type={type}
            value={value}
            name={name}
            id={id}
            defaultValue={defaultValue}
            onChange={change}
            style={{
                width: `${screenWidth >= 1820 ? width : (width / 100) * 75}px`,
                height: `${height}px`,
                background: `${background}`,
                paddingLeft: `${paddingLeft}px`,
                paddingRight: `${paddingRight}px`,
                border: trim || trim === undefined ? "none" : "2px solid #E51616",
                color: color,
            }}
            placeholder={placeholder}
            color={color}
            className={styles.Input}
            onClick={onClick}
            readOnly={readOnly}
            maxLength={maxLength}
        />
    );
};
