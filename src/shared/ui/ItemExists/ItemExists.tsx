import { FC } from "react";
import { IItemExists } from "./types/ItemExistsTypes";
import { TickCircle } from "iconsax-react";
import { CustomErrorCircle } from "../CustomErrorCircle/CustomErrorCircle";

export const ItemExists: FC<IItemExists> = (props) => {
    const { inputState, exists, text } = props;
    if (inputState === "") {
        return null;
    } else {
        if (exists) {
            return <TickCircle color="#00A91B" />;
        } else {
            return (
                <CustomErrorCircle
                    exist={exists}
                    text={text}
                />
            );
        }
    }
};
