import { FC, useState } from "react";
import styles from "./SelectFilterItem.module.scss";

interface ISelectItem {
    el: {
        text: string;
        values: string[];
        prevValues: string[];
        type: string;
        selected: (string | number | null | boolean)[];
    };
    getSelect: (obj: { selected: string[]; type: string }) => void;
}
//There im rendering selecter dropdawn
export const SelectFilterItem: FC<ISelectItem> = (props) => {
    const { el, getSelect } = props;
    const [selects, setSelects] = useState<string[]>([]); //All choosed selects

    // pushing choosed selects
    const addSelect = (e: { currentTarget: { id: string } }) => {
        const value = e.currentTarget.id;
        if (selects.includes(value)) {
            const filteredSelects = selects.filter((item) => item !== value);
            setSelects(filteredSelects);
        } else {
            setSelects([...selects, value]);
        }
    };

    //Its click event func for confirm btn
    const onUseSelects = () => {
        const obj = { selected: selects, type: el.type };
        getSelect(obj);
    };
    const check = ({ text, index }: { text: string | number | boolean; index: number }) => {
        const sliced = el.values.slice(0, index);
        if (sliced.includes(text.toString())) {
            return false;
        } else {
            return true;
        }
    };
    if (el.values.length > 0) {
        return (
            <div className={styles.FilterItem}>
                <div className={styles.elCont}>
                    {el.values && //checking if values is already true
                        el.values.map((elem: string | number | boolean, index) => {
                            const displayedText =
                                String(elem).length > 10 ? String(elem).substring(0, 10) + "..." : elem;
                            if (el.selected.includes(elem) || elem === "null" || elem === "undefined") {
                                return;
                            } else {
                                const isChecked = check({ text: elem, index: index });
                                if (isChecked) {
                                    return (
                                        <div
                                            className={styles.Cont}
                                            key={`${el.type}-${index}`}
                                        >
                                            <input
                                                type="checkbox"
                                                onClick={addSelect}
                                                className={el.type}
                                                id={`${elem}`}
                                            />
                                            <label
                                                htmlFor={String(elem)}
                                                onClick={addSelect}
                                                className={el.type}
                                            >
                                                {displayedText}
                                            </label>
                                        </div>
                                    );
                                }
                            }
                        })}
                </div>

                <button
                    className={styles.add}
                    onClick={onUseSelects}
                >
                    Применить
                </button>
            </div>
        );
    }
};
