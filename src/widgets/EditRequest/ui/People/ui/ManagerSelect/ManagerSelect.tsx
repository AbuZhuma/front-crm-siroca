import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styles from "./ManagerSelect.module.scss";
import { ArrowDown2 } from "iconsax-react";
import { CustomErrorCircle, CustomInput } from "@/shared/ui";
import { allUsersListApi } from "@/shared/api";
import { editRequestApi } from "@/widgets/EditRequest/api/editRequestApi";
import { handleOutsideClick } from "@/shared/hooks";

export const ManagerSelect: FC = () => {
    const { managerExists, setManagerInputState, searchManagersNamesList, managerInputChange, managerInputState } =
        allUsersListApi();
    const [opened, setOpened] = useState<boolean>(false);
    const { setRequestData, requestState } = editRequestApi();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRequestData({ ...requestState, main_manager: e.target.value });
        managerInputChange(e);
    };
    const handleClick = (manager: string) => {
        setRequestData({ ...requestState, main_manager: manager });
        setManagerInputState(manager);
    };
    useEffect(() => {
        if (requestState.main_manager) {
            setManagerInputState(requestState.main_manager);
        } else {
            setManagerInputState("");
        }
    }, [requestState.main_manager]);
    const selectedRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        handleOutsideClick(selectedRef, setOpened);
    }, []);
    return (
        <div
            className={styles.ManagerSelect}
            ref={selectedRef}
        >
            <div className={styles.Input}>
                <CustomInput
                    trim={managerExists === false ? false : true}
                    paddingRight={managerExists === false ? 80 : 45}
                    name="main_manager"
                    onClick={() => setOpened(true)}
                    value={managerInputState}
                    change={handleChange}
                    width={282}
                    placeholder="Менеджер..."
                />
                <div className={styles.NotExist}>
                    <CustomErrorCircle
                        exist={managerExists}
                        text="Данного менеджера не существует! Повторите попытку."
                    />
                </div>
                <ArrowDown2
                    className={styles.Arrow}
                    onClick={() => setOpened(!opened)}
                    color="#5C5C5C"
                    style={{ transform: opened ? "rotate(180deg)" : "rotate(0deg)" }}
                />
            </div>
            {opened && (
                <div className={styles.SelectList}>
                    {searchManagersNamesList.map((manager, i) => (
                        <p
                            key={i}
                            onClick={() => handleClick(manager)}
                        >
                            {manager}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};
