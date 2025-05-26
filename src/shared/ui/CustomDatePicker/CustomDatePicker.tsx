import { ChangeEvent, FC, useState } from "react";
import styles from "./CustomDatePicker.module.scss";
import { ArrowSquareLeft, ArrowSquareRight } from "iconsax-react";
import { changeMonth, dateHelper, dayClassName, getMonthName, getYear } from "./helpers";
import { ICustomDatePicker } from "./types/CustomDatePickerTypes";
import { currentDate } from "@/shared/variables";

export const CustomDatePicker: FC<ICustomDatePicker> = (props) => {
    const { value, name, onChange } = props;
    const [date, setDate] = useState<string>(value ? (value === "" ? currentDate : value) : currentDate);
    const handleChange = (chosenDate: string) => {
        const event = {
            target: {
                name: name,
                value: chosenDate === value ? null : chosenDate,
            },
        } as ChangeEvent<HTMLInputElement>;
        setDate(chosenDate);
        onChange(event && event);
    };
    return (
        <div className={styles.CustomDatePicker}>
            <div className={styles.CustomDatePickerTop}>
                <p className={styles.Month}>{getMonthName(date)}</p>
                <p>{getYear(date)}</p>
                <div>
                    <ArrowSquareLeft
                        onClick={() => setDate(changeMonth(date, "prev"))}
                        color="#717171"
                        variant="Bold"
                    />
                    <ArrowSquareRight
                        onClick={() => setDate(changeMonth(date, "next"))}
                        color="#717171"
                        variant="Bold"
                    />
                </div>
            </div>
            <div className={styles.Calendar}>
                <div className={styles.WeekDays}>
                    <p>ПН</p>
                    <p>ВТ</p>
                    <p>СР</p>
                    <p>ЧТ</p>
                    <p>ПТ</p>
                    <p className={styles.WeekendDay}>СБ</p>
                    <p className={styles.WeekendDay}>ВС</p>
                </div>
                <div className={styles.CalendarMain}>
                    {dateHelper(date).length > 0 &&
                        dateHelper(date).map((day, i) => (
                            <button
                                key={i}
                                type="button"
                                style={{ color: day.color }}
                                onClick={() => handleChange(day.value)}
                                className={styles[dayClassName(value, day)]}
                            >
                                {day.day}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
};
