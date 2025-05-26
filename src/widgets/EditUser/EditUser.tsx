import styles from "./EditUser.module.scss";
import { FC, FormEvent, useEffect, useState } from "react";
import { CloseSquare } from "iconsax-react";
import { ButtonCreate, CustomButton, CustomInput, ItemExists } from "@/shared/ui";
import { IEditUserModal } from "./types/types";
import { EditImage, RoleButton, EditUserModals } from "./ui";
import { deleteUserApi } from "./api/deleteUserApi";
import { useDataStoreComponies } from "@/widgets/Companies/api/componiesApi";
import { IAddUser } from "@/shared/types";
import { oneUserApi, jobTitlesApi, successNotifApi } from "@/shared/api";
import { inputBorder } from "@/shared/helpers";
import { putUserApi } from "./api/putUserApi";
import { useMediaQuery } from "@/shared/hooks";
import { loadingStatus } from "../Loading/api/loadingStatus";

export const EditUser: FC<IEditUserModal> = (props) => {
    const deleting = deleteUserApi();
    const { oneUserState } = oneUserApi();
    const [passwordModal, setPasswordModal] = useState<boolean>(false);
    const [jobTitleModal, setJobTitleModal] = useState<boolean>(false);
    const { putUser, setPutUserState, putUserState, putUserChange } = putUserApi();
    const { setModal } = props;
    const { jobTitlesList, getJobTitlesList } = jobTitlesApi();
    const { data } = useDataStoreComponies();
    const [added, setAdded] = useState<IAddUser>({
        first_name: true,
        surname: true,
        role_type: true,
        image: true,
        username: true,
        job_title: true,
        main_company: true,
        password: true,
    });
    const hasJobTitle = jobTitlesList.some((jobTitle) => {
        return putUserState.job_title === jobTitle.title;
    });
    const hasCompany = data.some((company) => {
        return putUserState.main_company === company.name;
    });
    const { setState } = successNotifApi();
    const {setStatus} = loadingStatus()
    const postTrim = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("norm")
        const updatedAdded: IAddUser = { ...added };
        Object.keys(putUserState).forEach((key) => {
            updatedAdded[key] = putUserState[key] !== "";
        });
        setAdded(updatedAdded);
        if (Object.values(putUserState).every((value) => value !== "") && hasJobTitle && hasCompany) {
            putUser(oneUserState.id);
            setState("Изменение были сохранены!");
            setModal(false);
        } else {
            console.log("trimUserError");
        }
    };

    const deleteUser = () => {
        deleting.deleteUser(oneUserState.id);
        setState(`Пользователь “${oneUserState.first_name} ${oneUserState.surname}” был удален!`);
        setModal(false);
    };

    useEffect(() => {
        setPutUserState(oneUserState);
    }, [oneUserState]);
    useEffect(() => {
        getJobTitlesList();
    }, []);
    const w = useMediaQuery();
    return (
        <form
            className={styles.EditUser}
            onSubmit={postTrim}
        >
            <div className={styles.Top}>
                <div className={styles.TextTop}>Редактирование</div>
                <CloseSquare
                    cursor={"pointer"}
                    size={w > 1820 ? 34 : 26}
                    onClick={() => setModal(false)}
                />
            </div>
            <div className={styles.Description}>
                <EditImage
                    added={added.image}
                    onChange={putUserChange}
                />
                <div className={styles.UserRole}>
                    <div className={styles.Name}>
                        <div className={styles.Text}>Имя</div>
                        <CustomInput
                            title={putUserState.first_name}
                            trim={added.first_name}
                            name="first_name"
                            change={putUserChange}
                            value={putUserState.first_name}
                            width={340}
                            placeholder="Напишите..."
                        />
                        <div>
                            <div className={styles.Text}>Фамилия</div>
                            <CustomInput
                                title={putUserState.surname}
                                trim={added.surname}
                                change={putUserChange}
                                name="surname"
                                value={putUserState.surname}
                                width={340}
                                placeholder="Напишите..."
                            />
                        </div>
                    </div>
                    <RoleButton
                        trim={added.role_type}
                        role={putUserState.role_type}
                        onChange={putUserChange}
                    />
                </div>
            </div>
            <div className={styles.Login}>
                <div>
                    <div className={styles.Text}>Логин</div>
                    <CustomInput
                        title={putUserState.username}
                        trim={added.username}
                        change={putUserChange}
                        name="username"
                        value={putUserState.username}
                        width={272}
                        placeholder="@siroca.com"
                    />
                </div>
                <div>
                    <div className={styles.Text}>Пароль</div>
                    <CustomButton
                        text="Сбросить пароль"
                        width={272}
                        variant="ColorBlue"
                        type="button"
                        onClick={() => setPasswordModal(true)}
                    />
                </div>
            </div>
            <div className={styles.Login}>
                <div className={styles.Bottom}>
                    <div className={styles.Text}>Компания</div>
                    <div className={styles.Company}>
                        <div className={styles.Input}>
                            <input
                                title={putUserState.main_company}
                                value={putUserState.main_company}
                                name="main_company"
                                style={{
                                    border: inputBorder(putUserState.main_company, added.main_company, hasCompany),
                                }}
                                placeholder="Напишите..."
                                onChange={putUserChange}
                            />
                            <ItemExists
                                inputState={putUserState.main_company}
                                exists={hasCompany}
                                text="Данной компании не существует! Повторите попытку, или создайте новую должность."
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.Bottom}>
                    <div className={styles.Text}>Должность в компании</div>
                    <div className={styles.AddRole}>
                        <div className={styles.Input}>
                            <input
                                title={putUserState.job_title}
                                value={putUserState.job_title}
                                name="job_title"
                                style={{ border: inputBorder(putUserState.job_title, added.job_title, hasJobTitle) }}
                                placeholder="Напишите..."
                                onChange={putUserChange}
                            />
                            <ItemExists
                                inputState={putUserState.job_title}
                                exists={hasJobTitle}
                                text="Данной должности не существует! Повторите попытку, или создайте новую должность."
                            />
                        </div>
                        <ButtonCreate onClick={() => setJobTitleModal(true)} />
                    </div>
                </div>
            </div>
            <div className={styles.MustTrim}>
                {Object.values(added).every((value) => value === true) ? null : (
                    <p>Все поля должны быть обязательно заполнены*</p>
                )}
            </div>
            <div className={styles.Buttons}>
                <CustomButton
                    type="button"
                    width={150}
                    onClick={deleteUser}
                    variant="ColorRed"
                    text="Удалить"
                />
                <CustomButton
                    type="button"
                    variant="Without"
                    width={160}
                    text="Отменить"
                    onClick={() => setModal(false)}
                />
                <CustomButton
                    variant="Primary"
                    width={150}
                    text="Сохранить"
                    type="submit"
                />
            </div>
            <EditUserModals
                jobTitleModal={jobTitleModal}
                setJobTitleModal={setJobTitleModal}
                passwordModal={passwordModal}
                setPasswordModal={setPasswordModal}
            />
        </form>
    );
};
