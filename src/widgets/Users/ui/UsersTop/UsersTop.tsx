import { FC } from "react";
import { ListTop, ListTopName } from "@/shared/ui";
import { useMediaQuery } from "@/shared/hooks";
import { adaptive } from "@/shared/hooks/adaptive/adaptive";

export const UsersTop: FC<{ view: boolean }> = ({ view }) => {
    const window = useMediaQuery();

    return (
        <ListTop width={view ? adaptive(1221, window) : adaptive(1718, window)}>
            <ListTopName
                name="Ф.И пользователя"
                width={view ? adaptive(244, window) : adaptive(318, window)}
            />
            <ListTopName
                name="Логин"
                width={view ? adaptive(244, window) : adaptive(350, window)}
            />
            <ListTopName
                name="Должность в компании"
                width={view ? adaptive(244, window) : adaptive(350, window)}
            />
            <ListTopName
                name="Тип роли пользователя"
                width={view ? adaptive(244, window) : adaptive(350, window)}
            />
            <ListTopName
                name="Название компании"
                width={view ? adaptive(244, window) : adaptive(350, window)}
            />
        </ListTop>
    );
};
