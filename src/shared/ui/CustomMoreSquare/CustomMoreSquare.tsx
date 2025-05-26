import { FC, useState } from "react";
import { Popover } from "antd";
import styles from "./CustomMoreSquare.module.scss";
import { ICustomMoreSquare } from "./types/CustomMoreSquareTypes";

export const CustomMoreSquare: FC<ICustomMoreSquare> = (props) => {
    const { variant, children } = props;
    const [open, setOpen] = useState<boolean>(false);
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };
    return (
        <Popover
            placement="bottomRight"
            content={<div className={styles.MoreButtons}>{children}</div>}
            onOpenChange={handleOpenChange}
            trigger={"click"}
            open={open}
            zIndex={5}
        >
            <div className={styles[variant]}>
                <div />
                <div />
                <div />
            </div>
        </Popover>
    );
};
