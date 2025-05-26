import { FC } from "react";
import styles from "./ItemInner.module.scss";
import { IItemInner } from "./types";

export const ItemInner: FC<IItemInner> = (props) => {
    const { content, width, wordMaxLegth } = props;
    return (
        <div
            className={styles.ItemInner}
            style={{ width: `${width}px` }}
        >
            {content && (content.length > wordMaxLegth
                ? content === "-----------"
                    ? "---"
                    : `${content.slice(0, wordMaxLegth)}...`
                : content)}
        </div>
    );
};
