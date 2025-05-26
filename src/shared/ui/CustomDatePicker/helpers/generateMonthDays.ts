import { IDateHelper } from "../types/DateHelperTypes";

export const generateMonthDays = (year: number, month: number, currentMonth: number): IDateHelper[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthDays: IDateHelper[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        let color = "#A8A8A8";

        if (month === currentMonth) {
            color = "#5C5C5C";
            if (date.getDay() === 0 || date.getDay() === 6) {
                color = "#1C6AB1";
            }
        }

        monthDays.push({
            day: i,
            value: `${year}-${(month + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`,
            color: color,
        });
    }

    return monthDays;
};
