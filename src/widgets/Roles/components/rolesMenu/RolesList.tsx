import { ChangeEvent } from "react";
import styles from "./RolesList.module.scss";

interface IRolesList {
    list: string[];
    listType: string;
    handleChangeBox: (e: [string, React.ChangeEvent<HTMLInputElement>]) => void;
    box: { [key: string]: boolean } | null;
}

const RolesList: React.FC<IRolesList> = ({ list, listType, handleChangeBox, box }) => {
    //on click to checkbox
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChangeBox([listType, e]);
    };

    return (
        <div className={styles.MenuCont}>
            <div className={styles.HeaderPrg}>
                <p>{listType}</p>
            </div>

            {list.map((el, index) => {
                const check = box && Object.entries(box)[index] ? Object.entries(box)[index][1] : false;
                const name = box && Object.entries(box)[index] ? Object.entries(box)[index][0] : undefined;
                return (
                    <div
                        key={index}
                        className={styles.ListItem}
                    >
                        <input
                            type="checkbox"
                            onChange={onChange}
                            name={name}
                            checked={check}
                            id={`${index}`}
                        />
                        <p>{el}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default RolesList;
