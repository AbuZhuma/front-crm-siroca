import { FC, useState } from "react";
import styles from "./Users.module.scss";
import { ButtonCreate, SearchInput } from "@/shared/ui";
import { Modal } from "antd";
import { CreateUser } from "@/widgets";
import { UsersList } from "./ui";
import { allCompaniesListApi, usersListApi } from "@/shared/api";
import { postUserApi } from "../CreateUser/api/postUserApi";
import { useMediaQuery } from "@/shared/hooks";

export const Users: FC = () => {
    const [modal, setModal] = useState<boolean>(false);
    const { resetPostUserState } = postUserApi();
    const { getUsersList, searchUsersList } = usersListApi();
    const { setCompanyInputState } = allCompaniesListApi();
    const closeUserModal = () => {
        setCompanyInputState("");
        resetPostUserState();
        setModal(false);
    };
    const w = useMediaQuery();
    return (
        <div className={styles.Users}>
            <div className={styles.UsersSearch}>
                <div className={styles.Name}>Поиск по пользователям</div>
                <div className={styles.Search}>
                    <SearchInput
                        closeFunc={() => getUsersList(1)}
                        onKeyDown={searchUsersList}
                    />
                    <ButtonCreate
                        name="Создать пользователя"
                        onClick={() => setModal(true)}
                    />
                </div>
            </div>
            <UsersList />
            <Modal
                centered
                width={w > 1820 ? 700 : 532}
                open={modal}
                onCancel={closeUserModal}
                zIndex={5}
            >
                <CreateUser setModal={setModal} />
            </Modal>
        </div>
    );
};
