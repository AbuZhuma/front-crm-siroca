import { FC, useEffect, useRef, useState } from "react";
import styles from "./DetailsSelect.module.scss";
import { priorityColor, statusColor } from "@/shared/helpers";
import { ArrowDown2 } from "iconsax-react";
import { editRequestApi } from "../../../api/editRequestApi";
import { handleOutsideClick } from "@/shared/hooks";

export const DetailsSelect: FC<{ list: string[] }> = ({ list }) => {
    const { requestState, setRequestData } = editRequestApi();
    const listTypeStatus: boolean = list.includes("Выполнено");
    const [opened, setOpened] = useState<boolean>(false);
    const changeItem = (props: string) => {
        if (listTypeStatus) {
            setRequestData({ ...requestState, status: props });
        } else {
            setRequestData({ ...requestState, priority: props });
        }
        setOpened(false);
    };
    const selectedRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        handleOutsideClick(selectedRef, setOpened);
    }, []);
    return (
        <div
            className={styles.DetailsSelect}
            ref={selectedRef}
        >
            <div
                className={styles.Chosen}
                onClick={() => setOpened(!opened)}
                style={{ border: opened ? "1px solid #1C6AB1" : "none" }}
            >
                <p
                    style={{
                        color: listTypeStatus
                            ? statusColor(String(requestState.status))
                            : priorityColor(String(requestState.priority)),
                    }}
                >
                    {listTypeStatus ? requestState.status : requestState.priority}
                </p>
                <ArrowDown2 style={{ transform: opened ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>
            {opened && (
                <div className={styles.OptionsList}>
                    {list.map((item, i) => (
                        <p
                            key={i}
                            style={{
                                color: listTypeStatus ? statusColor(item) : priorityColor(item),
                            }}
                            onClick={() => changeItem(item)}
                        >
                            {item}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};
