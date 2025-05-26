import { ChangeEvent, FC } from "react";
import { FilterItem } from "../TimeFilter";

interface IInput {
    setState: (data: FilterItem[]) => void;
    i: number;
    state: FilterItem[];
    placeholder: string;
    className: string;
}

export const InputSelects: FC<IInput> = ({ setState, i, state, placeholder, className }) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const timeState = [...state];
        const filteredVals = timeState[i].prevValues.filter((el) => {
            if (el.includes(e.target.value)) {
                return el;
            }
        });
        timeState[i].values = filteredVals;
        setState(timeState);
    };
    return (
        <input
            placeholder={placeholder}
            className={className}
            type="text"
            onChange={onChange}
        />
    );
};
