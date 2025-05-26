import { FC, useState } from "react";
import styles from "./Login.module.scss";
import { CustomInput } from "@/shared/ui";
import { Eye, EyeSlash } from "iconsax-react";
import { postUserApi } from "../../api/postUserApi";
import { useMediaQuery } from "@/shared/hooks";

export const Login: FC = () => {
    const [passwordState, setPasswordState] = useState<boolean>(false);
    const { postUserState, postUserChange, postUserAdded } = postUserApi();
    const w = useMediaQuery();
    return (
        <div className={styles.Login}>
            <div>
                <div className={styles.Text}>Логин</div>
                <CustomInput
                    value={postUserState.username}
                    trim={postUserAdded.username}
                    name="username"
                    width={277}
                    placeholder="Напишите..."
                    change={postUserChange}
                />
            </div>
            <div>
                <div className={styles.Text}>Пароль</div>
                <div className={styles.PasswordInput}>
                    <CustomInput
                        value={postUserState.password}
                        trim={postUserAdded.password}
                        name="password"
                        width={270}
                        type={passwordState ? "text" : "password"}
                        placeholder="Создайте пароль..."
                        change={postUserChange}
                    />
                    {passwordState ? (
                        <Eye
                            size={w > 1820 ? 24 : 18}
                            onClick={() => setPasswordState(false)}
                        />
                    ) : (
                        <EyeSlash
                            size={w > 1820 ? 24 : 18}
                            onClick={() => setPasswordState(true)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
