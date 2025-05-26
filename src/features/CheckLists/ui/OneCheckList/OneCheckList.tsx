import styles from "./OneCheckList.module.scss";
import { TickSquare } from "iconsax-react";
import { FC, useState } from "react";
import { deleteCheckListApi } from "../../api/deleteCheckListApi";
import { CreateSubTask } from "../CreateSubTask/CreateSubTask";
import { CustomButton } from "@/shared/ui";
import { OneSubtask } from "./ui/OneSubtask";
import { postSubtaskApi } from "../../api/postSubtaskApi";
import { IChecklist } from "@/shared/types";
import { getOneRequestApi } from "@/shared/api";

export const OneCheckList: FC<{ checklist: IChecklist }> = ({ checklist }) => {
    const { deleteChecklistFromChecklists, setSubtaskToOneRequest } = getOneRequestApi();
    const { deleteCheckList } = deleteCheckListApi();
    const [createDisplay, setCreateDisplay] = useState<boolean>(false);
    const { postSubtaskState, postSubtaskChange, setPostSubtaskState, postSubTask } = postSubtaskApi();
    const deleteFunc = () => {
        deleteCheckList(checklist.id);
        deleteChecklistFromChecklists(checklist.id);
    };
    const completedPercent = () => {
        const completedArray = [];
        checklist.subtasks?.map((subtask) => {
            subtask.completed && completedArray.push(subtask);
        });
        const percent = checklist.subtasks && (completedArray.length / checklist.subtasks?.length) * 100;
        return percent?.toFixed(0);
    };
    return (
        <div className={styles.OneCheckList}>
            <div className={styles.SubTaskList}>
                <div className={styles.Header}>
                    <div className={styles.HeaderLeft}>
                        <TickSquare />
                        {checklist.name}
                    </div>
                    <button
                        type="button"
                        onClick={deleteFunc}
                    >
                        Удалить
                    </button>
                </div>
                {checklist.subtasks && checklist.subtasks.length > 0 && (
                    <div className={styles.CompletedPercent}>
                        <p>{completedPercent()}%</p>
                        <div>
                            <div
                                style={{
                                    width: `${completedPercent()}%`,
                                    backgroundColor: Number(completedPercent()) === 100 ? "#00A91B" : "#1C6AB1",
                                }}
                            />
                        </div>
                    </div>
                )}
                {checklist.subtasks?.map((subtask, i) => (
                    <OneSubtask
                        subtask={subtask}
                        key={i}
                    />
                ))}
            </div>
            {createDisplay && (
                <CreateSubTask
                    subtaskState={postSubtaskState}
                    setSubtask={setPostSubtaskState}
                    subtaskChange={postSubtaskChange}
                    addFunc={postSubTask}
                    addToRequest={setSubtaskToOneRequest}
                    forWhat="Добавить"
                    checklistId={Number(checklist.id)}
                    setDisplay={setCreateDisplay}
                />
            )}
            <CustomButton
                type="button"
                onClick={() => setCreateDisplay(true)}
                text="Добавить подзадачу"
                width={207}
                variant="Primary"
            />
        </div>
    );
};
