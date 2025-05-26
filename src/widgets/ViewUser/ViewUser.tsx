import { FC, useState } from "react";
import styles from "./ViewUser.module.scss";
import { IViewUser } from "./types/types";
import { CloseSquare } from "iconsax-react";
import { Modal } from "antd";
import { EditUser } from "../EditUser/EditUser";
import { deleteUserApi } from "../EditUser/api/deleteUserApi";
import { CustomMoreSquare } from "@/shared/ui";
import { ReadyModal } from "../ReadyModal/ReadyModal";
import { oneUserApi, successNotifApi } from "@/shared/api";
import { useMediaQuery } from "@/shared/hooks";
import { loadingStatus } from "../Loading/api/loadingStatus";

export const ViewUser: FC<IViewUser> = (props) => {
    const { view, setView } = props;
    const [modal, setModal] = useState<boolean>(false);
    const [readyModal, setReadyModal] = useState<boolean>(false);
    const { deleteUser } = deleteUserApi();
    const { oneUserState } = oneUserApi();
    const { setState } = successNotifApi();
    const {setStatus} = loadingStatus()
    const deleteFunc = () => {
        setStatus("norm")
        deleteUser(oneUserState.id);
        setState(`Пользователь “${oneUserState.first_name} ${oneUserState.surname}” был удален!`);
        setReadyModal(false);
        setView(false);
    };
    const w = useMediaQuery();
    return (
        <div
            style={{ display: view ? "flex" : "none" }}
            className={styles.ViewUser}
        >
            <div className={styles.Top}>
                <div className={styles.TopLeft}>
                    {!oneUserState.image ?
                        <div className={styles.defoltAvatar}>
                            <p>{oneUserState.first_name?.slice(0, 1) + oneUserState.surname?.slice(0, 1)}</p>
                        </div>
                        :
                        <img
                            src={oneUserState.image}
                            alt="image"
                        />
                    }

                    <p>
                        {oneUserState.first_name} {oneUserState.surname}
                    </p>
                </div>
                <div className={styles.TopRight}>
                    <CustomMoreSquare variant="Primary">
                        <button onClick={() => setModal(true)}>Редактировать</button>
                        <button onClick={() => setReadyModal(true)}>Удалить</button>
                    </CustomMoreSquare>
                    <CloseSquare
                        size={w > 1820 ? 34 : 26}
                        onClick={() => setView(false)}
                        cursor={"pointer"}
                    />
                </div>
            </div>
            <div className={styles.Bottom}>
                <div className={styles.Name}>
                    <p>Роль:</p>
                    <p>Должность:</p>
                    <p>Логин:</p>
                    <p>Компания:</p>
                </div>
                <div className={styles.Data}>
                    <p>{oneUserState.role_type}</p>
                    <p>{oneUserState.job_title}</p>
                    <p>{oneUserState.username}</p>
                    {/* {w >= 1820 ? (
                        <div>
                            <p>{oneUserState.username.slice(0, 23)}</p>
                            {oneUserState.username.length > 23 && (
                                <p>{oneUserState.username.slice(23, oneUserState.username.length)}</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <p>{oneUserState.username.slice(0, 13)}</p>
                            {oneUserState.username.length > 13 && (
                                <div>
                                    <p>{oneUserState.username.slice(13, 26)}</p>
                                    <p>{oneUserState.username.slice(26, oneUserState.username.length)}</p>
                                </div>
                            )}
                        </div>
                    )} */}
                    <p>{oneUserState.main_company}</p>
                </div>
            </div>
            <Modal
                centered
                width={w > 1820 ? 700 : 532}
                open={modal}
                onCancel={() => setModal(false)}
                zIndex={6}
            >
                <EditUser setModal={setModal} />
            </Modal>
            <Modal
                centered
                open={readyModal}
                onCancel={() => setReadyModal(false)}
            >
                <ReadyModal
                    yes={deleteFunc}
                    no={() => setReadyModal(false)}
                >
                    <div>
                        <p>Вы уверены?</p>
                        <p>Пользователь будет удален безвозвратно!</p>
                    </div>
                </ReadyModal>
            </Modal>
        </div>
    );
};
