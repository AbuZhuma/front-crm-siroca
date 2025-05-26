import { GalleryAdd } from "iconsax-react";
import styles from "./EditImage.module.scss";
import { ChangeEvent, FC, useState } from "react";
import { IEditImage } from "../../types/types";
import { putUserApi } from "../../api/putUserApi";

export const EditImage: FC<IEditImage> = (props) => {
    const { added, onChange } = props;
    const { putUserState } = putUserApi();
    const [imageUrl, setImageUrl] = useState<string | undefined>(String(putUserState.image));
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
            onChange(e);
        }
    };
    return (
        <label
            htmlFor="putUserImage"
            className={styles.EditImage}
            style={{ border: added ? "none" : "1px solid red" }}
        >
            <GalleryAdd
                size={50}
                color="#252525"
            />
            <p>Добавьте фотографию пользователя</p>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="ChosenImage"
                />
            ) : (
                <img
                    src={String(putUserState.image)}
                    alt="UserImage"
                />
            )}
            <input
                type="file"
                name="image"
                accept="image/*"
                id="putUserImage"
                onChange={handleImageChange}
            />
        </label>
    );
};
