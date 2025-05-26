export const adaptive = (widthContainer: number, window: number) => {
    const pro = window / 100;
    if (window < 1890) {
        const w = (widthContainer * 100) / 1920;
        return w * pro;
    } else {
        return widthContainer;
    }
};
