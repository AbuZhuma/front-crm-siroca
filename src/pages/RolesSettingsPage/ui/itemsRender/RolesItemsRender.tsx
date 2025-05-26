import { useEffect, useState } from "react";
import ItemSettingRoles from "./ItemRoles";
import axios from "axios";
import { BASE_URL, authToken } from "../../../../shared/variables";
import { IUsersListUser } from "../../../../shared/types/userTypes/userTypes";

interface IRolesRender {
    list: string[];
    users: IUsersListUser[];
    getChanges: (e: IUsersListUser[]) => void;
    navType: string;
}
interface IGeneralRoles {
    [key: string]: boolean;
}
const filterObjectForKey = (includes: string, perms: [{ [key: string]: boolean }]) => {
    const newPerms: any = []
    perms.map((el) => {
        const entrd = Object.entries(el)
        const mid: any  = []
        entrd.map((el) => {
            if(el[0].includes(includes) || el[0] === "username"){
                mid.push(el)
            }
        })
        const finishGets = Object.fromEntries(mid)
        newPerms.push(finishGets)
    })
    return newPerms 
}

const RolesRender: React.FC<IRolesRender> = ({ list, users, getChanges, navType }) => {
    const [usersBoxes, setUsersBoxes] = useState<IUsersListUser[]>([]);
    const [getInBoxes, setGetInBoxes] = useState<IUsersListUser[]>([]);

    const [generalManager, setGeneralManager] = useState<IGeneralRoles>();
    const [generalClient, setGeneralClient] = useState<IGeneralRoles>();

    //push the select if this select not exist in state if is exist just change val
    const getBoxes = (e: IUsersListUser) => {
        let found = false;
        const updatedBoxes = usersBoxes.map((item) => {
            if (item.username === e.username) {
                found = true;
                return e;
            }
            return item;
        });
        if (!found) {
            updatedBoxes.push(e);
        }
        setUsersBoxes(updatedBoxes);
    };

    //just get all roles from server
    const getRoles = async () => {
        try {
            const responseC = await axios.get(`${BASE_URL}/users/clientpermissions/detail/`, authToken);
            const responseM = await axios.get(`${BASE_URL}/users/managerpermissions/detail/`, authToken);
            const filteredC = await filterObjectForKey("extra",responseC.data.data)
            const filteredM = await filterObjectForKey("extra",responseM.data.data)
            const update = [...filteredC, ...filteredM];
            setGetInBoxes(update);
        } catch (error) {
            console.log(error);
        }
    };
    const getGeneralRoles = async () => {
        try {
            const responseC = await axios.get(`${BASE_URL}/users/clientpermissions/general/`, authToken);
            const responseM = await axios.get(`${BASE_URL}/users/managerpermissions/general/`, authToken);
            setGeneralManager(responseM.data);
            setGeneralClient(responseC.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRoles();
        getGeneralRoles();
    }, []);

    useEffect(() => {
        getChanges(usersBoxes);
    }, [usersBoxes]);

    const filteredUsersClient = users.filter((el: IUsersListUser) => el.role_type === "client"); //filter to client
    const filteredUsersManager = users.filter((el: IUsersListUser) => el.role_type === "manager"); //filter to manager

    return (
        <div>
            {navType === "Клиент"
                ? filteredUsersClient.map((el: IUsersListUser, index: number) => (
                    <ItemSettingRoles
                        key={el.username}
                        user={el}
                        checkBoxList={list}
                        index={index}
                        getBoxes={(e: IUsersListUser) => getBoxes(e)}
                        inBoxList={getInBoxes ? getInBoxes : []}
                        genRoles={generalClient}
                    />
                ))
                : null}
            {navType === "Менеджер"
                ? filteredUsersManager.map((el: IUsersListUser, index: number) => (
                    <ItemSettingRoles
                        key={el.username}
                        user={el}
                        checkBoxList={list}
                        index={index}
                        getBoxes={(e: IUsersListUser) => getBoxes(e)}
                        inBoxList={getInBoxes ? getInBoxes : []}
                        genRoles={generalManager}
                    />
                ))
                : null}
        </div>
    );
};

export default RolesRender;
