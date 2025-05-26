import { FC } from "react";
import axios from "axios";
import { getRequestApi } from "@/widgets/RequestList/api/getRequestApi";
import { BASE_URL, authToken } from "@/shared/variables";
import { SearchInput } from "@/shared/ui";

export const ReqSearch: FC = () => {
    const fetchRequest = getRequestApi();
    const search = async (searchState: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/applications/form/?search=${searchState}`, authToken);
            fetchRequest.setState(response.data.data.results);
        } catch (error) {
            console.log(error);
        }
    };
    const updateSearch = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/applications/form/`, authToken);
            fetchRequest.setState(response.data.data.results);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SearchInput
            onKeyDown={search}
            closeFunc={updateSearch}
        />
    );
};
