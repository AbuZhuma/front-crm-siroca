import { Collapse, CollapseProps } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Comments, Date, Description, Details, LinkJira, RequestLogs, People, ShortDescription } from "..";
import { AddSquare, Maximize4 } from "iconsax-react";
import { CheckLists } from "@/features";
import { ExpandIcon } from "@/shared/ui";
import { createChecklistApi } from "@/widgets/CreateChecklist/api/createChecklistApi";
import { role_type } from "@/shared/variables";
import { permissionsApi } from "@/shared/api";

interface ICollapses {
    setViewLogs: Dispatch<SetStateAction<boolean>>;
    setChecklistModal: Dispatch<SetStateAction<boolean>>;
}

export const Collapses: FC<ICollapses> = (props) => {
    const { setViewLogs, setChecklistModal } = props;
    const { resetOneChecklist } = createChecklistApi();
    const openChecklistModal = (e: { stopPropagation: () => void }) => {
        resetOneChecklist();
        setChecklistModal(true);
        e.stopPropagation();
    };
    const { permissionsState, formateState, formatedState } = permissionsApi();
    useEffect(() => {
        if (role_type !== "") {
            formateState();
        }
    }, [permissionsState]);

    const items: CollapseProps["items"] = [
        ...(role_type === "" ||
        role_type === "manager" ||
        (role_type === "client" && formatedState?.client_can_view_logs_extra)
            ? [
                  {
                      key: "1",
                      label: "Logs",
                      children: <RequestLogs />,
                      extra: (
                          <Maximize4
                              onClick={() => setViewLogs(true)}
                              size={24}
                              style={{ marginTop: "6px", marginRight: "6px" }}
                          />
                      ),
                  },
              ]
            : []),
        {
            key: "2",
            id: "Details",
            label: "Детали заявки",
            children: <Details />,
        },
        {
            key: "3",
            id: "JiraLink",
            label: "Ссылка на Jira",
            children: <LinkJira />,
        },
        {
            key: "4",
            label: "Люди",
            children: <People />,
        },
        {
            key: "5",
            label: "Даты",
            children: <Date />,
        },
        {
            key: "6",
            id: "Description",
            label: "Описание",
            children: <Description />,
        },
        {
            key: "7",
            label: "Краткое описание",
            children: <ShortDescription />,
        },
        {
            key: "8",
            id: "Comments",
            label: "Комментарии",
            children: <Comments />,
        },
        ...((role_type === "client" && formatedState?.client_can_add_checklist_extra) ||
        role_type === "" ||
        role_type === "manager"
            ? [
                  {
                      key: "9",
                      id: "Checklists",
                      label: "Чек-листы",
                      children: <CheckLists />,
                      extra: <AddSquare onClick={(e) => openChecklistModal(e)} />,
                  },
              ]
            : []),
    ];
    return (
        <Collapse
            ghost
            expandIcon={({ isActive }) => <ExpandIcon isActive={isActive} />}
            defaultActiveKey={[2, 3, 4, 5, 6, 7, 8, 9]}
            items={items}
        />
    );
};
