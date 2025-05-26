import { CloseSquare, Edit } from "iconsax-react";
import styles from "./ProfileModal.module.scss";
import { FC, useEffect, useState } from "react";
import { Modal } from "antd";
import { ChangePassword } from "../ChangePassword/ChangePassword";
import { IProfileModal } from "./types";
import { CustomButton, CustomInput, ItemExists } from "@/shared/ui";
import { usePassword } from "../ChangePassword/api/ChangePassword";
import { profileApi, successNotifApi } from "@/shared/api";
import { IUserProfile } from "@/shared/api/profileApi/profileApi";
import { role_type } from "@/shared/variables";
import { inputBorder } from "@/shared/helpers";

export const ProfileModal: FC<IProfileModal> = (props) => {
    const { setModal } = props;
    const [changeModal, setChangeModal] = useState<boolean>(false);
    const { openModalScc } = usePassword();
    const {
        profileState,
        profileStateChange,
        setProfileState,
        putOneUser,
        getUserProfile,
        adminContactsState,
        putAdminContacts,
        adminContactsChange,
    } = profileApi();
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const [data, setData] = useState<IUserProfile>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (readOnly === false) {
            setData(profileState);
        } else if (readOnly === true) {
            data !== undefined && setProfileState(data);
            setData(undefined);
        }
    }, [readOnly]);
    const { setState } = successNotifApi();
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    return (
        <div className={styles.ProfileModal}>
            <div className={styles.Header}>
                <p>Профиль</p>
                <CloseSquare
                    cursor={"pointer"}
                    size={34}
                    onClick={() => setModal(false)}
                />
            </div>
            <div className={styles.Inner}>
                <div className={styles.Name}>
                    <p className={styles.Avatar}>Аватар:</p>
                    <p>Имя:</p>
                    <p>Фамилия:</p>
                    <p>Должность:</p>
                    <p>Компания:</p>

                    <p style={{ display: `${profileState.role_type === "client" ? "block" : "none"}` }}>
                        Ваш менеджер:
                    </p>
                    <p>Логин:</p>
                    <div
                        className={styles.adminContacts}
                        style={{ display: `${profileState.role_type === "" ? "block" : "none"}` }}
                    >
                        <p>Почта:</p>
                        <p>Телефон:</p>
                        <p>WhatsApp:</p>
                    </div>
                </div>
                <div className={styles.Data}>
                    {!String(profileState.image) || !profileState.image ?
                    <div className={styles.defoltAvatar}>
                        <p>{profileState.first_name?.slice(0,1) + profileState.surname?.slice(0,1)}</p>
                    </div>
                    :
                     <img
                        src={String(profileState.image)}
                        alt="images"
                        className={styles.Image}
                    />
                    }
                   
                    <input
                        style={{ display: `${readOnly ? "none" : "block"}` }}
                        className={styles.input}
                        type="file"
                        onChange={profileStateChange}
                        accept="image/*"
                        name="image"
                    />
                    <CustomInput
                        change={profileStateChange}
                        value={profileState.first_name || ""}
                        name="first_name"
                        type="text"
                        width={215}
                        height={32}
                        readOnly={readOnly}
                        color="black"
                        trim={error && profileState.first_name === "" ? false : true}
                    />
                    <CustomInput
                        change={profileStateChange}
                        value={profileState.surname || ""}
                        name="surname"
                        type="text"
                        width={215}
                        height={32}
                        readOnly={readOnly}
                        color="black"
                        trim={error && profileState.surname === "" ? false : true}
                    />
                    <CustomInput
                        value={profileState.role_type === "" ? "Admin" : profileState.job_title || ""}
                        name="job_title"
                        type="text"
                        width={215}
                        height={32}
                        readOnly={true}
                        color="black"
                    />
                    <CustomInput
                        value={profileState.main_company || ""}
                        name="main_company"
                        type="text"
                        width={215}
                        height={32}
                        readOnly={true}
                        color="black"
                    />

                    <div style={{ display: `${profileState.role_type === "client" ? "block" : "none"}` }}>
                        <CustomInput
                            value={profileState.main_manager || "-"}
                            type="text"
                            width={215}
                            height={32}
                            readOnly={true}
                            color="black"
                        />
                    </div>
                    <CustomInput
                        change={profileStateChange || ""}
                        value={profileState.username}
                        name="username"
                        type="text"
                        width={215}
                        height={32}
                        readOnly={readOnly}
                        color="black"
                        trim={error && profileState.username === "" ? false : true}
                    />
                    <div
                        className={styles.adminContacts}
                        style={{ display: `${profileState.role_type === "" ? "block" : "none"}` }}
                    >
                        <div className={styles.EmailInput}>
                            <input
                                value={adminContactsState.email || ""}
                                type="text"
                                style={{
                                    border: inputBorder(
                                        adminContactsState.email,
                                        true,
                                        isValidEmail(adminContactsState.email),
                                    ),
                                }}
                                name="email"
                                onChange={adminContactsChange}
                                readOnly={readOnly}
                            />
                            <div>
                                <ItemExists
                                    inputState={adminContactsState.email}
                                    exists={isValidEmail(adminContactsState.email)}
                                    text="Введите корректный адрес почты"
                                />
                            </div>
                        </div>
                        <div className={styles.InputNumber}>
                            <CustomInput
                                change={adminContactsChange}
                                value={adminContactsState.phone_number || ""}
                                name="phone_number"
                                type="number"
                                width={215}
                                height={32}
                                readOnly={readOnly}
                                trim={error && adminContactsState.phone_number === null ? false : true}
                            />
                            <div className={styles.NumberHide} />
                        </div>
                        <div className={styles.InputNumber}>
                            <CustomInput
                                change={adminContactsChange}
                                value={adminContactsState.whatsapp_number || ""}
                                name="whatsapp_number"
                                type="number"
                                width={215}
                                height={32}
                                readOnly={readOnly}
                                trim={error && adminContactsState.whatsapp_number === null ? false : true}
                            />
                            <div className={styles.NumberHide} />
                        </div>
                    </div>
                    <p
                        className={styles.MustTrim}
                        style={{ display: `${error ? "block" : "none"}` }}
                    >
                        Поля не должны быть пустыми!
                    </p>
                </div>
            </div>
            <button
                className={styles.ChangeButton}
                onClick={() => setChangeModal(true)}
            >
                Сменить пароль
            </button>
            <div className={styles.Buttons}>
                <button
                    className={styles.EditButton}
                    style={{
                        display: `${readOnly ? "block" : "none"}`,
                    }}
                    onClick={() => {
                        setReadOnly(!readOnly);
                    }}
                >
                    <Edit color="white" />
                </button>
                <div style={{ display: `${readOnly ? "none" : "block"}` }}>
                    <CustomButton
                        variant="Without"
                        width={120}
                        text="Отмена"
                        onClick={() => {
                            setReadOnly(true);
                        }}
                    />
                </div>
                <CustomButton
                    text="Сохранить"
                    width={119}
                    variant="Primary"
                    onClick={() => {
                        const { email, phone_number, whatsapp_number } = adminContactsState;
                        const { first_name, surname, username } = profileState;
                        const conditions = [email, phone_number, whatsapp_number, first_name, surname, username];
                        const conditions2 = [first_name, surname, username];

                        if (role_type === "") {
                            if (conditions.every(Boolean) && isValidEmail(adminContactsState.email)) {
                                setModal(false);
                                data !== undefined && putOneUser();
                                openModalScc();
                                setData(undefined);
                                profileState.id !== null && getUserProfile(profileState.id);
                                putAdminContacts(adminContactsState);
                                setReadOnly(true);
                                setError(false);
                            } else {
                                setError(true);
                            }
                        } else {
                            if (conditions2.every(Boolean)) {
                                setModal(false);
                                data !== undefined && putOneUser();
                                openModalScc();
                                setData(undefined);
                                profileState.id !== null && getUserProfile(profileState.id);
                                putAdminContacts(adminContactsState);
                                setReadOnly(true);
                                setError(false);
                                setState("Изменение были сохранены!");
                            } else {
                                setError(true);
                            }
                        }
                    }}
                />
            </div>
            <Modal
                width={265}
                centered
                open={changeModal}
                onCancel={() => setChangeModal(false)}
            >
                <ChangePassword
                    setModal={setChangeModal}
                    setModalProfile={setModal}
                />
            </Modal>
        </div>
    );
};
