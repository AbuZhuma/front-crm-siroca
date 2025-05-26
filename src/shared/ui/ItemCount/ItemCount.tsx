import { FC, useEffect, useState } from "react";
import styles from "./ItemCount.module.scss";
interface IItemCount {
    count: number;
    page: number;
    text: string;
}

export const ItemCount: FC<IItemCount> = ({ count, page, text }) => {
    const [counter, setCounter] = useState<number[]>([]);
    const setingCounter = () => {
        const all = 50 * Math.floor(count / 50);
        const f = count - 50 * Math.floor(count / 50);
        const now = 50 * (page - 1);
        if (count >= now) {
            setCounter([now, count > 50 ? (now + 50 > count ? all + f : now + 50) : now + f, count]);
        } else {
            setCounter([now, all + f, count]);
        }
    };
    useEffect(() => {
        setingCounter();
    }, [page, count]);
    return (
        <p className={styles.p}>
            Количество {text} с {counter[0] === 0 ? counter[0] + 1 : counter[0]} по {counter[1]} из {counter[2]}.
        </p>
    );
};
