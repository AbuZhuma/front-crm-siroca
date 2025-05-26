import { Collapse, CollapseProps } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { Comments, DatesContainer, Description, Details, People, LinkJira, ShortDescription } from "..";
import { AddSquare } from "iconsax-react";
import { CheckLists } from "@/features";
import { ExpandIcon } from "@/shared/ui";
import { createChecklistApi } from "@/widgets/CreateChecklist/api/createChecklistApi";
import { role_type } from "@/shared/variables";
import { permissionsApi } from "@/shared/api";

interface ICollapses {
    setChecklistModal: Dispatch<SetStateAction<boolean>>;
}

export const Collapses: FC<ICollapses> = ({ setChecklistModal }) => {
    const { formatedState } = permissionsApi();
    const { resetOneChecklist } = createChecklistApi();
    const openChecklistModal = (e: { stopPropagation: () => void }) => {
        resetOneChecklist();
        setChecklistModal(true);
        e.stopPropagation();
    };
    const items: CollapseProps["items"] = [
        {
            key: "1",
            label: "Детали заявки",
            children: <Details />,
        },
        {
            key: "2",
            label: "Ссылка на Jira",
            children: <LinkJira />,
        },
        {
            key: "3",
            label: "Люди",
            children: <People />,
        },
        {
            key: "4",
            label: "Даты",
            children: <DatesContainer />,
        },
        {
            key: "5",
            label: "Описание",
            children: <Description />,
        },
        {
            key: "6",
            label: "Краткое описание",
            children: <ShortDescription />,
        },
        ...((role_type === "client" && formatedState?.client_can_edit_comments_extra) ||
        role_type === "manager" ||
        role_type === ""
            ? [
                  {
                      key: "7",
                      label: "Комментарии",
                      children: <Comments />,
                  },
              ]
            : []),

        ...((role_type === "client" && formatedState?.client_can_add_checklist_extra) ||
        role_type === "manager" ||
        role_type === ""
            ? [
                  {
                      key: "8",
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
            defaultActiveKey={[1, 2, 3, 4, 5, 6, 7, 8]}
            items={items}
        />
    );
};
