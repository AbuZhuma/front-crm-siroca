import styles from "./CreateSubTask.module.scss";
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { CustomButton, CustomDatePicker } from "@/shared/ui";
import { Calendar, ProfileTick } from "iconsax-react";
import { CreateSubtaskInput, CreateSubtaskModals } from "./ui";
import { postSubtaskApi } from "../../api/postSubtaskApi";
import { ISubtask } from "@/shared/types";
import { handleOutsideClick } from "@/shared/hooks";
import { putSubtaskApi } from "../../api/putSubtaskApi";

interface ICreateSubTask {
    subtaskState: ISubtask;
    setSubtask: (subtask: ISubtask) => void;
    subtaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
    addToRequest: (subtask: ISubtask) => void;
    forWhat: "Добавить" | "Сохранить";
    addFunc: () => void;
    setDisplay: Dispatch<SetStateAction<boolean>>;
    checklistId: number;
}

export const CreateSubTask: FC<ICreateSubTask> = (props) => {
    const { setDisplay, checklistId, subtaskState, forWhat, setSubtask, subtaskChange, addToRequest, addFunc } = props;
    const { postSubtaskState } = postSubtaskApi();
    const { putSubtaskState, putSubtaskChange, putSubtask } = putSubtaskApi();
    const [userModal, setUserModal] = useState<boolean>(false);
    const [managerModal, setManagerModal] = useState<boolean>(false);
    const [calendarOpened, setCalendarOpened] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        handleOutsideClick(selectRef, setCalendarOpened);
    }, []);
    const createFunc = () => {
        if (forWhat === "Сохранить") {
            putSubtask();
            addToRequest(subtaskState);
            setDisplay(false);
        } else {
            addFunc();
        }
    };
    const subtaskInputChange = (text: string) => {
        setSubtask({ ...subtaskState, text: text });
    };
    useEffect(() => {
        if (forWhat === "Добавить") {
            setSubtask({
                text: "",
                completed: false,
                checklist: checklistId,
            });
        } else if (forWhat === "Сохранить" && subtaskState.text !== "") {
            setSubtask(subtaskState);
        } else if (forWhat === "Сохранить" && subtaskState.text === "") {
            setDisplay(false);
        }
    }, [checklistId]);
    useEffect(() => {
        if (forWhat === "Добавить" && postSubtaskState.id && postSubtaskState.id > 0) {
            addToRequest(subtaskState);
            setSubtask({
                text: "",
                completed: false,
                checklist: checklistId,
            });
            setDisplay(false);
        }
    }, [postSubtaskState.id]);
    return (
        <div className={styles.CreateSubTask}>
            <CreateSubtaskInput
                onChange={subtaskInputChange}
                value={forWhat === "Добавить" ? subtaskState.text : putSubtaskState.text}
            />
            <div className={styles.Bottom}>
                <CustomButton
                    type="button"
                    variant="Primary"
                    width={130}
                    text={forWhat}
                    onClick={createFunc}
                />
                <CustomButton
                    type="button"
                    variant="Secondary"
                    width={94}
                    text="Отмена"
                    onClick={() => setDisplay(false)}
                />
                <button
                    type="button"
                    className={styles.AddManager}
                    onClick={() => setManagerModal(true)}
                >
                    <ProfileTick />
                    {subtaskState.manager === undefined || subtaskState.manager === null
                        ? "Назначить"
                        : String(subtaskState.manager).length > 8
                          ? `${subtaskState.manager?.slice(0, 8)}...`
                          : subtaskState.manager}
                </button>
                <button
                    type="button"
                    className={styles.AddUser}
                    onClick={() => setUserModal(true)}
                >
                    @
                </button>
                <div className={styles.Deadline}>
                    <input
                        type="date"
                        name="deadline"
                        className={styles.Date}
                        value={
                            forWhat === "Добавить"
                                ? subtaskState.deadline !== null
                                    ? subtaskState.deadline
                                    : ""
                                : putSubtaskState.deadline !== null
                                  ? putSubtaskState.deadline
                                  : ""
                        }
                        onChange={forWhat === "Добавить" ? subtaskChange : putSubtaskChange}
                    />
                    <Calendar
                        className={styles.CalendarIcon}
                        onClick={() => setCalendarOpened(true)}
                    />
                    {calendarOpened && (
                        <div
                            className={styles.DatePicker}
                            ref={selectRef}
                        >
                            <CustomDatePicker
                                name="deadline"
                                value={
                                    forWhat === "Добавить"
                                        ? subtaskState.deadline && subtaskState.deadline !== null
                                            ? subtaskState.deadline
                                            : ""
                                        : putSubtaskState.deadline && putSubtaskState.deadline !== null
                                          ? putSubtaskState.deadline
                                          : ""
                                }
                                onChange={
                                    forWhat === "Добавить"
                                        ? (e) => e && subtaskChange(e)
                                        : (e) => e && putSubtaskChange(e)
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
            <CreateSubtaskModals
                forWhat={forWhat}
                subtaskState={subtaskState}
                managerModal={managerModal}
                setManagerModal={setManagerModal}
                userModal={userModal}
                setUserModal={setUserModal}
            />
        </div>
    );
};
