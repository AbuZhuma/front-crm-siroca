import { FC, useEffect, useRef, useState } from "react";
import HeaderSettings from "./ui/header/HeaderSettings";
import RolesRender from "./ui/itemsRender/RolesItemsRender";
import styles from "./RolesSettingsPage.module.scss";
import axios from "axios";
import { ArrowRight, InfoCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { usersListApi } from "@/shared/api";
import { BASE_URL, authToken } from "@/shared/variables";
import { IUsersListUser } from "@/shared/types";
import { CustomButton, Pagination, SearchInput } from "@/shared/ui";
import { Popover } from "antd";
import { useMediaQuery } from "@/shared/hooks";
import { loadingStatus } from "@/widgets/Loading/api/loadingStatus";
import { Loading } from "@/widgets";

export const RolesSettingsPage: FC = () => {
    const [boxesReg, setBoxesReg] = useState<IUsersListUser[]>([]);
    const [navtype, setNavtype] = useState<string>("Клиент");
    const [users, setUsers] = useState<IUsersListUser[]>([]);
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const headerSettingsList: string[] = [
        "Добавление/удаление комментариев к заявке",
        "Скачивание отчета по заявкам",
        "Просмотр истории изменений по заявке “Logs”",
        "Добавление/удаление файлов к заявке",
        "Добавление/удаление чек-листов",
        "Создание заявки",
        "Редактирование заявки",
    ];
    const headerSettingsListManager: string[] = [
        "Удаление комментариев пользователей",
        "Скачивание отчета по заявкам",
        "Удаление заявки",
        "Создание/редактирование компании",
        "Создание/редактирование пользователя",
        "Создание/удаление должности",
    ];
    const renderSettingsList: string[][] = [
        [
            "Добавление/удаление комментариев к заявке",
            "Скачивание отчета по заявкам",
            "Просмотр истории изменений по заявке “Logs”",
            "Добавление/удаление файлов к заявке",
            "Добавление/удаление чек-листов",
            "Создание заявки",
            "Создание/редактирование заявки",
        ],
        [
            "Удаление комментариев пользователей",
            "Скачивание отчета по заявкам",
            "Удаление заявки",
            "Создание/редактирование компании",
            "Создание/редактирование пользователя",
            "Создание/удаление должности",
        ],
    ];
    const fetchData = usersListApi();

    const navigate = useNavigate();

    //navigation
    const nvMenu = () => {
        navigate(-1);
    };

    //scroll-bar settings
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            const scrollHeight = scrollContainerRef.current.scrollHeight;
            const clientHeight = scrollContainerRef.current.clientHeight;
            const maxScrollTop = scrollHeight + clientHeight;
            scrollContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    };
    useEffect(() => {
        scrollToBottom();
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, []);

    //puting changes
    const reqRoles = async (props: { data: IUsersListUser[]; role: string }) => {
        try {
            if (props.role === "client") {
                const sendingData = {
                    users_data: props.data,
                };
                const response = await axios.put(`${BASE_URL}/users/clientpermissions/detail/`, sendingData, authToken);
                console.log(response);
            } else if (props.role === "manager") {
                const sendingData = {
                    users_data: props.data,
                };
                
                const response = await axios.put(
                    `${BASE_URL}/users/managerpermissions/detail/`,
                    sendingData,
                    authToken,
                );
                console.log(response);
            } else if (props.role === "") {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    //on click save im doing put to save all changes
    const {setStatus} = loadingStatus()
    const saveRoles = () => {
        setStatus("norm")
        const propertiesToDelete: string[] = [
            "first_name",
            "full_name",
            "image",
            "created_at",
            "job_title",
            "main_company",
            "surname",
            "username",
            "role_type",
            // "id"
        ];

        const managers: IUsersListUser[] = [];
        const clients: IUsersListUser[] = [];

        boxesReg.forEach((el: IUsersListUser) => {
            const role = el.role_type;
            propertiesToDelete.forEach((property) => {
                delete el[property];
            });

            if (role === "manager") {
                managers.push(el);
            } else if (role === "client") {
                clients.push(el);
            }
        });

        reqRoles({ data: managers, role: "manager" });
        reqRoles({ data: clients, role: "client" });
    };

    //just nav to client ot manager
    const changeNav = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = (e.target as HTMLButtonElement).innerText;
        setNavtype(id);
    };
    useEffect(() => {
        fetchData.getUsersList(page);
        setCount(fetchData.count);
    }, []);
    useEffect(() => {
        setUsers(fetchData.usersList);
    }, [fetchData.usersList]);

    const w = useMediaQuery();
    const proc = w / 100;

    return (
        <div
            className={styles.Settings}
            style={{ width: proc * 99 + "px" }}
        >
            <Loading/>
            <div
                className={styles.Container}
                ref={scrollContainerRef}
            >
                <div className={styles.Fixednav}>
                    <div className={styles.BackCont}>
                        <div className={styles.NvMneu}>
                            <div
                                onClick={nvMenu}
                                className={styles.Back}
                            >
                                <div className={styles.Icn}>
                                    <ArrowRight
                                        size={w < 1820 ? 29 : 34}
                                        color="#1C6AB1"
                                    />
                                </div>
                                <p>Назад</p>
                            </div>
                            <p className={styles.Par}>Расширенные настройки</p>
                        </div>

                        <div className={styles.Search}>
                            <CustomButton
                                width={130}
                                variant="Primary"
                                onClick={saveRoles}
                                text="Сохранить"
                            />
                        </div>
                    </div>
                    <div className={styles.topnav}>
                        <button
                            onClick={changeNav}
                            id="client"
                            className={navtype === "Клиент" ? styles.topNavActive : styles.topNavAnActive}
                        >
                            Клиент
                        </button>
                        <button
                            onClick={changeNav}
                            id="manager"
                            className={navtype === "Менеджер" ? styles.topNavActive : styles.topNavAnActive}
                        >
                            Менеджер
                        </button>
                        <div>
                            <SearchInput
                                closeFunc={() => fetchData.searchUsersList("")}
                                onKeyDown={fetchData.searchUsersList}
                            />
                            <Popover
                                placement="top"
                                color={"#D8ECFF"}
                                content={
                                    <div className={styles.Popover}>
                                        <p className={styles.title}>
                                            Правила пользования расширенными настройками прав пользователей:
                                        </p>
                                        <ul className={styles.list}>
                                            <li>
                                                <p>
                                                    Для того, чтобы присвоить, или лишить право пользователя необходимо
                                                    кликнуть дважды на чек-бокс выбранного пользователя и
                                                    соответствующего права.
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    Те изменения, которые были сделаны в расширенных настройках остаются
                                                    неизменными, даже если админ на странице общих настроек прав ролей
                                                    "Клиент" и "Менеджер " менял права пользователям ролей.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            >
                                <InfoCircle
                                    size={w < 1820 ? 30 : 36}
                                    color="#1c6ab1"
                                    style={{ cursor: "pointer" }}
                                />
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className={styles.tableCont}>
                    <HeaderSettings
                        name="Имя пользователя"
                        list={navtype === "Клиент" ? headerSettingsList : headerSettingsListManager}
                    />
                    <RolesRender
                        users={users ? users : []}
                        list={navtype === "Клиент" ? renderSettingsList[0] : renderSettingsList[1]}
                        getChanges={(e: IUsersListUser[]) => setBoxesReg(e)}
                        navType={navtype}
                    />
                </div>
            </div>
            {count > 50 ? (
                <div className={styles.pag}>
                    <Pagination
                        count={count}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            ) : null}
        </div>
    );
};
