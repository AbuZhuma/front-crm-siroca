import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styles from "./UserSelect.module.scss";
import { ArrowDown2 } from "iconsax-react";
import { CustomErrorCircle, CustomInput } from "@/shared/ui";
import { allUsersListApi } from "@/shared/api";
import { editRequestApi } from "@/widgets/EditRequest/api/editRequestApi";
import { handleOutsideClick } from "@/shared/hooks";

export const UserSelect: FC = () => {
    const {
        companyUserExists,
        searchCompanyUsersNamesList,
        companyUserInputState,
        setCompanyUserInputState,
        companyUserInputChange,
        getCompanyUsers,
    } = allUsersListApi();
    const [opened, setOpened] = useState<boolean>(false);
    const { setRequestData, requestState } = editRequestApi();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRequestData({ ...requestState, main_client: e.target.value });
        companyUserInputChange(e);
    };
    const handleClick = (user: string) => {
        setRequestData({ ...requestState, main_client: user });
        setCompanyUserInputState(user);
    };
    useEffect(() => {
        getCompanyUsers(requestState.company);
    }, [requestState.company]);
    useEffect(() => {
        if (requestState.main_client) {
            setCompanyUserInputState(requestState.main_client);
        } else {
            setCompanyUserInputState("");
        }
    }, [requestState.main_client]);
    const selectedRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        handleOutsideClick(selectedRef, setOpened);
    }, []);
    return (
        <div
            className={styles.UserSelect}
            ref={selectedRef}
        >
            <div className={styles.Input}>
                <CustomInput
                    trim={companyUserExists === false ? false : true}
                    paddingRight={companyUserExists === false ? 80 : 45}
                    onClick={() => setOpened(true)}
                    value={companyUserInputState}
                    change={handleChange}
                    width={282}
                    placeholder="Заявитель..."
                />
                <div className={styles.NotExist}>
                    <CustomErrorCircle
                        exist={companyUserExists}
                        text="Данного пользователя не существует! Повторите попытку."
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
                    {searchCompanyUsersNamesList.map((user, i) => (
                        <p
                            key={i}
                            onClick={() => handleClick(user)}
                        >
                            {user}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};
