import apiClient from "../../../apiClient";
import { NewDeckResponse } from "./newDeck.types";

export const getNewDeck = async (): Promise<NewDeckResponse> => {
    try {
        const response = await apiClient.get<NewDeckResponse>(`/new`);
        return response.data;
    } 
    catch (error) {
        console.log(error);
        throw new Error('Error fetching new deck');
    }
};