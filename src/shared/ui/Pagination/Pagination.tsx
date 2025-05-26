import { ArrowLeft2 } from "iconsax-react";
import styles from "./Pagination.module.scss";
import { FC, useEffect, useState } from "react";

interface IPagination {
    page: number;
    setPage: (data: number) => void;
    count: number;
}

export const Pagination: FC<IPagination> = ({ page, setPage, count }) => {
    const [start, setStart] = useState<number[]>([]);
    const [middle, setMiddle] = useState<number[]>([]);
    const [finish, setFinish] = useState<number[]>([]);

    const ceil = Math.ceil(count / 50);

    const prevPage = () => {
        if (page !== 1) {
            const i = page - 1;
            setPage(i);
        }
    };
    const nextPage = () => {
        if (ceil > page) {
            const i = page + 1;
            setPage(i);
        }
    };
    const setingPagBtns = () => {
        if (page > 4 && ceil >= 1) {
            if (ceil > page) {
                if (finish.includes(page - 1) || finish.includes(page)) {
                    setMiddle([]);
                } else if (ceil >= 7) {
                    if (finish.includes(page + 1)) {
                        const timeStateMiddle = [page - 1, page];
                        setMiddle(timeStateMiddle);
                    } else {
                        const timeStateMiddle = [page - 1, page, page + 1];
                        setMiddle(timeStateMiddle);
                    }
                    const timeStateStart = [...start];
                    setStart(timeStateStart.slice(0, 2));
                }
            }
        } else if (page <= 4) {
            const timeStateStart = [];
            for (let index = 1; index <= page + 1; index++) {
                if (ceil >= index) {
                    timeStateStart.push(index);
                }
            }
            setStart(timeStateStart);
            setMiddle([]);
        }
    };
    const setingFinish = () => {
        const last = [ceil - 1, ceil];
        setFinish(last);
    };

    useEffect(() => {
        setingPagBtns();
        setingFinish();
    }, [page, count]);

    return (
        <div className={styles.Pagination}>
            <div className={styles.paginationCont}>
                <button
                    onClick={prevPage}
                    className={styles.pagToggle}
                >
                    <ArrowLeft2
                        size={24}
                        style={page === 1 ? { color: "#DEDEDE" } : { color: "black" }}
                    />
                </button>
                {start.map((el, i) => {
                    return (
                        <button
                            key={i}
                            onClick={() => {
                                setPage(el);
                            }}
                            className={page === el ? styles.paginBtn : styles.paginBtnAnActive}
                        >
                            {el}
                        </button>
                    );
                })}
                {middle.length && page > 4 ? "..." : null}
                {middle.map((el, i) => {
                    if (page > 4) {
                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    setPage(el);
                                }}
                                className={page === el ? styles.paginBtn : styles.paginBtnAnActive}
                            >
                                {el}
                            </button>
                        );
                    }
                })}
                {finish.length && ceil >= 7 ? "..." : null}
                {finish.map((el, i) => {
                    if (ceil >= 7) {
                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    setPage(el);
                                }}
                                className={page === el ? styles.paginBtn : styles.paginBtnAnActive}
                            >
                                {el}
                            </button>
                        );
                    }
                })}
                <button
                    onClick={nextPage}
                    className={styles.pagToggle}
                >
                    <ArrowLeft2
                        size={24}
                        style={
                            ceil === page
                                ? { color: "#DEDEDE", transform: "rotate(-180deg)" }
                                : { transform: "rotate(-180deg)" }
                        }
                    />
                </button>
            </div>
        </div>
    );
};
