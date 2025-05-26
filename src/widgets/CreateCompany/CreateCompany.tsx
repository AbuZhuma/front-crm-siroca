import { AddSquare, CloseSquare, LampOn } from "iconsax-react";
import styles from "./CreateCompany.module.scss";
import { CustomButton, CustomInput } from "@/shared/ui";
import { FC, useState } from "react";
import { useDataStoreComponies } from "@/widgets/Companies/api/componiesApi";
import { Modal } from "antd";
import { allUsersListApi, successNotifApi } from "@/shared/api";
import { AddManager } from "@/widgets";
import { useDataInputCompaniesStore } from "../EditCompany/api/dataInputCompanies";
import { useMediaQuery } from "@/shared/hooks";
import { adaptive } from "@/shared/hooks/adaptive/adaptive";
import { loadingStatus } from "../Loading/api/loadingStatus";

interface modal {
    closeCreateModal: () => void;
    nameCreateCompany: (text: string, number: number) => void;
    count: number;
    page: number;
}

export const CreateCompany: FC<modal> = ({ closeCreateModal, nameCreateCompany, count, page }) => {
    const window = useMediaQuery();
    const [allData, setAllData] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const { addCompany, lamp } = useDataStoreComponies();
    const { setState } = successNotifApi();
    const { changeInput, resetInput, dataInputCompanies, addMainManager, addManagers, company_code } =
        useDataInputCompaniesStore();
    const [err, setErr] = useState<boolean>(false);
    const [addManagerModal, setAddManagerModal] = useState<boolean>(false);
    const {
        companyManagerState,
        companyManagerChange,
        searchCompanyManagersList,
        setCompanyManagerState,
        allUsersList,
        allManagersNamesList,
    } = allUsersListApi();

    const functionCreateCompany = () => {
        addCompany(dataInputCompanies, page);
        const number = count + 1;
        setState(`Компания "${dataInputCompanies.name}" была создана!`);
        nameCreateCompany(`Компания "${dataInputCompanies.name}" была создана!`, number);
        resetInput();
        setAllData(false);
        closeCreateModal();
        setCompanyManagerState("");
        setErr(false);
    };
    const {setStatus} = loadingStatus()
    const addNewCompany = () => {
        setStatus("norm")
        if (
            dataInputCompanies.name &&
            dataInputCompanies.company_code &&
            dataInputCompanies.country &&
            dataInputCompanies.domain
        ) {
            setAllData(false);
            if (companyManagerState !== "") {
                const managerFound = allManagersNamesList?.some((filtered) => {
                    if (filtered === companyManagerState) {
                        functionCreateCompany();
                        return true;
                    }
                    return false;
                });
                if (!managerFound) {
                    setErr(true);
                }
            } else {
                functionCreateCompany();
            }
        } else {
            setAllData(true);
            console.log("error");
        }
    };

    const w = useMediaQuery();

    return (
        <div className={styles.CreateCompany}>
            <div className={styles.blockOne}>
                <div>Создать компанию</div>
                <CloseSquare
                    cursor={"pointer"}
                    size={32}
                    onClick={() => {
                        closeCreateModal();
                        resetInput();
                    }}
                />
            </div>
            <div className={styles.blockTwo}>
                <div>
                    <label htmlFor="">Название компании</label>
                    <CustomInput
                        placeholder="Напишите..."
                        width={272}
                        change={changeInput}
                        name="name"
                        value={dataInputCompanies.name}
                        trim={allData || err ? dataInputCompanies.name : true}
                    />
                </div>
                <div>
                    <label htmlFor="">Страна</label>
                    <CustomInput
                        placeholder="Напишите..."
                        width={272}
                        change={changeInput}
                        name="country"
                        value={dataInputCompanies.country}
                        trim={allData || err ? dataInputCompanies.country : true}
                    />
                </div>
            </div>
            <div className={styles.blockTwo}>
                <div>
                    <label htmlFor="">Краткий код</label>
                    <div className={styles.lamp}>
                        <CustomInput
                            placeholder="Ввести код "
                            width={272}
                            change={changeInput}
                            name="company_code"
                            value={dataInputCompanies.company_code}
                            maxLength={3}
                            trim={allData || err ? dataInputCompanies.company_code : true}
                        />
                        <div
                            className={styles.lampCursor}
                            onClick={async () => {
                                const respose = await lamp(dataInputCompanies.name);
                                if (typeof respose === "string") {
                                    company_code(respose);
                                }
                            }}
                        >
                            <LampOn
                                variant="Bold"
                                color="#1c6ab1"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Домен</label>
                    <CustomInput
                        placeholder="Напишите..."
                        width={272}
                        name="domain"
                        change={changeInput}
                        value={dataInputCompanies.domain}
                        trim={allData || err ? dataInputCompanies.domain : true}
                    />
                </div>
            </div>
            <div className={styles.blockTwo}>
                <div>
                    <label htmlFor="sel">Ответственный менеджер</label>
                    <br />

                    <div className={styles.managers}>
                        <div className={styles.addedManeger}>
                            <input
                                value={companyManagerState}
                                onChange={companyManagerChange}
                                placeholder="Введите имя пользователя"
                                type="text"
                                className={styles.searchInput}
                                style={{
                                    border: `${err ? "2px solid #E51616" : "none"}`,
                                    color: `${err ? "#E51616" : "black"}`,
                                    width: `${adaptive(478, window)}px`,
                                }}
                            />
                            <div
                                style={{
                                    display: `${companyManagerState ? "block" : "none"}`,
                                    width: `${adaptive(478, window)}px`,
                                }}
                                className={styles.allManagers}
                            >
                                {searchCompanyManagersList.map((manager) => (
                                    <div
                                        key={manager}
                                        onClick={() => {
                                            setCompanyManagerState(manager);
                                            const id = allUsersList.find((user) => user.full_name === manager);
                                            if (id) {
                                                addMainManager(id.id);
                                                addManagers(id.id);
                                            }
                                        }}
                                        className={styles.manager}
                                    >
                                        {manager}{" "}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className={styles.addManagers}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            onClick={() => setAddManagerModal(true)}
                        >
                            <div
                                className={styles.hintAdd}
                                style={{ display: `${hovered ? "block" : "none"}` }}
                            >
                                <p className={styles.hint}>Нажмите что бы добавить менеджера</p>
                                <div className={styles.tre}> </div>
                            </div>
                            <AddSquare color="white" />
                        </div>
                    </div>
                </div>
            </div>
            <p
                className={styles.info}
                style={{ display: `${allData ? "block" : "none"}` }}
            >
                Все поля должны быть обязательно заполнены*
            </p>
            <p
                className={styles.info}
                style={{ display: `${err ? "block" : "none"}` }}
            >
                Такого менеджера не существует! Повторите попытку или создайте нового менеджера!
            </p>
            <div
                className={styles.buttons}
                style={{ width: `${adaptive(560, window)}px` }}
            >
                <div onClick={closeCreateModal}>
                    <CustomButton
                        variant="Without"
                        width={150}
                        text="Отменить"
                        onClick={() => {
                            resetInput();
                            setAllData(false);
                            setErr(false);
                        }}
                    />
                </div>
                <div>
                    <CustomButton
                        variant="Primary"
                        width={150}
                        text="Создать"
                        onClick={addNewCompany}
                    />
                </div>
            </div>
            <Modal
                open={addManagerModal}
                onCancel={() => setAddManagerModal(false)}
                width={w >= 1820 ? 500 : 376}
                centered
            >
                <AddManager
                    forWhat="createCompany"
                    setManagerModal={setAddManagerModal}
                />
            </Modal>
        </div>
    );
};
