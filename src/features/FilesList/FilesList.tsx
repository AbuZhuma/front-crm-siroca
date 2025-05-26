import { FC, useEffect } from "react";
import styles from "./FilesList.module.scss";
import { filesApi, deleteFileApi } from "@/features/FilesList/api";
import { CloseSquare, DocumentText1, Trash } from "iconsax-react";
import { getOneRequestApi } from "@/shared/api";

export const FilesList: FC = () => {
    const { oneRequest, deleteFileFromFiles } = getOneRequestApi();
    const { imagesList, otherFilesList, findTypeOfFile, deleteFromImagesList, deleteFromOtherFilesList } = filesApi();
    const { deleteFile } = deleteFileApi();
    const deleteFileFromList = (id?: number) => {
        deleteFile(id);
        deleteFileFromFiles(id);
        deleteFromImagesList(id);
        deleteFromOtherFilesList(id);
    };
    const downloadFile = (url: string, fileName: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    useEffect(() => {
        if (oneRequest.files.length > 0) {
            findTypeOfFile(oneRequest.files);
        }
    }, [oneRequest.files]);
    return (
        <div
            className={styles.FilesList}
            style={{ display: oneRequest.files.length > 0 ? "flex" : "none" }}
        >
            <div className={styles.OtherFiles}>
                {otherFilesList !== undefined || null
                    ? otherFilesList.map((file, i) => (
                          <div
                              key={i}
                              className={styles.OtherFile}
                          >
                              <div onClick={() => downloadFile(file.file, String(file.file_name))}>
                                  <DocumentText1 />
                                  <p>{file.file_name}</p>
                              </div>
                              <Trash
                                  cursor={"pointer"}
                                  onClick={() => deleteFileFromList(file.id)}
                              />
                          </div>
                      ))
                    : null}
            </div>
            <div className={styles.Images}>
                {imagesList !== undefined || null
                    ? imagesList.map((image, i) => (
                          <div key={i}>
                              <img
                                  src={image.file}
                                  alt="image"
                              />
                              <div>
                                  <CloseSquare
                                      onClick={() => deleteFileFromList(image.id)}
                                      size={20}
                                      cursor={"pointer"}
                                  />
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};
