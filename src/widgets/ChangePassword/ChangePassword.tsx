import { CloseSquare, Eye, EyeSlash, InfoCircle } from "iconsax-react";
import styles from "./ChangePassword.module.scss";
import { CustomButton, CustomInput } from "@/shared/ui";
import { ChangeEvent, FC, useState } from "react";
import { IChangeModal } from "./types";
import axios from "axios";
import { BASE_URL, authToken, role_type } from "@/shared/variables";
import { usePassword } from "./api/ChangePassword";
import { Modal } from "antd";
import { CallToAdmin } from "../CallToAdmin/CallToAdmin";

export const ChangePassword: FC<IChangeModal> = (props) => {
    const [inputStates, setInputStates] = useState<{ [key: string]: { [key: string]: string | boolean } }>({
        prev: { value: "" },
        new1: { value: "" },
        new2: { value: "" },
    });
    const [err, setErr] = useState<boolean>(false);
    const [errors, setErrors] = useState<boolean>(false);
    const [adminContacts, setAdminContacts] = useState<boolean>(false);
    const [passwordOpen, setPasswordOpen] = useState<boolean>(false);
    const [passwordOpen2, setPasswordOpen2] = useState<boolean>(false);
    const [passwordOpen3, setPasswordOpen3] = useState<boolean>(false);

    const usePasswordScc = usePassword();
    const { setModal } = props;
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const timeState = inputStates;
        timeState[event.target.id].value = event.target.value;
        setInputStates(timeState);
        setErr(false);
        setErrors(false);
    };
    const onSend = async () => {
        try {
            if (inputStates.new1.value === inputStates.new2.value) {
                const data = {
                    old_password: inputStates.prev.value,
                    new_password1: inputStates.new1.value,
                    new_password2: inputStates.new2.value,
                };
                await axios.put(`${BASE_URL}/users/change_password/`, data, authToken);
                props.setModal(false);
                props.setModalProfile(false);
                usePasswordScc.openModalScc();

                setErr(false);
                setErrors(false);
            } else {
                setErr(true);
            }
        } catch (error) {
            console.log(error);
            setErrors(true);
        }
    };
    return (
        <div className={styles.ChangePassword}>
            <div className={styles.block}>
                <div className={styles.block1}>
                    <div className={styles.h1}>Сменить пароль</div>
                    <CloseSquare
                        className={styles.close}
                        cursor={"pointer"}
                        onClick={() => setModal(false)}
                        size={34}
                    />
                </div>
                <div
                    className={styles.error}
                    style={{ display: `${err || errors ? "block" : "none"}` }}
                >
                    <div className={styles.errorBlock}>
                        <InfoCircle color="rgba(229, 22, 22, 1)" />
                        <div>{err ? <p>Пароли не совпадают!</p> : <p>Неверный пароль! Повторите попытку.</p>}</div>
                    </div>
                </div>
                <div className={styles.block2}>
                    <div className={styles.labels}>
                        <label htmlFor="">Текущий пароль:</label>
                        <label htmlFor="">Новый пароль:</label>
                        <label htmlFor="">Повторите пароль:</label>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.inputs}>
                            <CustomInput
                                id="prev"
                                height={36}
                                width={237}
                                change={onChange}
                                type={passwordOpen ? "text" : "password"}
                                trim={err || errors ? false : undefined}
                                color={`${err || errors ? "rgba(229, 22, 22, 1)" : "rgba(113, 113, 113, 1)"}`}
                            />
                            <EyeSlash
                                className={styles.img}
                                style={{ display: `${passwordOpen ? "none" : "block"}` }}
                                onClick={() => setPasswordOpen(true)}
                                variant="Bold"
                                color={`${err || errors ? "rgba(229, 22, 22, 1)" : "rgba(113, 113, 113, 1)"}`}
                            />
                            <Eye
                                className={styles.img}
                                style={{ display: `${passwordOpen ? "block" : "none"}` }}
                                onClick={() => setPasswordOpen(false)}
                                variant="Bold"
                                color={`${err || errors ? "rgba(229, 22, 22, 1)" : "rgba(113, 113, 113, 1)"}`}
                            />
                        </div>
                        <div className={styles.inputs}>
                            <CustomInput
                                id="new1"
                                height={36}
                                width={237}
                                change={onChange}
                                type={passwordOpen2 ? "text" : "password"}
                                trim={err || errors ? false : undefined}
                                color={`${err || errors ? "rgba(229, 22, 22, 1)" : "rgba(113, 113, 113, 1)"}`}
                            />
                            <EyeSlash
                                className={styles.img}
                                style={{ display: `${passwordOpen2 ? "none" : "block"}` }}
                                onClick={() => setPasswordOpen2(true)}
                                variant="Bold"
                                color={`${err || errors ? "rgba(229, 22, 22, 1)" : "rgba(113, 113, 113, 1)"}`}
                            />
                            <Eye
                                className={styles.img}
                                style={{ display: `${passwordOpen2 ? "block" : "none"}` }}
                                onClick={() => setPasswordOpen2(false)}
                                variant="Bold"
                                color={`${err || errors ? "rgba(229, 22, 22, 1)" : "rgba(113, 113, 113, 1)"}`}
                            />
                        </div>
                        <div className={styles.inputs}>
                            <CustomInput
                                id="new2"
                                height={36}
                                width={237}
                                change={onChange}
                                type={passwordOpen3 ? "text" : "password"}
                                trim={err || errors ? false : undefined}
                                color={`${err || errors ? "rgba(229, 22, 22, 1)" : "rgba(113, 113, 113, 1)"}`}
                            />
                            <EyeSlash
                                className={styles.img}
                                style={{ display: `${passwordOpen3 ? "none" : "block"}` }}
                                onClick={() => setPasswordOpen3(true)}
                                variant="Bold"
                                color={`${err || errors ? "rgba(229, 22, 22, 1)" : "rgba(113, 113, 113, 1)"}`}
                            />
                            <Eye
                                className={styles.img}
                                style={{ display: `${passwordOpen3 ? "block" : "none"}` }}
                                onClick={() => setPasswordOpen3(false)}
                                variant="Bold"
                                color={`${err || errors ? "rgba(229, 22, 22, 1)" : "rgba(113, 113, 113, 1)"}`}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div style={{ display: `${role_type === "" ? "none" : "block"}` }}>
                        <CustomButton
                            width={208}
                            text="Забыли пароль"
                            variant="Without"
                            onClick={() => setAdminContacts(true)}
                        />
                    </div>

                    <CustomButton
                        width={208}
                        text="Сменить пароль"
                        variant="Primary"
                        onClick={onSend}
                    />
                </div>
            </div>
            <Modal
                onCancel={() => setAdminContacts(false)}
                open={adminContacts}
                width={678}
                centered
            >
                <CallToAdmin setModal={setAdminContacts} />
            </Modal>
        </div>
    );
};
