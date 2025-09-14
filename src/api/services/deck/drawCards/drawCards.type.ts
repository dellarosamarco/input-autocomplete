export interface DrawCardsParams {
    deckId: string;
    count: number;
}

export interface DrawCardsResponse {
    success: boolean;
    deck_id: string;
    cards: Card[];
    remaining: number;
    error?: string;
}

export interface Card {
    code: string;
    image: string;
    images: {
        svg: string;
        png: string;
    };
    value: string;
    suit: string;
}