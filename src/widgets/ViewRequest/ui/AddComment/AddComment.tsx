import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { CustomInput } from "@/shared/ui";
import styles from "./AddComment.module.scss";
import { Send2 } from "iconsax-react";
import { role_type } from "@/shared/variables";
import { getOneRequestApi, permissionsApi, postCommentApi } from "@/shared/api";

export const AddComment: FC = () => {
    const { formatedState } = permissionsApi();
    const [commentState, setCommentState] = useState<string>("");
    const { oneRequest, setComment } = getOneRequestApi();
    const { oneComment, postComment } = postCommentApi();
    const changeComment = (e: ChangeEvent<HTMLInputElement>) => {
        setCommentState(e.target.value);
    };
    const postTrim = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (commentState !== "") {
            postComment({
                application: oneRequest.id,
                text: commentState,
            });
            setCommentState("");
        } else {
            console.log("trimCommentError");
        }
    };
    useEffect(() => {
        if (oneComment.application !== 0) {
            setComment(oneComment);
        }
    }, [oneComment]);
    const render = () => {
        if (formatedState && role_type === "client" && formatedState.client_can_edit_comments_extra) {
            return (
                <form
                    onSubmit={postTrim}
                    className={styles.AddComment}
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
                            size={24}
                        />
                    </button>
                </form>
            );
        } else if (role_type === "manager" || role_type === "") {
            return (
                <form
                    onSubmit={postTrim}
                    className={styles.AddComment}
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
