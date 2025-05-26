import { Modal } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { AddManager, UserForSubtask } from "@/widgets";
import { allUsersListApi } from "@/shared/api";
import { useMediaQuery } from "@/shared/hooks";
import { ISubtask } from "@/shared/types";

interface ICreateSubTaskModals {
    forWhat: "Добавить" | "Сохранить";
    subtaskState: ISubtask;
    managerModal: boolean;
    setManagerModal: Dispatch<SetStateAction<boolean>>;
    userModal: boolean;
    setUserModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateSubtaskModals: FC<ICreateSubTaskModals> = (props) => {
    const { forWhat, managerModal, setManagerModal, userModal, setUserModal, subtaskState } = props;
    const { setUserInputState, setManagerInputState } = allUsersListApi();
    const closeManagerModal = () => {
        setManagerModal(false);
        setManagerInputState("");
    };
    const closeUserModal = () => {
        setUserModal(false);
        setUserInputState("");
    };
    const screen = useMediaQuery();
    return (
        <>
            <Modal
                width={screen >= 1820 ? 500 : 376}
                centered
                open={managerModal}
                onCancel={closeManagerModal}
            >
                <AddManager
                    oneSubtask={subtaskState}
                    forWhat={forWhat === "Добавить" ? "createSubtask" : "editSubtask"}
                    setManagerModal={setManagerModal}
                />
            </Modal>
            <Modal
                centered
                open={userModal}
                onCancel={closeUserModal}
            >
                <UserForSubtask setUserModal={setUserModal} />
            </Modal>
        </>
    );
};
