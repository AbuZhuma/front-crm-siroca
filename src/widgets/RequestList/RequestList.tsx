import axios from "axios";
import { ViewRequest } from "..";
import { IRequestList } from "./types/types";
import { Request, RequestTop } from "./ui";
import styles from "./RequestList.module.scss";
import { useMediaQuery } from "@/shared/hooks";
import { FC, useEffect, useState } from "react";
import { Pagination, ItemCount } from "@/shared/ui";
import { getRequestApi } from "./api/getRequestApi";
import { BASE_URL, authToken } from "@/shared/variables";

export const RequestList: FC<IRequestList> = (props) => {
    const { isAdminManager, api } = props;
    const [page, setPage] = useState<number>(1);
    const [reqCount, setReqCount] = useState<number>(0);
    const [view, setView] = useState<boolean>(false);
    const fetchRequest = getRequestApi();
    const apiLength = fetchRequest.getState.length;
    const reqPage = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/applications/form/?page=${page}&${api}`, authToken);
            setReqCount(response.data.data.created_count);
            fetchRequest.setState(response.data.data.results);
            fetchRequest.setFilterState(response.data.data.results);
            fetchRequest.setNow(page);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        reqPage();
    }, [page]);
    const w = useMediaQuery();
    const proc = w / 100;
    return (
        <div className={styles.RequestList}>
            <div
                style={{
                    width: isAdminManager
                        ? view
                            ? `${w > 1900 ? 1048 : proc * 54}px`
                            : `${w > 1900 ? 1760 : proc * 92}px`
                        : view
                          ? `${w > 1900 ? 1192 : proc * 56}px`
                          : `${w > 1900 ? 1850 : proc * 95}px`,
                }}
            >
                <RequestTop
                    isAdminManager={isAdminManager}
                    view={view}
                />
                <div
                    className={styles.Inner}
                    style={{
                        width: isAdminManager
                            ? view
                                ? `${w > 1900 ? 1030 : proc * 53}px`
                                : `${w > 1900 ? 1754 : proc * 90}px`
                            : view
                              ? `${w > 1900 ? 1182 : proc * 55}px`
                              : `${w > 1900 ? 1850 : proc * 94}px`,
                    }}
                >
                    {apiLength > 0 ? (
                        fetchRequest.getState.map((card, i) => (
                            <Request
                                isAdminManager={isAdminManager}
                                view={view}
                                key={i}
                                request={card}
                                setView={setView}
                            />
                        ))
                    ) : (
                        <div className={styles.Nothing}>По вашему запросу ничего не найдено</div>
                    )}
                </div>
                <div className={styles.Bottom}>
                    {apiLength > 0 && (
                        <Pagination
                            page={page}
                            setPage={setPage}
                            count={reqCount}
                        />
                    )}
                    <div className={styles.ItemCount}>
                        <ItemCount
                            text="заявок"
                            count={reqCount}
                            page={page}
                        />
                    </div>
                </div>
            </div>
            {view && <ViewRequest setView={setView} />}
        </div>
    );
};
