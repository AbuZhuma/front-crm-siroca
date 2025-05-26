import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, PATHS, authToken } from "@/shared/variables";
import RolesList from "./components/rolesMenu/RolesList";
import styles from "./Roles.module.scss";
import { CustomButton } from "@/shared/ui";
import { loadingStatus } from "../Loading/api/loadingStatus";

interface PermissionData {
    [key: string]: boolean;
}

interface IRoles {}

export const Roles: React.FC<IRoles> = () => {
    const [boxesClient, setBoxesClient] = useState<PermissionData | undefined>();
    const [boxesManeger, setBoxesManeger] = useState<PermissionData | undefined>();
    const ClientList: string[] = [
        "Добавление/удаление комментариев к заявке",
        "Скачивание отчёта",
        "Просмотр истории изменений по заявке “Logs”",
        "Добавление/удаление файлов к заявке",
        "Добавление чек-листа к заявке",
    ];

    const ManegerList: string[] = ["Удаление комментариев пользователей", "Скачивание отчёта", "Удаление заявки"];

    //just get all roles general
    const get = async () => {
        try {
            const responseClients = await axios.get(`${BASE_URL}/users/clientpermissions/general`, authToken);
            const responseManeger = await axios.get(`${BASE_URL}/users/managerpermissions/general/`, authToken);
            setBoxesClient(responseClients.data);
            setBoxesManeger(responseManeger.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        get();
    }, []);

    //there im add al selects to they key
    const getCheckBoxVal = (e: [string, React.ChangeEvent<HTMLInputElement>]) => {
        //just checking is this client or manager
        if (e[0] === "Клиент") {
            const arr = Object.entries(boxesClient || {}).map((el) => {
                if (el[0] === e[1].target.name) {
                    return [el[0], !el[1]];
                } else {
                    return el;
                }
            });
            setBoxesClient(Object.fromEntries(arr));
        } else if (e[0] === "Менеджер") {
            const arr = Object.entries(boxesManeger || {}).map((el) => {
                if (el[0] === e[1].target.name) {
                    return [el[0], !el[1]];
                } else {
                    return el;
                }
            });
            setBoxesManeger(Object.fromEntries(arr));
        }
    };
    const {setStatus} = loadingStatus()
    //there im doing put req to save all changed roles
    const onSave = async () => {
        try {
            await setStatus("norm")
            const responseClient = await axios.put(
                `${BASE_URL}/users/clientpermissions/general/`,
                boxesClient,
                authToken,
            );
            const responseManeger = await axios.put(
                `${BASE_URL}/users/managerpermissions/general/`,
                boxesManeger,
                authToken,
            );
            console.log(responseClient, responseManeger);
        } catch (error) {
            console.log(error);
        }
    };

    //just navigate
    const navigate = useNavigate();
    return (
        <div className={styles.MenuCont}>
            <div className={styles.ListCont}>
                <div className={styles.ListBlock}>
                    <RolesList
                        listType="Клиент"
                        list={ClientList}
                        box={boxesClient || null}
                        handleChangeBox={getCheckBoxVal}
                    />
                    <CustomButton
                        variant="Primary"
                        text="Сохранить"
                        width={130}
                        onClick={onSave}
                    />
                </div>
                <div className={styles.ListBlock}>
                    <RolesList
                        listType="Менеджер"
                        list={ManegerList}
                        box={boxesManeger || null}
                        handleChangeBox={getCheckBoxVal}
                    />
                </div>
            </div>
            <CustomButton
                variant="Primary"
                text="Расширенные настройки"
                width={261}
                onClick={() => navigate(PATHS.rolessettings)}
            />
        </div>
    );
};
