export const getYear = (dateString: string): number => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
};
