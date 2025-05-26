import { FC, FormEvent, useEffect, useState } from "react";
import styles from "./EditRequest.module.scss";
import { CloseSquare } from "iconsax-react";
import { CustomButton } from "@/shared/ui";
import { editRequestApi } from "./api/editRequestApi";
import { Collapses } from "./ui";
import { IEditRequest } from "./types";
import { allCompaniesListApi, allUsersListApi, getOneRequestApi, postRequestApi, successNotifApi } from "@/shared/api";
import { Modal } from "antd";
import { CreateChecklist } from "../CreateChecklist/CreateChecklist";
import { useMediaQuery } from "@/shared/hooks";
import { commentsApi } from "./api/commentsApi";
import { loadingStatus } from "../Loading/api/loadingStatus";

export const EditRequest: FC<IEditRequest> = (props) => {
    const { setModal, requestFrom } = props;
    const { oneRequest, getOneRequest } = getOneRequestApi();
    const fetchEdit = editRequestApi();
    const { postRequestState, resetPostRequest } = postRequestApi();
    const { setCompanyInputState } = allCompaniesListApi();
    const [checklistModal, setChecklistModal] = useState<boolean>(false);
    const { managerInputState, companyUserInputState, managerExists, companyUserExists, getAllUsersList } =
        allUsersListApi();
    const { commentState, postComment } = commentsApi();
    const { setState } = successNotifApi();
    const closeFunc = () => {
        setModal(false);
        resetPostRequest();
        setCompanyInputState("");
    };
    useEffect(() => {
        if (postRequestState.id && postRequestState.id !== 0) {
            getOneRequest(postRequestState.id);
        }
    }, [postRequestState]);
    useEffect(() => {
        fetchEdit.setRequestData(oneRequest);
    }, [oneRequest.id]);
    useEffect(() => {
        getAllUsersList();
    }, []);
    const {setStatus} = loadingStatus()
    const postTrim = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("norm")
        if (
            (managerExists !== false && companyUserExists !== false) ||
            (managerInputState === "" && companyUserInputState === "")
        ) {
            fetchEdit.editRequest();
            setModal(false);
            if (commentState.text !== "") {
                postComment({
                    text: commentState.text,
                    application: oneRequest.id,
                });
            }
            resetPostRequest();
            setState("Изменение были сохранены!");
        }
    };
    const screen = useMediaQuery();
    return (
        <form onSubmit={postTrim}>
            <div className={styles.Container}>
                <div className={styles.Top}>
                    <div className={styles.TextTop}>
                        Заявка - {requestFrom === "CreateRequest" ? postRequestState.company : oneRequest.company} /
                        <span>
                            {requestFrom === "CreateRequest" ? postRequestState.task_number : oneRequest.task_number}
                        </span>
                    </div>
                    <CloseSquare
                        cursor={"pointer"}
                        onClick={() => setModal(false)}
                        size={34}
                    />
                </div>
                <Collapses setChecklistModal={setChecklistModal} />
                <div className={styles.Buttons}>
                    <CustomButton
                        type="button"
                        onClick={closeFunc}
                        variant="Secondary"
                        width={150}
                        text="Отменить"
                    />
                    <CustomButton
                        type="submit"
                        variant="Primary"
                        width={150}
                        text="Создать"
                    />
                </div>
            </div>
            <Modal
                width={screen >= 1820 ? 460 : 360}
                centered
                open={checklistModal}
                onCancel={() => setChecklistModal(false)}
            >
                <CreateChecklist setChecklistModal={setChecklistModal} />
            </Modal>
        </form>
    );
};
