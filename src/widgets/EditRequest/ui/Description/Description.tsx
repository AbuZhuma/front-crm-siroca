import { ChangeEvent, FC, useEffect } from "react";
import styles from "./Description.module.scss";
import { CustomTextArea } from "@/shared/ui";
import { FolderAdd } from "iconsax-react";
import { editRequestApi } from "../../api/editRequestApi";
import { createFileApi } from "@/features/FilesList/api";
import { FilesList } from "@/features";
import { role_type } from "@/shared/variables";
import { permissionsApi } from "@/shared/api";

export const Description: FC = () => {
    const { setFile, requestState, requestChange } = editRequestApi();
    const { oneFile, createFile } = createFileApi();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        createFile({
            file: e.target.files ? e.target.files[0] : "",
            application: requestState.id,
        });
    };
    useEffect(() => {
        if (oneFile.application !== 0) {
            setFile({
                id: oneFile.id,
                file: String(oneFile.file),
                application: oneFile.application !== undefined ? oneFile.application : 0,
                file_name: oneFile.file_name,
            });
        }
    }, [oneFile]);

    const { permissionsState, formateState, formatedState } = permissionsApi();
    useEffect(() => {
        if (role_type !== "") {
            formateState();
        }
    }, [permissionsState]);
    return (
        <div className={styles.Description}>
            <div className={styles.TextArea}>
                <CustomTextArea
                    value={requestState.description === null ? "" : requestState.description}
                    name="description"
                    paddingRight={35}
                    onChange={requestChange}
                    placeholder="Напишите..."
                />
                <label htmlFor="addEditFile">
                    {(role_type === "client" && formatedState?.client_can_add_files_extra) ||
                    role_type === "" ||
                    role_type === "manager" ? (
                        <FolderAdd
                            className={styles.Icon}
                            size={24}
                            color="#5C5C5C"
                        />
                    ) : null}
                    <input
                        type="file"
                        name="files"
                        id="addEditFile"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <FilesList />
        </div>
    );
};
