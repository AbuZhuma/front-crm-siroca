import styles from "./AuthorizationPage.module.scss";
import { useState, FormEvent, FC } from "react";
import axios from "axios";
import { Eye, EyeSlash, InfoCircle } from "iconsax-react";
import { Modal } from "antd";
import { CallToAdmin, Loading } from "../../widgets";
import { useNavigate } from "react-router-dom";
import { BASE_URL, updateVariables, PATHS } from "../../shared/variables";
import { loadingStatus } from "@/widgets/Loading/api/loadingStatus";

export const AuthorizationPage: FC = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPasswod] = useState<string>("");
    const [err, setErr] = useState<boolean>(false);
    const [handleEye, setHandleEye] = useState<boolean>(false);
    const {setStatus} = loadingStatus()
    const openPass = () => {
        setHandleEye(!handleEye);
    };
    const navigate = useNavigate();
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        setStatus("global")
        e.preventDefault();
        const loginInfo = {
            username: login,
            password: password,
        };
        try {
            const response = await axios.post(`${BASE_URL}/users/login/`, loginInfo);
            if (response.status === 200) {
                const access = response.data.access;
                await localStorage.setItem("access", access);
                await localStorage.setItem("role_type", response.data.role_type);
                await localStorage.setItem("id", response.data.id);
                await updateVariables()
                navigate(PATHS.main);
            } else {
                setErr(true);
            }
        } catch (error) {
            setErr(true);
        }
    };
    const [modal, setModal] = useState<boolean>(false);
    return (
        <main className={styles.AuthorizationPage}>
            <Loading/>
            <form
                onSubmit={handleLogin}
                className={styles.Authorization}
            >
                <img
                    className={styles.Logo}
                    src="/Logo.svg"
                    alt="Logo"
                />
                <h1 className={styles.H1}>Вход в личный кабинет</h1>
                {err ? (
                    <div className={styles.Err}>
                        <InfoCircle
                            size={32}
                            color="red"
                        />
                        <p>Вы ввели неправильный логин или пароль. Проверьте свои данные еще раз.</p>
                    </div>
                ) : null}

                <div className={err ? styles.InputsBlockErr : styles.InputsBlock}>
                    <div className={err ? styles.ErrInputCont : styles.InputCont}>
                        <p>Логин</p>
                        <input
                            onChange={(e) => {
                                setLogin(e.target.value);
                            }}
                            onClick={() => setErr(false)}
                            placeholder="Введите логин"
                            type="text"
                        />
                    </div>
                    <div className={err ? styles.ErrInputCont : styles.InputCont}>
                        <p>Пароль</p>
                        <div>
                            <input
                                onChange={(e) => setPasswod(e.target.value)}
                                placeholder="Введите пароль"
                                type={handleEye ? "text" : "password"}
                            />
                            <div
                                className={err ? styles.EyeErr : styles.Eye}
                                onClick={openPass}
                            >
                                {handleEye ? (
                                    <Eye color={err ? "#E51616" : "#3B3B3B"} />
                                ) : (
                                    <EyeSlash color={err ? "#E51616" : "#3B3B3B"} />
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setModal(true)}
                        className={styles.Link}
                    >
                        Не могу войти
                    </button>
                </div>
                <button
                    className={err ? styles.ErrEnterButton : styles.EnterButton}
                    type="submit"
                >
                    Войти
                </button>
                <Modal
                    width={678}
                    centered
                    open={modal}
                    onCancel={() => setModal(false)}
                >
                    <CallToAdmin setModal={setModal} />
                </Modal>
            </form>
        </main>
    );
};
