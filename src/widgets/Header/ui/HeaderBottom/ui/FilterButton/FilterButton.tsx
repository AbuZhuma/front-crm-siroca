import { FC, useState } from "react";
import { Filter } from "iconsax-react";
import styles from "./FilterButton.module.scss";

interface IFilterButton {
    onClick: () => void;
}

export const FilterButton: FC<IFilterButton> = ({ onClick }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <button
            aria-label="filter"
            className={isOpen ? styles.FilterButtonOpen : styles.FilterButton}
            onClick={() => {
                onClick();
                setIsOpen(!isOpen);
            }}
        >
            <Filter
                size={34}
                variant={"Bold"}
                color={`${isOpen ? "white" : "#1C6AB1"}`}
            />
        </button>
    );
};
