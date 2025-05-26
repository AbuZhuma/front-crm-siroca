import { generateMonthDays } from ".";
import { IDateHelper } from "../types/DateHelperTypes";

export const dateHelper = (dateString: string): IDateHelper[] => {
    const currentDate = new Date(dateString);
    const currentMonth = new Date(dateString).getMonth();

    const firstDayOfMonth = new Date(currentDate);
    firstDayOfMonth.setDate(1);
    const year = firstDayOfMonth.getFullYear();
    const month = firstDayOfMonth.getMonth();
    const lastDayOfPreviousMonth = new Date(year, month, 0);
    const nextMonthStart = new Date(year, month + 1, 1);
    const startDayOfWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();

    const lastMonthDays =
        startDayOfWeek === 1
            ? []
            : generateMonthDays(
                  lastDayOfPreviousMonth.getFullYear(),
                  lastDayOfPreviousMonth.getMonth(),
                  currentMonth,
              ).slice(-(startDayOfWeek - 1));

    const nowMonthDays = generateMonthDays(year, month, currentMonth);

    const nextMonthDays = generateMonthDays(
        nextMonthStart.getFullYear(),
        nextMonthStart.getMonth(),
        currentMonth,
    ).slice(0, 42 - (lastMonthDays.length + nowMonthDays.length));

    return [...lastMonthDays, ...nowMonthDays, ...nextMonthDays];
};
