import { currentDate } from "@/shared/variables";
import { IDateHelper } from "../types/DateHelperTypes";

export const dayClassName = (value: string, day: IDateHelper): string => {
    if (value === day.value) {
        return "Chosen";
    } else if (day.value === currentDate) {
        return "Today";
    } else {
        return "NotChosen";
    }
};
