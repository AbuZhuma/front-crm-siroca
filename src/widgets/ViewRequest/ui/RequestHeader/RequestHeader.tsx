import { Dispatch, FC, SetStateAction, useEffect } from "react";
import styles from "./RequestHeader.module.scss";
import { CloseSquare } from "iconsax-react";
import { deleteRequestApi } from "./api/deleteRequestApi";
import { filesApi } from "@/features/FilesList/api";
import { CustomMoreSquare } from "@/shared/ui";
import { getOneRequestApi, permissionsApi, successNotifApi } from "@/shared/api";
import { role_type } from "@/shared/variables";
import { loadingStatus } from "@/widgets/Loading/api/loadingStatus";

interface IRequestHeader {
    setView: Dispatch<SetStateAction<boolean>>;
    setEditOpen: Dispatch<SetStateAction<boolean>>;
}

export const RequestHeader: FC<IRequestHeader> = (props) => {
    const { setView, setEditOpen } = props;
    const fetchData = getOneRequestApi();
    const deleteRequest = deleteRequestApi();
    const { setImagesList, setOtherFilesList } = filesApi();
    const { setState } = successNotifApi();
    const {setStatus} = loadingStatus()
    const deleteFunc = () => {
        setStatus("norm")
        deleteRequest.deleteRequest(fetchData.oneRequest.id);
        setState(`Заявка ”${fetchData.oneRequest.task_number}” была удалена!`);
        setView(false);
    };
    const closeModal = () => {
        setView(false);
        setImagesList([]), setOtherFilesList([]);
    };
    const openEditModal = () => {
        setEditOpen(true);
    };
    // manager_can_delete_application_extra
    const { permissionsState, formateState, formatedState } = permissionsApi();
    useEffect(() => {
        if (role_type !== "") {
            formateState();
        }
    }, [permissionsState]);

    return (
        <div className={styles.RequestHeader}>
            <div
                id="zayvka"
                className={styles.Name}
            >
                Заявка - {fetchData.oneRequest.company} /&nbsp;
                <div className={styles.Number}>{fetchData.oneRequest.task_number}</div>
            </div>
            <div className={styles.TopRight}>
                {role_type === "client" && !formatedState?.client_can_edit_application_extra ?
                null
                : 
                <CustomMoreSquare variant="Primary">
                    {(role_type === "client" && formatedState?.client_can_edit_application_extra) ||
                    role_type === "" ||
                    role_type === "manager" ? (
                        <button onClick={openEditModal}>Редактировать</button>
                    ) : null}
                    {formatedState?.manager_can_delete_application_extra || role_type === "" ? (
                        <button onClick={deleteFunc}>Удалить</button>
                    ) : null}
                </CustomMoreSquare>
                }
                
                <CloseSquare
                    cursor={"pointer"}
                    size={34}
                    onClick={closeModal}
                />
            </div>
        </div>
    );
};
