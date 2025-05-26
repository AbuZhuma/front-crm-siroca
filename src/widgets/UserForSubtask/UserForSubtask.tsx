import { Dispatch, FC, SetStateAction } from "react";
import styles from "./UserForSubtask.module.scss";
import { allUsersListApi } from "@/shared/api";
import { CustomButton } from "@/shared/ui";
import { CloseSquare } from "iconsax-react";
import { postSubtaskApi } from "@/features/CheckLists/api/postSubtaskApi";

interface IUserForSubtask {
    setUserModal: Dispatch<SetStateAction<boolean>>;
}

export const UserForSubtask: FC<IUserForSubtask> = (props) => {
    const { setUserModal } = props;
    const { addUserToPostSubtask } = postSubtaskApi();
    const { userInputState, userInputChange, userExists, setUserInputState, setUserExists, searchUsersNamesList } =
        allUsersListApi();
    const postTrim = () => {
        if (userExists === true) {
            addUserToPostSubtask(userInputState);
            setUserModal(false);
            setUserInputState("");
        } else {
            setUserExists(false);
        }
    };
    const closeFunc = () => {
        setUserInputState("");
        setUserModal(false);
    };
    return (
        <div className={styles.UserForSubtask}>
            <div className={styles.Main}>
                <div className={styles.Header}>
                    <p>Отметить пользователя</p>
                    <CloseSquare
                        cursor={"pointer"}
                        onClick={closeFunc}
                    />
                </div>
                <div className={styles.SelectUser}>
                    <div>
                        <input
                            className={
                                userInputState === "" || userExists
                                    ? styles.FirstInput
                                    : searchUsersNamesList.length === 0 && userExists === false
                                      ? styles.NotExist
                                      : styles.SecondInput
                            }
                            type="text"
                            placeholder="Введите имя пользователя..."
                            value={userInputState}
                            onChange={userInputChange}
                        />
                        {userInputState !== "" && (
                            <>
                                {searchUsersNamesList?.map((user, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setUserInputState(user)}
                                    >
                                        {user}
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                    {userInputState !== "" && userExists === false && searchUsersNamesList.length === 0 && (
                        <div className={styles.NotExistText}>
                            Данного менеджера не существует! Повторите попытку или создайте нового менеджера.
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.Buttons}>
                <CustomButton
                    variant="Without"
                    width={101}
                    text="Отмена"
                    onClick={closeFunc}
                />
                <CustomButton
                    variant="Primary"
                    text="Добавить"
                    width={121}
                    onClick={postTrim}
                />
            </div>
        </div>
    );
};
