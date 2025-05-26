export const priorityColor = (word: string) => {
    switch (word) {
        case "Самый низкий":
            return "#3A40D9";
        case "Низкий":
            return "#3A40D9";
        case "Средний":
            return "#D2C337";
        case "Высокий":
            return "#E51616";
        case "Самый высокий":
            return "#E51616";
        default:
            return "black";
    }
};
