import styles from "./SearchInput.module.scss";
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import { CloseSquare, SearchNormal1 } from "iconsax-react";
import { ISearchInput } from "./types/SearchInputTypes";

export const SearchInput: FC<ISearchInput> = (props) => {
    const { onKeyDown, closeFunc } = props;
    const [state, setState] = useState<string>("");
    const [closeState, setCloseState] = useState<boolean>(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
        setCloseState(true);
    };
    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            onKeyDown(state);
        }
    };
    const closeInput = () => {
        setCloseState(false);
        setState("");
        closeFunc();
    };
    useEffect(() => {
        if (state === "") {
            closeInput();
        }
    }, [state]);
    return (
        <div className={styles.Search}>
            <SearchNormal1
                color="#929292"
                size={24}
            />
            <input
                className={styles.Input}
                value={state}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
            <CloseSquare
                variant="Bold"
                color="#3B3B3B"
                size={24}
                style={{ display: closeState ? "block" : "none" }}
                className={styles.Close}
                onClick={closeInput}
            />
        </div>
    );
};
