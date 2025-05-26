import styles from "./Comments.module.scss";
import { FC, useEffect } from "react";
import { deleteCommentApi } from "./api/deleteCommentApi";
import { CustomMoreSquare } from "@/shared/ui";
import { ViewUserProfile } from "@/widgets";
import { role_type } from "@/shared/variables";
import { getOneRequestApi, permissionsApi, putCommentApi } from "@/shared/api";
import { IComment } from "@/shared/types";

export const Comments: FC = () => {
    const { oneRequest, deleteCommentFromComments } = getOneRequestApi();
    const deleteComment = deleteCommentApi();
    const deleteFunc = (props: number) => {
        deleteComment.deleteComment(props);
        deleteCommentFromComments(props);
    };
    const { permissionsState, formatedState, formateState } = permissionsApi();
    const { setPutCommentState, setChanged } = putCommentApi();
    const changePutState = (comment: IComment) => [setPutCommentState(comment), setChanged(false)];
    useEffect(() => {
        if (role_type !== "") {
            formateState();
        }
    }, [permissionsState]);

    return (
        <div className={styles.Comments}>
            {oneRequest.comments.map((comment, i) => (
                <div
                    className={styles.OneComment}
                    key={i}
                >
                    <div className={styles.Header}>
                        <ViewUserProfile userId={Number(comment.user_id)}>
                            <div className={styles.HeaderLeft}>
                                {!comment.user_image ? <p className={styles.defoltAva}>{comment.user?.slice(0, 1)}</p> : <img src={comment.user_image} />}
                                <p>{comment.user}</p>
                                <p className={styles.Date}>{comment.formatted_date_added}</p>
                            </div>
                        </ViewUserProfile>
                        {role_type !== "" &&
                            role_type === "manager" &&
                            formatedState ? (
                            formatedState.manager_can_delete_comments_extra ?
                                <CustomMoreSquare variant="Secondary">
                                    <button onClick={() => changePutState(comment)}>Редактировать</button>
                                    <button onClick={() => deleteFunc(Number(comment.id))}>Удалить</button>
                                </CustomMoreSquare>
                                :
                                <CustomMoreSquare variant="Secondary">
                                    <button onClick={() => changePutState(comment)}>Редактировать</button>
                                </CustomMoreSquare>
                        ) : null}
                        {role_type !== "" &&
                            role_type === "client" &&
                            formatedState &&
                            formatedState.client_can_edit_comments_extra ? (
                            <CustomMoreSquare variant="Secondary">
                                <button onClick={() => changePutState(comment)}>Редактировать</button>
                                <button onClick={() => deleteFunc(Number(comment.id))}>Удалить</button>
                            </CustomMoreSquare>
                        ) : null}
                        {role_type === "" ? (
                            <CustomMoreSquare variant="Secondary">
                                <button onClick={() => changePutState(comment)}>Редактировать</button>
                                <button onClick={() => deleteFunc(Number(comment.id))}>Удалить</button>
                            </CustomMoreSquare>
                        ) : null}
                    </div>
                    <div className={styles.CommentText}>{comment.text}</div>
                </div>
            ))}
        </div>
    );
};
