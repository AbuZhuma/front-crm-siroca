import { FC, useEffect, useState } from "react";
import styles from "./UserList.module.scss";
import { ViewUser } from "@/widgets";
import { User, UsersTop } from "..";
import { Pagination, ItemCount } from "@/shared/ui";
import { useMediaQuery } from "@/shared/hooks";
import { adaptive } from "@/shared/hooks/adaptive/adaptive";
import { usersListApi } from "@/shared/api";

export const UsersList: FC = () => {
    const [view, setView] = useState<boolean>(false);
    const { count, usersList, getUsersList } = usersListApi();
    const [page, setPage] = useState<number>(1);
    useEffect(() => {
        getUsersList(page);
    }, [page]);
    const window = useMediaQuery();
    return (
        <div className={styles.UsersList}>
            <div className={styles.Main}>
                <UsersTop view={view} />
                <div
                    className={styles.Users}
                    style={{ width: view ? `${adaptive(1245, window)}px` : `${adaptive(1760, window)}px` }}
                >
                    {usersList.length > 0 ? (
                        usersList.map((card, i) => (
                            <User
                                view={view}
                                setView={setView}
                                key={i}
                                user={card}
                            />
                        ))
                    ) : (
                        <div className={styles.Nothing}>По вашему запросу ничего не найдено</div>
                    )}
                </div>
                <div className={styles.Bottom}>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        count={count}
                    />
                    <div className={styles.ItemCount}>
                        <ItemCount
                            text="пользователей"
                            page={page}
                            count={count}
                        />
                    </div>
                </div>
            </div>
            <ViewUser
                view={view}
                setView={setView}
            />
        </div>
    );
};
