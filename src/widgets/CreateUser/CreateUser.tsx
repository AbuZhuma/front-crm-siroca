import styles from "./CreateUser.module.scss";
import { FC, FormEvent } from "react";
import { CloseSquare } from "iconsax-react";
import { CustomButton } from "@/shared/ui";
import { ICreateUserModal } from "./types";
import { AddImage, CompanyDetails, Login, Names, RoleButton } from "./ui";
import { postUserApi } from "./api/postUserApi";
import { allCompaniesListApi, successNotifApi } from "@/shared/api";
import { loadingStatus } from "../Loading/api/loadingStatus";

export const CreateUser: FC<ICreateUserModal> = (props) => {
    const { setModal, company } = props;
    const { jobTitleExists, postUserState, setPostUserAdded, resetPostUserState, postUser, postUserAdded } =
        postUserApi();
    const { setCompanyInputState, companyExists } = allCompaniesListApi();
    const closeFunc = () => {
        setCompanyInputState("");
        resetPostUserState();
        setModal(false);
    };
    const { setState } = successNotifApi();
    const {setStatus} = loadingStatus()
    const postTrim = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("norm")
        setPostUserAdded();
        if (Object.values(postUserAdded).every((value) => value !== false) && jobTitleExists && companyExists) {
            setState(`Пользователь “${postUserState.first_name} ${postUserState.surname}” был создан!`);
            postUser();
            setModal(false);
        }
    };
    return (
        <form
            className={styles.CreateUser}
            onSubmit={postTrim}
        >
            <div className={styles.Top}>
                <div>Создать пользователя</div>
                <CloseSquare onClick={closeFunc} />
            </div>
            <div className={styles.Description}>
                <AddImage />
                <div className={styles.UserRole}>
                    <Names />
                    <RoleButton />
                </div>
            </div>
            <Login />
            <CompanyDetails company={company}/>
            <div className={styles.MustTrim}>
                {Object.values(postUserAdded).every((value) => value === true) ? null : (
                    <p>Все поля должны быть обязательно заполнены*</p>
                )}
            </div>
            <div className={styles.Buttons}>
                <CustomButton
                    type="button"
                    variant="Without"
                    width={160}
                    onClick={closeFunc}
                    text="Отменить"
                />
                <CustomButton
                    type="submit"
                    variant="Primary"
                    width={150}
                    text="Создать"
                />
            </div>
        </form>
    );
};
