import { useEffect, useState } from "react";
import styles from "./ItemRoles.module.scss";
import { IUsersListUser } from "../../../../shared/types/userTypes/userTypes";

interface IItemSettingRoles {
    user: IUsersListUser;
    index: number;
    checkBoxList: string[];
    getBoxes: (e: IUsersListUser) => void;
    inBoxList: IUsersListUser[];
    genRoles: { [key: string]: boolean } | undefined;
}

const ItemSettingRoles: React.FC<IItemSettingRoles> = ({
    user,
    index,
    checkBoxList,
    getBoxes,
    inBoxList,
    genRoles,
}) => {
    const [boxes, setBoxes] = useState<{
        [key: string]: number | string | boolean | undefined | null;
    }>({
        client_can_edit_comments_extra: false,
        client_can_get_reports_extra: false,
        client_can_view_logs_extra: false,
        client_can_add_files_extra: false,
        client_can_add_checklist_extra: false,
    });
    const [genBoxes, setGenBoxes] = useState<{ [key: string]: boolean } | undefined>();
    useEffect(() => {
        setGenBoxes(genRoles);
    }, [genRoles]);

    //just change select val to an or neg value
    const getCheckBoxVal = (ev: React.ChangeEvent<HTMLInputElement>) => {
        //just fucked up this code place...
        const index = Number(ev.target.name);
        if (boxes && Object.entries(boxes)[index] && Object.entries(boxes)[index][1] == null) {
            const name = Number(ev.target.name);
            const time = Object.entries(boxes);
            time[name][1] = !time[name][1];
            time[name][1] = !time[name][1];
            const preventr = Object.fromEntries(time);
            setBoxes(preventr);
        } else {
            const name = Number(ev.target.name);
            const time = Object.entries(boxes);
            time[name][1] = !time[name][1];
            const preventr = Object.fromEntries(time);
            setBoxes(preventr);
        }
    };

    //just up all selects to top if boxes is changed
    useEffect(() => {
        const updatedUser: IUsersListUser = { ...user, ...boxes };
        getBoxes(updatedUser);
    }, [boxes]);

    //on change box list im seting boxes to formated thing
    useEffect(() => {
        const filteredInBoxList = inBoxList.filter((el: IUsersListUser) => el.username === user.username);
        const entrTheGets = filteredInBoxList.length > 0 ? filteredInBoxList[0] : false;
        const fmTheGets = entrTheGets ? Object.entries(entrTheGets).slice(1) : false;
        const finishGets = fmTheGets ? Object.fromEntries(fmTheGets) : boxes;
        delete finishGets.role_type;
        setBoxes(finishGets);
    }, [inBoxList]);
    return (
        <div className={styles.Item}>
            <div className={styles.num}>
                <p>{index + 1}</p>
            </div>
            <div className={styles.name}>
                <p>{user.full_name}</p>
            </div>

            {checkBoxList.map((el, index: number) => {
                if (boxes && Object.entries(boxes)[index] && Object.entries(boxes)[index][1] == null && el) {
                    const isChecked =
                        genBoxes && Object.entries(genBoxes)[index] ? Object.entries(genBoxes)[index][1] : false;

                    return (
                        <div
                            className={styles.el}
                            key={index}
                        >
                            <input
                                type="checkbox"
                                onChange={getCheckBoxVal}
                                name={`${index}`}
                                checked={isChecked}
                            />
                        </div>
                    );
                } else {
                    const isChecked = boxes && Object.entries(boxes)[index] ? Object.entries(boxes)[index][1] : false;

                    return (
                        <div
                            className={styles.el}
                            key={index}
                        >
                            <input
                                type="checkbox"
                                onChange={getCheckBoxVal}
                                name={`${index}`}
                                checked={typeof isChecked === "boolean" ? isChecked : false}
                            />
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default ItemSettingRoles;
