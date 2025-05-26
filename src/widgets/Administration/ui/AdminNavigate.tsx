import { FC, useEffect } from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Companies, Users, JobTitles, Roles } from "@/widgets";
import { role_type } from "@/shared/variables";
import { permissionsApi } from "@/shared/api";

export const AdminNavigate: FC = () => {
    const { getUsersPermissions, formateState, permissionsState, formatedState } =
        permissionsApi();
    useEffect(() => {
        if (role_type !== "") {
            getUsersPermissions();
        }
    }, []);
    useEffect(() => {
        formateState();
    }, [permissionsState]);

    const items: TabsProps["items"] = [
        ...(role_type === "" || (role_type === "manager" && formatedState?.manager_can_create_and_edit_company_extra)
            ? [
                  {
                      key: "1",
                      label: "Компании",
                      children: <Companies />,
                  },
              ]
            : []),
        ...(role_type === "" || (role_type === "manager" && formatedState?.manager_can_create_and_edit_user_extra)
            ? [
                  {
                      key: "2",
                      label: "Пользователи",
                      children: <Users />,
                  },
              ]
            : []),
        ...(role_type === "" ||
        (role_type === "manager" && formatedState?.manager_can_create_and_delete_job_title_extra)
            ? [
                  {
                      key: "3",
                      label: "Должности",
                      children: <JobTitles />,
                  },
              ]
            : []),
        ...(role_type === ""
            ? [
                  {
                      key: "4",
                      label: "Тип роли",
                      children: <Roles />,
                  },
              ]
            : []),
    ];
    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        itemColor: "#252525",
                        itemHoverColor: "#1C6AD2",
                        itemSelectedColor: "#1C6AB1",
                        fontFamily: "Geologica",
                        fontSize: 24,
                    },
                },
            }}
        >
            <Tabs
                defaultActiveKey="1"
                items={items}
                tabBarStyle={{
                    fontWeight: 700,
                    marginLeft: "2%",
                }}
            />
        </ConfigProvider>
    );
};
