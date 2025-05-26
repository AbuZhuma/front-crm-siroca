import { Dispatch, RefObject, SetStateAction } from "react";

export const handleOutsideClick = (
    selectRef: RefObject<HTMLDivElement | HTMLInputElement>,
    setIsOpen?: Dispatch<SetStateAction<boolean>>,
    closeFunc?: () => void,
) => {
    const clickOutside: EventListener = (event: Event) => {
        const target = event.target as Node;
        if (setIsOpen && selectRef.current && !selectRef.current.contains(target)) {
            setIsOpen(false);
        } else if (closeFunc) {
            closeFunc();
        }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
        document.removeEventListener("mousedown", clickOutside);
    };
};
