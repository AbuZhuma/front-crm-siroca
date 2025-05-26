export const inputBorder = (inputState: string, added: boolean, exists: boolean) => {
    if (exists || added) {
        if (exists) {
            return "2px solid #00A91B";
        } else {
            if (inputState !== "") {
                return "2px solid #E51616";
            } else {
                return "none";
            }
        }
    } else {
        return "2px solid #E51616";
    }
};
