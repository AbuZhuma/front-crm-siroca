import { FC, useState } from "react";
import styles from "./OneSubtask.module.scss";
import { CustomCheckBox, CustomMoreSquare } from "@/shared/ui";
import { Timer1 } from "iconsax-react";
import { CreateSubTask } from "../../CreateSubTask/CreateSubTask";
import { Modal } from "antd";
import { AddManager } from "@/widgets";
import { allUsersListApi, getOneRequestApi } from "@/shared/api";
import { putSubtaskApi } from "@/features/CheckLists/api/putSubtaskApi";
import { ISubtask } from "@/shared/types";
import { useMediaQuery } from "@/shared/hooks";

export const OneSubtask: FC<{ subtask: ISubtask }> = ({ subtask }) => {
    const screen = useMediaQuery()
    const [editState, setEditState] = useState<boolean>(false);
    const [managerModal, setManagerModal] = useState<boolean>(false);
    const { deleteSubtask, setSubtaskCompleted, setPutSubtaskState, putSubtaskChange, putSubtask } = putSubtaskApi();
    const { setSubtaskCompletedFromOneRequest, deleteSubtaskFromOneRequest, editSubtaskInOneRequest } =
        getOneRequestApi();
    const { allUsersNamesList } = allUsersListApi();
    const completeFunc = () => {
        setSubtaskCompleted(subtask);
        setSubtaskCompletedFromOneRequest(subtask.id);
    };
    const deleteFunc = () => {
        deleteSubtask(subtask.id);
        deleteSubtaskFromOneRequest(subtask.id);
    };
    const editFunc = () => {
        setEditState(true);
    };
    const highlightUsernames = (text: string) => {
        const usersPattern = allUsersNamesList.map((user) => `@${user}`).join("|");
        const regex = new RegExp(`(${usersPattern})`, "gi");

        return text.split(regex).map((part, index) => {
            if (regex.test(part)) {
                return (
                    <span
                        key={index}
                        className={styles.Highlight}
                    >
                        {part}
                    </span>
                );
            }
            return part;
        });
    };
    const managersSplited = subtask.manager?.split(" ");
    return editState === false ? (
        <div className={styles.OneSubtask}>
            <CustomCheckBox
                checked={subtask.completed}
                onClick={completeFunc}
            />
            <div
                onClick={editFunc}
                className={styles.Main}
            >
                <div className={styles.Text}>{highlightUsernames(subtask.text)}</div>
                <div className={styles.Right}>
                    <span>
                        {managersSplited?.[0]} {managersSplited?.[1].slice(0, 1)}.
                    </span>
                    {subtask.deadline && subtask.deadline !== null && (
                        <div>
                            <Timer1 />
                            <p>{subtask.deadline}</p>
                        </div>
                    )}
                </div>
            </div>
            <CustomMoreSquare variant="Secondary">
                <button
                    type="button"
                    onClick={editFunc}
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    onClick={() => setManagerModal(true)}
                >
                    Назначить
                </button>
                <button
                    type="button"
                    onClick={deleteFunc}
                >
                    Удалить
                </button>
            </CustomMoreSquare>
            <Modal
                width={screen > 1820 ? 520 : 400}
                open={managerModal}
                centered
                onCancel={() => setManagerModal(false)}
            >
                <AddManager
                    forWhat="editSubtask"
                    oneSubtask={subtask}
                    setManagerModal={setManagerModal}
                />
            </Modal>
        </div>
    ) : (
        <CreateSubTask
            subtaskState={subtask}
            setSubtask={setPutSubtaskState}
            subtaskChange={putSubtaskChange}
            addFunc={putSubtask}
            addToRequest={editSubtaskInOneRequest}
            forWhat="Сохранить"
            checklistId={Number(subtask.id)}
            setDisplay={setEditState}
        />
    );
};
