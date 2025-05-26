import { FC } from "react";
import { CustomTextArea } from "@/shared/ui";
import { commentsApi } from "../../api/commentsApi";

export const Comments: FC = () => {
    const { commentChange } = commentsApi();
    return (
        <CustomTextArea
            name="text"
            placeholder="Напишите..."
            onChange={commentChange}
        />
    );
};
