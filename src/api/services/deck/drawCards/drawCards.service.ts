import apiClient from "../../../apiClient";
import { DrawCardsParams, DrawCardsResponse } from "./drawCards.type";

export const drawCards = async (params: DrawCardsParams): Promise<DrawCardsResponse> => {
    try {
        const response = await apiClient.get<DrawCardsResponse>(`/${params.deckId}/draw/?count=${params.count}`);
        return response.data;
    } 
    catch (error) {
        console.log(error);
        throw new Error('Error fetching draw cards');
    }
};