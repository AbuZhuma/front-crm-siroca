import { FC } from "react";
import styles from "./User.module.scss";
import { ItemInner } from "@/shared/ui";
import { IUserTypes } from "./types/types";
import { oneUserApi, permissionsApi } from "@/shared/api";
import { useMediaQuery } from "@/shared/hooks";
import { adaptive } from "@/shared/hooks/adaptive/adaptive";
import { role_type } from "@/shared/variables";

export const User: FC<IUserTypes> = (props) => {
    const { user, setView, view } = props;
    const { formatedState } = permissionsApi();
    const { getOneUser } = oneUserApi();
    const window = useMediaQuery();
    return (
        <div
            onClick={
                (formatedState && formatedState.manager_can_view_profiles_extra && role_type === "manager") ||
                role_type === ""
                    ? () => {
                          setView(true);
                          getOneUser(user.id);
                      }
                    : () => console.log("no roles")
            }
            className={styles.User}
            style={{ width: view ? `${adaptive(1221, window)}px` : `${adaptive(1718, window)}px` }}
        >
            <ItemInner
                wordMaxLegth={view ? 10 : 20}
                content={user.full_name}
                width={view ? adaptive(244, window) : adaptive(318, window)}
            />
            <ItemInner
                wordMaxLegth={view ? 10 : 34}
                content={user.username}
                width={view ? adaptive(244, window) : adaptive(350, window)}
            />
            <ItemInner
                wordMaxLegth={view ? 10 : 20}
                content={user.job_title}
                width={view ? adaptive(244, window) : adaptive(350, window)}
            />
            <ItemInner
                wordMaxLegth={view ? 10 : 15}
                content={user.role_type === "manager" ? "Менеджер" : user.role_type === "client" ? "Клиент" : "Админ"}
                width={view ? adaptive(244, window) : adaptive(350, window)}
            />
            <ItemInner
                wordMaxLegth={view ? 10 : 17}
                content={user.main_company}
                width={view ? adaptive(244, window) : adaptive(350, window)}
            />
        </div>
    );
};
