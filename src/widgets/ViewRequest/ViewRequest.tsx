import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styles from "./ViewRequest.module.scss";
import { AddComment, Collapses, RequestMenu, RequestHeader, EditComment } from "./ui";
import { Modal } from "antd";
import { ViewLogs } from "../ViewLogs/ViewLogs";
import { EditRequest } from "../EditRequest/EditRequest";
import { CreateChecklist } from "@/widgets";
import { allUsersListApi, permissionsApi, putCommentApi } from "@/shared/api";
import { useMediaQuery } from "@/shared/hooks";
import { role_type } from "@/shared/variables";

export const ViewRequest: FC<{ setView: Dispatch<SetStateAction<boolean>> }> = ({ setView }) => {
    const { formatedState } = permissionsApi();
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [checklistModal, setChecklistModal] = useState<boolean>(false);
    const [viewLogs, setViewLogs] = useState<boolean>(false);
    const { getAllUsersList } = allUsersListApi();
    const { changed } = putCommentApi();
    useEffect(() => {
        getAllUsersList();
    }, []);
    const screen = useMediaQuery();
    return (
        <div className={styles.ViewRequest}>
            <RequestMenu />
            <div
                className={styles.Main}
                id="ViewsContainer"
            >
                <RequestHeader
                    setView={setView}
                    setEditOpen={setEditOpen}
                />
                <Collapses
                    setViewLogs={setViewLogs}
                    setChecklistModal={setChecklistModal}
                />
            </div>
            {(formatedState?.client_can_edit_comments_extra ||
                role_type === "manager" ||
                role_type === "") && <AddComment />}
            {changed === false && <EditComment />}
            <Modal
                centered
                width={1066}
                open={viewLogs}
                onCancel={() => setViewLogs(false)}
            >
                <ViewLogs setViewLogs={setViewLogs} />
            </Modal>
            <Modal
                width={screen > 1820 ? 732 : 560}
                centered
                open={editOpen}
                onCancel={() => setEditOpen(false)}
            >
                <EditRequest
                    setModal={setEditOpen}
                    requestFrom="ViewRequest"
                />
            </Modal>
            <Modal
                width={screen >= 1820 ? 460 : 360}
                centered
                open={checklistModal}
                onCancel={() => setChecklistModal(false)}
            >
                <CreateChecklist setChecklistModal={setChecklistModal} />
            </Modal>
        </div>
    );
};
