import { FC } from "react";
import style from "./CustomTextArea.module.scss";
import { ICustomTextArea } from "./types/types";
import { useMediaQuery } from "@/shared/hooks";

export const CustomTextArea: FC<ICustomTextArea> = (props) => {
    const { placeholder, value, name, paddingRight, onChange, maxLength } = props;
    const screenWidth = useMediaQuery();
    return (
        <textarea
            cols={30}
            rows={20}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            placeholder={placeholder}
            className={style.CustomTextArea}
            style={{
                paddingRight: `${screenWidth >= 1820 ? paddingRight : paddingRight && (paddingRight / 100) * 75}px`,
            }}
        />
    );
};
