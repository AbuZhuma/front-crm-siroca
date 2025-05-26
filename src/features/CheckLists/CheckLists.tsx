import styles from "./CheckLists.module.scss";
import { FC } from "react";
import { OneCheckList } from "./ui/OneCheckList/OneCheckList";
import { getOneRequestApi } from "@/shared/api";

export const CheckLists: FC = () => {
    const { oneRequest } = getOneRequestApi();
    return (
        <div className={styles.CheckLists}>
            {oneRequest.checklists.map((checkList, i) => (
                <OneCheckList
                    checklist={checkList}
                    key={i}
                />
            ))}
        </div>
    );
};
