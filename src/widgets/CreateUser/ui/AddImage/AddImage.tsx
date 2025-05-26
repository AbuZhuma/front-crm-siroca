import styles from "./AddImage.module.scss";
import { GalleryAdd } from "iconsax-react";
import { ChangeEvent, FC, useState } from "react";
import { postUserApi } from "../../api/postUserApi";
import { useMediaQuery } from "@/shared/hooks";

export const AddImage: FC = () => {
    const { postUserState, postUserChange, postUserAdded } = postUserApi();
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
            postUserChange(e);
        }
    };

    const w = useMediaQuery();
    return (
        <label
            htmlFor="postUserImage"
            className={styles.AddImage}
            style={{ border: postUserAdded.image ? "none" : "1px solid red" }}
        >
            <GalleryAdd
                size={w > 1820 ? 50 : 38}
                color="#252525"
            />
            <p>Добавьте фотографию пользователя</p>
            {postUserState.image !== "" && imageUrl && (
                <img
                    src={imageUrl}
                    alt="ChosenImage"
                />
            )}
            <input
                type="file"
                name="image"
                accept="image/*"
                id="postUserImage"
                onChange={handleImageChange}
            />
        </label>
    );
};
