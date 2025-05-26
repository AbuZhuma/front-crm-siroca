import { FC, useEffect, useRef, useState } from "react";
import styles from "./DateInput.module.scss";
import { CustomDatePicker, CustomInput } from "@/shared/ui";
import { IDateInput } from "./types/DateInputTypes";
import { editRequestApi } from "@/widgets/EditRequest/api/editRequestApi";
import { Calendar } from "iconsax-react";
import { handleOutsideClick } from "@/shared/hooks";

export const DateInput: FC<IDateInput> = (props) => {
    const { text, value, name } = props;
    const [dateOpened, setDateOpened] = useState<boolean>(false);
    const { requestChange } = editRequestApi();
    const selectRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        handleOutsideClick(selectRef, setDateOpened);
    }, []);
    return (
        <div className={styles.DateInput}>
            <p>{text}</p>
            <div className={styles.Input}>
                <CustomInput
                    type="date"
                    value={value === null ? "" : value}
                    name={String(name)}
                    change={requestChange}
                    width={282}
                />
                <div className={styles.Icon}>
                    <div
                        onClick={() => setDateOpened(!dateOpened)}
                        ref={selectRef}
                    >
                        <Calendar color="#5C5C5C" />
                    </div>
                </div>
                {dateOpened && (
                    <div
                        className={styles.DatePicker}
                        ref={selectRef}
                    >
                        <CustomDatePicker
                            value={value ? value : ""}
                            name={name}
                            onChange={(e) => e && requestChange(e)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
