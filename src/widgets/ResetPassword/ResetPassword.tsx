import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import styles from "./ResetPassword.module.scss";
import { CloseSquare, Eye, EyeSlash } from "iconsax-react";
import { CustomButton, CustomInput } from "@/shared/ui";
import { resetPasswordApi } from "./api/resetPasswordApi";
import { oneUserApi } from "@/shared/api";

export const ResetPassword: FC<{ setModal: Dispatch<SetStateAction<boolean>> }> = (props) => {
    const { setModal } = props;
    const [first, setFirst] = useState<boolean>(false);
    const [second, setSecond] = useState<boolean>(false);
    const { oneUserState } = oneUserApi();
    const { resetPassword, passwordChange, passwordState } = resetPasswordApi();
    const postTrim = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(passwordState).every((value) => value !== "")) {
            setModal(false);
            resetPassword(oneUserState.id, passwordState);
        } else {
            console.log("postTrimError");
        }
    };
    return (
        <form
            className={styles.ResetPassword}
            onSubmit={postTrim}
        >
            <div className={styles.Item}>
                <p className={styles.Header}>Сменить пароль</p>
                <CloseSquare
                    size={34}
                    onClick={() => setModal(false)}
                    cursor={"pointer"}
                />
            </div>
            <div className={styles.Inputs}>
                <div className={styles.Input}>
                    <p className={styles.Text}>Новый пароль:</p>
                    <div>
                        <CustomInput
                            width={237}
                            placeholder="Введите пароль"
                            type={first ? "text" : "password"}
                            change={passwordChange}
                            name="new_password"
                        />
                        {first ? (
                            <Eye
                                cursor={"pointer"}
                                onClick={() => setFirst(false)}
                            />
                        ) : (
                            <EyeSlash
                                cursor={"pointer"}
                                onClick={() => setFirst(true)}
                            />
                        )}
                    </div>
                </div>
                <div className={styles.Input}>
                    <p className={styles.Text}>Повторите пароль:</p>
                    <div>
                        <CustomInput
                            width={237}
                            placeholder="Введите пароль"
                            type={second ? "text" : "password"}
                            change={passwordChange}
                            name="confirm_password"
                        />
                        {second ? (
                            <Eye
                                cursor={"pointer"}
                                onClick={() => setSecond(false)}
                            />
                        ) : (
                            <EyeSlash
                                cursor={"pointer"}
                                onClick={() => setSecond(true)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.Item}>
                <CustomButton
                    variant="Without"
                    width={208}
                    text="Отмена"
                    onClick={() => setModal(false)}
                    type="button"
                />
                <CustomButton
                    variant="Primary"
                    width={208}
                    text="Сохранить"
                    type="submit"
                />
            </div>
        </form>
    );
};
