export const changeMonth = (dateString: string, change: "next" | "prev"): string => {
    const dateParts = dateString.split("-");
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]);
    let day = parseInt(dateParts[2]);

    if (change === "next") {
        if (month !== 12) {
            month++;
        } else {
            month = 1;
            year++;
        }
    } else if (change === "prev") {
        if (month !== 1) {
            month--;
        } else {
            month = 12;
            year--;
        }
    }
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day > lastDayOfMonth) {
        day = lastDayOfMonth;
    }
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};
