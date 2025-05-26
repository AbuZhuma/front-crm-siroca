import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./CreateRequest.module.scss";
import { CloseSquare } from "iconsax-react";
import { CustomButton, CustomInput, ItemExists } from "@/shared/ui";
import { Modal } from "antd";
import { EditRequest } from "@/widgets";
import { IAddedCreateRequest, ICreateRequestModal } from "./types/types";
import { allCompaniesListApi, permissionsApi, postRequestApi, profileApi, successNotifApi } from "@/shared/api";
import { useMediaQuery } from "@/shared/hooks";
import { inputBorder } from "@/shared/helpers";
import { role_type } from "@/shared/variables";
import { editRequestApi } from "../EditRequest/api/editRequestApi";

export const CreateRequest: FC<ICreateRequestModal> = (props) => {
    const { setModal } = props;
    const [editModal, setEditModal] = useState<boolean>(false);
    const { profileState } = profileApi();
    const { addCompanyToPostRequest, postRequestState, postRequest, resetPostRequest, postRequestChange } =
        postRequestApi();
    const {
        companyInputState,
        setCompanyInputState,
        searchCompaniesNamesList,
        companyInputChange,
        companyExists,
        getAllCompaniesList,
    } = allCompaniesListApi();
    const { requestState } = editRequestApi();
    const { setState } = successNotifApi();
    const { formatedState } = permissionsApi();
    const [added, setAdded] = useState<IAddedCreateRequest>({
        title: true,
        company: true,
    });
    const companyChange = (e: ChangeEvent<HTMLInputElement>) => {
        postRequestChange(e);
        companyInputChange(e);
    };
    const addCompany = (company: string) => {
        setCompanyInputState(company);
        addCompanyToPostRequest(company);
    };
    const cancelFunc = () => {
        setEditModal(false);
        resetPostRequest();
        setCompanyInputState("");
    };
    const closeFunc = () => {
        setModal(false);
        resetPostRequest();
        setCompanyInputState("");
    };
    useEffect(() => {
        getAllCompaniesList();
    }, []);
    const postTrim = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedAdded: IAddedCreateRequest = { ...added };
        Object.keys(postRequestState).forEach((key) => {
            updatedAdded[key] = postRequestState[key] !== "";
        });
        setAdded(updatedAdded);
        if (added.title && added.company && (companyExists || role_type === "client")) {
            postRequest();
            setModal(false);
            if (
                (formatedState && role_type === "client" && formatedState.client_can_edit_application_extra) ||
                role_type === "manager" ||
                role_type === ""
            ) {
                setEditModal(true);
            } else {
                return;
            }
        } else {
            console.log("postTrimError");
        }
    };
    const w = useMediaQuery();
    useEffect(() => {
        if (role_type === "client") {
            addCompanyToPostRequest(profileState.main_company);
        }
    }, []);
    useEffect(() => {
        if (requestState.task_number !== "") {
            setState(`Заявка "${requestState.task_number}" была создана!`);
        }
    }, [requestState.task_number]);
    return (
        <>
            <form
                className={styles.CreateRequest}
                onSubmit={postTrim}
            >
                <div className={styles.Top}>
                    <div className={styles.TextTop}>Создание заявки</div>
                    <CloseSquare
                        cursor={"pointer"}
                        onClick={() => setModal(false)}
                        size={w >= 1820 ? 34 : 24}
                    />
                </div>
                <div className={styles.Input}>
                    Название заявки:
                    <CustomInput
                        trim={added.title}
                        placeholder="Напишите..."
                        width={400}
                        name="title"
                        value={postRequestState.title}
                        change={postRequestChange}
                    />
                </div>
                <div className={styles.Input}>
                    Название компании:
                    {role_type === "client" ? (
                        <div className={styles.ClientCompany}>{profileState.main_company}</div>
                    ) : (
                        <div className={styles.AddCompany}>
                            <div className={styles.Company}>
                                <input
                                    type="text"
                                    name="company"
                                    value={companyInputState}
                                    style={{
                                        border: inputBorder(companyInputState, added.company, companyExists),
                                    }}
                                    placeholder="Напишите..."
                                    onChange={companyChange}
                                />
                                {
                                    <ItemExists
                                        inputState={companyInputState}
                                        text="Компании с таким названием не существует! Повторите попытку, или создайте новую компанию."
                                        exists={companyExists}
                                    />
                                }
                            </div>
                            <div className={styles.SearchList}>
                                {searchCompaniesNamesList.map((company, i) => (
                                    <p
                                        key={i}
                                        onClick={() => addCompany(company)}
                                    >
                                        {company}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {added.title && added.company ? null : (
                    <div className={styles.MustTrim}>
                        <p>Все поля должны быть обязательно заполнены*</p>
                    </div>
                )}
                <div className={styles.Buttons}>
                    <CustomButton
                        type="button"
                        onClick={closeFunc}
                        variant="Without"
                        width={144}
                        text="Отмена"
                    />
                    <CustomButton
                        type="submit"
                        variant="Primary"
                        width={144}
                        text="Создать"
                    />
                </div>
            </form>
            <Modal
                width={w > 1820 ? 732 : 560}
                centered
                open={editModal}
                onCancel={cancelFunc}
            >
                <EditRequest
                    setModal={setEditModal}
                    requestFrom="CreateRequest"
                />
            </Modal>
        </>
    );
};
