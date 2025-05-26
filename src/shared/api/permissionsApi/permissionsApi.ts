import { create } from "zustand";
import { BASE_URL, authToken, id } from "@/shared/variables";

export interface IRoles {
    [key: string]: boolean | string;
}

interface IPermissionsApi {
    permissionsState: IRoles | null;
    formatedState: IRoles | null;
    getUsersPermissions: () => void;
    formateState: () => void;
}

export const permissionsApi = create<IPermissionsApi>((set, get) => ({
    permissionsState: null,
    formatedState: null,
    generalPermissionsState: null,
    getUsersPermissions: async () => {
        try {
            await fetch(`${BASE_URL}/users/userpermissions/${id}/`, authToken)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json(); // Получаем данные ответа в формате JSON
                })
                .then((data) => {
                    set({ permissionsState: data });
                });

        } catch (error) {
            console.log(error);
        }
    },
    formateState: () => {
        const permissionsState = get().permissionsState;
        const timeEntrDetail =
            permissionsState &&
            permissionsState &&
            Object.entries(permissionsState).slice(3, Object.entries(permissionsState).length);
        timeEntrDetail &&
            timeEntrDetail.map((el, index) => {
                if (el[1] === null) {
                    timeEntrDetail.forEach((e) => {
                        if(e[0] === el[0].slice(0,el[0].length - 6)){
                            timeEntrDetail[index][1] = e[1]
                            return
                        }
                    })
                }
            });
        console.log(timeEntrDetail)
        set({ formatedState: timeEntrDetail ? Object.fromEntries(timeEntrDetail) : null });
    },
}));
