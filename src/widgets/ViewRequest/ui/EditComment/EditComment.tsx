import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { CustomInput } from "@/shared/ui";
import styles from "./EditComment.module.scss";
import { Send2 } from "iconsax-react";
import { role_type } from "@/shared/variables";
import { getOneRequestApi, permissionsApi, putCommentApi } from "@/shared/api";

export const EditComment: FC = () => {
    const { formatedState } = permissionsApi();
    const { putCommentState, putComment, setChanged } = putCommentApi();
    const [commentState, setCommentState] = useState<string>("");
    const { oneRequest, editCommentInOneRequest } = getOneRequestApi();
    const [newChange, setNewChange] = useState<boolean>(false);
    const changeComment = (e: ChangeEvent<HTMLInputElement>) => {
        setCommentState(e.target.value);
    };
    const postTrim = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (putCommentState.text.length > 0 && commentState !== "") {
            putComment({
                application: oneRequest.id,
                text: commentState,
            });
            setNewChange(true);
            setCommentState("");
        } else {
            console.log("trimCommentError");
        }
    };
    useEffect(() => {
        if (putCommentState.text !== "") {
            setCommentState(putCommentState.text);
            editCommentInOneRequest(putCommentState);
            if (newChange === true) {
                setChanged(true);
                setNewChange(false);
            }
        }
    }, [putCommentState]);
    const render = () => {
        if (formatedState && role_type === "client" && formatedState.client_can_edit_comments_extra) {
            return (
                <form
                    onSubmit={postTrim}
                    className={styles.EditComment}
                >
                    <CustomInput
                        name="text"
                        value={commentState}
                        width={580}
                        placeholder="Добавьте комментарий..."
                        change={changeComment}
                        paddingRight={45}
                    />
                    <button type="submit">
                        <Send2
                            color={commentState === "" ? "#5c5c5c" : "#1c6ab1"}
                            cursor={"pointer"}
                            size={24}
                        />
                    </button>
                </form>
            );
        } else if (role_type === "manager" || role_type === "") {
            return (
                <form
                    onSubmit={postTrim}
                    className={styles.EditComment}
                >
                    <CustomInput
                        name="text"
                        value={commentState}
                        width={580}
                        placeholder="Добавьте комментарий..."
                        change={changeComment}
                        paddingRight={45}
                    />
                    <button type="submit">
                        <Send2
                            color={commentState === "" ? "#5c5c5c" : "#1c6ab1"}
                            cursor={"pointer"}
                            size={24}
                        />
                    </button>
                </form>
            );
        } else {
            return null;
        }
    };

    return <>{render()}</>;
};
