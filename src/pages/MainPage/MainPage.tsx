import { Dashboard, Header } from "@/widgets";
import { FC, useEffect } from "react";
import { permissionsApi, profileApi } from "@/shared/api";
import { id, role_type } from "@/shared/variables";
import { Loading } from "@/widgets";

export const MainPage: FC = () => {
    const { getUsersPermissions, formateState, formatedState, permissionsState } =
        permissionsApi();
    const { getAdminContacts, getUserProfile } = profileApi();
    useEffect(() => {
        if (role_type !== "") {
            getUsersPermissions();
        }
        if (role_type === "") {
            getAdminContacts();
        }
        id !== null && getUserProfile(id);
    }, []);
    useEffect(() => {
        if (role_type !== "") {
            formateState();
        }
    }, [permissionsState]);

    const render = () => {
        if (
            (formatedState && formatedState.manager_can_create_and_edit_user_extra) ||
            (formatedState && formatedState.manager_can_create_and_edit_company_extra) ||
            (formatedState && formatedState.manager_can_create_and_delete_job_title_extra) ||
            role_type === ""
        ) {
            return (
                <>
                    <Loading />
                    <Dashboard />
                    <Header isAdminManager={true} />
                </>
            );
        } else {
            return (
                <>
                    <Loading />
                    <Header isAdminManager={false} />
                </>
            );
        }
    };
    return <div>{render()}</div>;
};
