import axios from "axios";
import { create } from "zustand";
import { IUsersListUser } from "@/shared/types";
import { BASE_URL, authToken } from "@/shared/variables";

interface IUsersListApi {
    count: number;
    usersList: IUsersListUser[];
    addUserToUsersList: (user: IUsersListUser) => void;
    searchUsersList: (searchState: string) => void;
    getUsersList: (page: number) => void;
}

export const usersListApi = create<IUsersListApi>((set, get) => ({
    count: 1,
    usersList: [],
    addUserToUsersList: (user) => {
        const usersList = get().usersList;
        set({ usersList: [user, ...usersList] });
    },
    searchUsersList: async (searchState) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/profiles/?search=${searchState}`, authToken);
            set({ usersList: response.data.data });
        } catch (error) {
            console.log(error, "getUsersListError");
        }
    },
    getUsersList: async (page) => {
        const usersList = get().usersList;
        if (usersList.length === 0) {
            try {
                const response = await axios.get(`${BASE_URL}/users/profiles/?page=${page}`, authToken);
                set({ usersList: response.data.data, count: response.data.count });
            } catch (error) {
                console.log(error, "getUsersListError");
            }
        }
    },
}));
