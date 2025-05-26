import { FC, useEffect, useState } from "react";
import styles from "./ListTop.module.scss";
import { Popover } from "antd";
import { useFilter } from "@/widgets/Header/ui/HeaderBottom/ui/TimeFilter/api/useTimeFilter";
import { FilterItem } from "@/widgets/Header/ui/HeaderBottom/ui/TimeFilter/TimeFilter";
interface IProps {
    width?: number;
    name: string;
    maxWidth?: number;
    minWidth?: number;
    id?: string;
}

export const ListTopName: FC<IProps> = (props) => {
    const [selecteds, setSelecteds] = useState<string[]>([]);
    const { width, name, id } = props;
    const { state } = useFilter();

    const beetwinSelecteds = () => {
        if (state.length) {
            state.forEach((el: FilterItem) => {
                if (el.type === id) {
                    setSelecteds(el.selected);
                }
            });
        }
    };
    useEffect(() => {
        beetwinSelecteds();
    }, [state]);

    return (
        <div
            style={{
                width: `${width}px`,
                maxWidth: `${props.maxWidth}px`,
                minWidth: `${props.minWidth}px`,
            }}
        >
            {name}
            {selecteds && selecteds.length ? (
                <Popover
                    placement="top"
                    content={
                        <div className={styles.popoverFilters}>
                            {selecteds.map((el, i) => {
                                return (
                                    <p key={i}>
                                        {el}
                                        {i === selecteds.length - 1 ? "" : ","}
                                    </p>
                                );
                            })}
                        </div>
                    }
                >
                    <div className={styles.Liner}></div>
                </Popover>
            ) : null}
        </div>
    );
};
