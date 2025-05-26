import { profileApi } from "@/shared/api";
import styles from "./AdminPage.module.scss";
import { Dashboard, Administration, Loading } from "@/widgets";
import { useDataStoreComponies } from "@/widgets/Companies/api/componiesApi";
import { FC, useEffect } from "react";
import { id, role_type } from "@/shared/variables";

export const AdminPage: FC = () => {
    const { getAdminContacts, getUserProfile } = profileApi();
    const { fetchDatas } = useDataStoreComponies();
    useEffect(() => {
        fetchDatas(1);
        if (role_type === "") {
            getAdminContacts();
        }
        id !== null && getUserProfile(id);
    }, []);
    return (
        <div className={styles.AdminPage}>
            <Loading/>
            <Dashboard />
            <Administration />
        </div>
    );
};
