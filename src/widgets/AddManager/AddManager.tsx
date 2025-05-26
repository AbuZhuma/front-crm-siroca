import styles from "./AddManager.module.scss";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { CloseSquare } from "iconsax-react";
import { CustomButton } from "@/shared/ui";
import { allUsersListApi, getOneRequestApi } from "@/shared/api";
import { useDataStoreComponies } from "@/widgets/Companies/api/componiesApi";
import { useDataInputCompaniesStore } from "../EditCompany/api/dataInputCompanies";
import { useMediaQuery } from "@/shared/hooks";
import { ISubtask } from "@/shared/types";
import { putSubtaskApi } from "@/features/CheckLists/api/putSubtaskApi";
import { postSubtaskApi } from "@/features/CheckLists/api/postSubtaskApi";

interface IAddManager {
    forWhat: "createSubtask" | "editSubtask" | "createCompany" | "changeCompany";
    oneSubtask?: ISubtask;
    setModalOpened?: Dispatch<SetStateAction<boolean>>;
    setManagerModal: Dispatch<SetStateAction<boolean>>;
}

export const AddManager: FC<IAddManager> = (props) => {
    const { setManagerModal, forWhat, oneSubtask, setModalOpened } = props;
    const { addManagerToPostSubtask } = postSubtaskApi();
    const { putSubtask, setPutSubtaskState } = putSubtaskApi();
    const { addManager } = useDataInputCompaniesStore();
    const { addedNewManagers } = useDataStoreComponies();
    const { editSubtaskInOneRequest } = getOneRequestApi();
    const {
        allUsersList,
        managerInputState,
        setManagerInputState,
        managerExists,
        managerInputChange,
        setManagerExists,
        searchManagersNamesList,
    } = allUsersListApi();
    const postTrim = () => {
        if (managerExists === true) {
            if (forWhat === "createSubtask") {
                addManagerToPostSubtask(managerInputState);
            } else if (forWhat === "editSubtask" && oneSubtask) {
                setPutSubtaskState({ ...oneSubtask, manager: managerInputState });
                editSubtaskInOneRequest({ ...oneSubtask, manager: managerInputState });
                putSubtask();
            } else if (forWhat === "createCompany") {
                const managerId = allUsersList.find((user) => user.full_name === managerInputState);
                if (managerId) {
                    addManager(managerId.id);
                }
                setModalOpened && setModalOpened(false);
            } else if (forWhat === "changeCompany") {
                const managerId = allUsersList.find((user) => user.full_name === managerInputState);
                if (managerId) {
                    addedNewManagers(managerId.id);
                }
            }
            setManagerInputState("");
            setManagerModal(false);
        } else {
            setManagerExists(false);
        }
    };
    const closeFunc = () => {
        setManagerInputState("");
        setManagerModal(false);
    };
    useEffect(() => {
        setManagerInputState("");
    }, []);
    const w = useMediaQuery();
    return (
        <div className={styles.ManagerForSubtask}>
            <div className={styles.Main}>
                <div className={styles.Header}>
                    <p>
                        {forWhat === "createCompany" || forWhat === "editSubtask"
                            ? "Добавить менеджера"
                            : "Назначить менеджера"}
                    </p>
                    <CloseSquare
                        cursor={"pointer"}
                        onClick={closeFunc}
                    />
                </div>
                <div className={styles.SelectManager}>
                    <div>
                        <input
                            className={
                                managerInputState === "" || managerExists
                                    ? styles.FirstInput
                                    : searchManagersNamesList.length === 0 && managerExists === false
                                      ? styles.NotExist
                                      : styles.SecondInput
                            }
                            type="text"
                            placeholder="Введите имя пользователя..."
                            value={managerInputState}
                            onChange={managerInputChange}
                        />
                        {managerInputState !== "" && (
                            <>
                                {searchManagersNamesList.map((manager, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setManagerInputState(manager)}
                                    >
                                        {manager}
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                    {managerInputState !== "" && managerExists === false && searchManagersNamesList.length === 0 && (
                        <div className={styles.NotExistText}>
                            Данного пользователя не существует! Повторите попытку.
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.Buttons}>
                <CustomButton
                    variant="Without"
                    width={w >= 1820 ? 101 : 93}
                    text="Отмена"
                    onClick={closeFunc}
                />
                <CustomButton
                    variant="Primary"
                    text="Добавить"
                    width={w >= 1820 ? 121 : 113}
                    onClick={postTrim}
                />
            </div>
        </div>
    );
};
