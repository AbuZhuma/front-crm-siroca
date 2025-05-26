import { ListTop, ListTopName } from "@/shared/ui";

export const CompaniesTop = () => {
    return (
        <ListTop width={1718}>
            <ListTopName
                name="Компания"
                width={206}
            />
            <ListTopName
                name="Страна компании"
                width={210}
            />
            <ListTopName
                name="Количество пользователей"
                width={306}
            />
            <ListTopName
                name="Количество заявок"
                width={286}
            />
            <ListTopName
                name="Менеджер"
                width={208}
            />
            <ListTopName
                name="Дата создание"
                width={206}
            />
            <ListTopName
                name="Крайний редактирование"
                width={296}
            />
        </ListTop>
    );
};
