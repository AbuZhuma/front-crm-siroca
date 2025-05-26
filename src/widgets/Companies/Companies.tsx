import { Modal } from "antd";
import { SearchInput } from "@/shared/ui";
import styles from "./Companies.module.scss";
import { CreateCompany, ViewCompany } from "@/widgets";
import { useDataStoreComponies } from "./api/componiesApi";
import { FC, useEffect, useState } from "react";
import { ListTopName, ListTop, ItemInner, ButtonCreate, Pagination, ItemCount } from "@/shared/ui";
import { allUsersListApi } from "@/shared/api";
import { useDataInputCompaniesStore } from "../EditCompany/api/dataInputCompanies";
import { useMediaQuery } from "@/shared/hooks";
import { adaptive } from "@/shared/hooks/adaptive/adaptive";

export const Companies: FC = () => {
    const window = useMediaQuery();
    const {
        fetchDatas,
        data,
        selectedIdCompany,
        openModalView,
        closeModalView,
        modalViewCompany,
        searchCompanies,
        countCompany,
    } = useDataStoreComponies();
    const { getAllUsersList, allUsersList } = allUsersListApi();
    const { resetInput } = useDataInputCompaniesStore();
    const [createCompany, setCreateCompany] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const openModalCreateCompany = () => {
        setCreateCompany(true);
    };
    const closeModalCreateCompany = () => {
        setCreateCompany(false);
    };
    const message = (name: string, number: number) => {
        setCount(number);
        console.log(name);
    };
    useEffect(() => {
        getAllUsersList();
        fetchDatas(page);
    }, [fetchDatas, page, getAllUsersList]);

    const truncatedStr = (str: string | null | undefined): string => {
        if (!str) {
            return "";
        }
        return str.length > 5 ? str.substring(0, 5) + "..." : str;
    };
    const names = (id: number | undefined): string => {
        const manager = allUsersList.find((manager) => manager.id === id);
        return manager ? `${manager.full_name}` : "";
    };

    return (
        <div className={styles.Companies}>
            <div>
                <div
                    className={styles.searchCompanies}
                    style={{ width: `${adaptive(1718, window)}px` }}
                >
                    <div>
                        <div
                            className={styles.h3}
                            onClick={closeModalView}
                        >
                            Поиск по компаниям
                        </div>
                        <SearchInput
                            onKeyDown={searchCompanies}
                            closeFunc={() => fetchDatas(page)}
                        />
                    </div>
                    <div
                        className={styles.Buttons}
                        onClick={openModalCreateCompany}
                    >
                        <ButtonCreate name="Создать компанию" />
                    </div>
                </div>
                <div className={styles.container}>
                    <div
                        style={{
                            width: modalViewCompany ? `${adaptive(1100, window)}px` : `${adaptive(1718, window)}px`,
                        }}
                        className={styles.table}
                    >
                        <ListTop>
                            <ListTopName
                                name="Компания"
                                width={modalViewCompany ? adaptive(160, window) : adaptive(204, window)}
                            />
                            <ListTopName
                                name={modalViewCompany ? "Страна ком..." : "Страна компании"}
                                width={modalViewCompany ? adaptive(160, window) : adaptive(206, window)}
                            />
                            <ListTopName
                                name={modalViewCompany ? "Количес..." : "Количество пользователей"}
                                width={modalViewCompany ? adaptive(160, window) : adaptive(302, window)}
                            />
                            <ListTopName
                                name={modalViewCompany ? "Количес..." : "Количество заявок"}
                                width={modalViewCompany ? adaptive(160, window) : adaptive(281, window)}
                            />
                            <ListTopName
                                name="Менеджер"
                                width={modalViewCompany ? adaptive(160, window) : adaptive(204, window)}
                            />
                            <ListTopName
                                name={modalViewCompany ? "Дата созд..." : "Дата создания"}
                                width={modalViewCompany ? adaptive(160, window) : adaptive(202, window)}
                            />
                            <ListTopName
                                name={modalViewCompany ? "Дата пос..." : "Дата крайнего редактирования"}
                                width={modalViewCompany ? adaptive(160, window) : adaptive(292, window)}
                            />
                        </ListTop>
                        {data.length !== 0 ? (
                            <ul
                                style={{
                                    width: modalViewCompany
                                        ? `${adaptive(1115, window)}px`
                                        : `${adaptive(1739, window)}px`,
                                }}
                            >
                                {data.map((dataCompany) => (
                                    <li
                                        className={styles.datas}
                                        onClick={() => {
                                            selectedIdCompany(dataCompany.id);
                                            openModalView();
                                        }}
                                        key={dataCompany.id}
                                        style={{
                                            width: modalViewCompany
                                                ? `${adaptive(1083, window)}px`
                                                : `${adaptive(1715, window)}px`,
                                        }}
                                    >
                                        <ItemInner
                                            wordMaxLegth={modalViewCompany ? 5 : 17}
                                            width={modalViewCompany ? adaptive(160, window) : adaptive(215, window)}
                                            content={
                                                modalViewCompany ? truncatedStr(dataCompany.name) : dataCompany.name
                                            }
                                        />
                                        <ItemInner
                                            wordMaxLegth={modalViewCompany ? 5 : 15}
                                            width={modalViewCompany ? adaptive(160, window) : adaptive(220, window)}
                                            content={
                                                modalViewCompany
                                                    ? truncatedStr(dataCompany.country)
                                                    : dataCompany.country
                                            }
                                        />
                                        <ItemInner
                                            wordMaxLegth={modalViewCompany ? 5 : 10}
                                            width={modalViewCompany ? adaptive(160, window) : adaptive(325, window)}
                                            content={dataCompany.count_users}
                                        />
                                        <ItemInner
                                            wordMaxLegth={modalViewCompany ? 5 : 10}
                                            width={modalViewCompany ? adaptive(160, window) : adaptive(300, window)}
                                            content={dataCompany.count_applications}
                                        />
                                        <div
                                            className={styles.managerName}
                                            style={{
                                                width: `${modalViewCompany ? `${adaptive(160, window)}px` : `${adaptive(230, window)}px`}`,
                                            }}
                                        >
                                            {modalViewCompany
                                                ? truncatedStr(names(dataCompany.main_manager))
                                                : names(dataCompany.main_manager)}
                                        </div>
                                        <ItemInner
                                            wordMaxLegth={modalViewCompany ? 5 : 10}
                                            width={modalViewCompany ? adaptive(160, window) : adaptive(220, window)}
                                            content={String(dataCompany.created_at)}
                                        />
                                        <ItemInner
                                            wordMaxLegth={modalViewCompany ? 5 : 10}
                                            width={modalViewCompany ? adaptive(160, window) : adaptive(306, window)}
                                            content={dataCompany.last_updated_at}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={styles.alert}>По вашему запросу ничего не найдено</p>
                        )}
                        <div className={styles.pogin}>
                            <Pagination
                                count={countCompany}
                                page={page}
                                setPage={setPage}
                            />
                            <div className={styles.count}>
                                <ItemCount
                                    text="компаний"
                                    page={page}
                                    count={countCompany}
                                />
                            </div>
                        </div>
                    </div>
                    <ViewCompany
                        message={message}
                        count={count}
                        page={page}
                    />
                </div>
            </div>
            <Modal
                centered
                width={adaptive(660, window)}
                open={createCompany}
                onCancel={() => {
                    closeModalCreateCompany();
                    resetInput();
                }}
            >
                <CreateCompany
                    nameCreateCompany={message}
                    count={count}
                    closeCreateModal={closeModalCreateCompany}
                    page={page}
                />
            </Modal>
        </div>
    );
};
