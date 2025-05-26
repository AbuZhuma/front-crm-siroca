import { FC } from "react";
import styles from "./CreateSubtaskInput.module.scss";
import { Mentions } from "antd";
import { allUsersListApi } from "@/shared/api";

interface ICreateSubTaskInput {
    value: string;
    onChange: (text: string) => void;
}

export const CreateSubtaskInput: FC<ICreateSubTaskInput> = (props) => {
    const { value, onChange } = props;
    const { allUsersNamesList } = allUsersListApi();
    const options = allUsersNamesList.map((user) => ({ value: user, label: user }));
    return (
        <Mentions
            name="text"
            value={value}
            onChange={onChange}
            options={options}
            className={styles.CreateSubtaskInput}
        />
    );
};
