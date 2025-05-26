import { FC } from "react";
import { ListTop, ListTopName } from "@/shared/ui";
import { useMediaQuery } from "@/shared/hooks";

interface IRequestTop {
    isAdminManager: boolean;
    view: boolean;
}

export const RequestTop: FC<IRequestTop> = (props) => {
    const { isAdminManager, view } = props;
    const w = useMediaQuery();
    const proc = w / 100;
    return (
        <ListTop
            width={
                isAdminManager
                    ? w > 1900
                        ? view
                            ? 1012
                            : 1724
                        : view
                          ? proc * 52
                          : proc * 89
                    : w > 1900
                      ? view
                          ? 1152
                          : 1820
                      : view
                        ? proc * 54
                        : proc * 92
            }
        >
            <ListTopName
                name={view ? "Номе..." : "Номер заявки"}
                id="task_number"
                width={isAdminManager ? (view ? 98.28 : 169) : view ? 113.83 : 180}
            />
            <ListTopName
                name={view ? "Комп..." : "Компания"}
                id="company"
                width={isAdminManager ? (view ? 98.28 : 138) : view ? 113.83 : 150}
            />
            <ListTopName
                name={view ? "Назв..." : "Название заявки"}
                id="title"
                width={isAdminManager ? (view ? 98.28 : 249) : view ? 113.83 : 260}
            />
            <ListTopName
                name={view ? "Краткое..." : "Краткое описание"}
                id="short_description"
                width={isAdminManager ? (view ? 127.5 : 230) : view ? 127.5 : 220}
            />
            <ListTopName
                name={view ? "Заяв..." : "Заявитель"}
                id="main_client"
                width={isAdminManager ? (view ? 98.28 : 142) : view ? 113.83 : 160}
            />
            <ListTopName
                name={view ? "Мене..." : "Менеджер"}
                id="main_manager"
                width={isAdminManager ? (view ? 98.28 : 188) : view ? 113.83 : 200}
            />
            <ListTopName
                name={view ? "Дата..." : "Дата начала"}
                id="start_date"
                width={isAdminManager ? (view ? 98.28 : 164) : view ? 113.83 : 180}
            />
            <ListTopName
                name={view ? "Дата..." : "Дата завершения"}
                id="finish_date"
                width={isAdminManager ? (view ? 98.28 : 194) : view ? 113.83 : 180}
            />
            <ListTopName
                name={view ? "Прио..." : "Приоритет"}
                id="priority"
                width={isAdminManager ? (view ? 98.28 : 125) : view ? 113.83 : 145}
            />
            <ListTopName
                name="Статус"
                id="status"
                width={isAdminManager ? (view ? 98.28 : 125) : view ? 113.83 : 145}
            />
        </ListTop>
    );
};
