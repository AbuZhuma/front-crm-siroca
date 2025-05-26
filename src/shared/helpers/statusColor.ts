export const statusColor = (word: string) => {
    switch (word) {
        case "К выполнению":
            return "#0094FF";
        case "В работе":
            return "#25815A";
        case "В тестировании":
            return "#8B5D17";
        case "Выполнено":
            return "#0500FF";
        case "Проверено":
            return "#D20A0A";
        default:
            return "black";
    }
};
