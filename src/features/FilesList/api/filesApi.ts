import { create } from "zustand";

interface IFile {
    id?: number;
    file: string;
    application?: number;
    file_name?: string;
}

interface IFilesApi {
    imagesList: IFile[];
    setImagesList: (images: IFile[]) => void;
    deleteFromImagesList: (id?: number) => void;
    otherFilesList: IFile[];
    setOtherFilesList: (otherFiles: IFile[]) => void;
    deleteFromOtherFilesList: (id?: number) => void;
    findTypeOfFile: (files: IFile[]) => void;
}

export const filesApi = create<IFilesApi>((set) => ({
    imagesList: [],
    setImagesList: (images) => {
        set({ imagesList: images });
    },
    deleteFromImagesList: (id) => {
        set((prevState) => ({
            ...prevState.imagesList,
            imagesList: prevState.imagesList.filter((file) => file.id !== id),
        }));
    },
    otherFilesList: [],
    setOtherFilesList: (otherFiles) => {
        set({ otherFilesList: otherFiles });
    },
    deleteFromOtherFilesList: (id) => {
        set((prevState) => ({
            ...prevState.otherFilesList,
            otherFilesList: prevState.otherFilesList.filter((file) => file.id !== id),
        }));
    },
    findTypeOfFile: (files) => {
        files.forEach((fileObj) => {
            const isImage =
                fileObj.file.endsWith(".jpg") ||
                fileObj.file.endsWith(".jpeg") ||
                fileObj.file.endsWith(".png") ||
                fileObj.file.endsWith(".webp") ||
                fileObj.file.endsWith(".svg") ||
                fileObj.file.endsWith(".gif");

            const isDuplicateImage = filesApi.getState().imagesList.some((img) => img.file === fileObj.file);
            const isDuplicateOther = filesApi.getState().otherFilesList.some((other) => other.file === fileObj.file);

            if (isImage && !isDuplicateImage) {
                set((prevState) => ({ imagesList: [...prevState.imagesList, fileObj] }));
            } else if (!isImage && !isDuplicateOther) {
                set((prevState) => ({ otherFilesList: [...prevState.otherFilesList, fileObj] }));
            }
        });
    },
}));
