import { useEffect, useState } from 'react';
import Showcase from './showcase/showcase.component';
import { getNewDeck } from './api/services/deck/newDeck/newDeck.service';
import { drawCards } from './api/services/deck/drawCards/drawCards.service';
import { Card } from './api/services/deck/drawCards/drawCards.type';
import { mock1 } from './mock';

const MOCK_DATA = false;

const App = () => {
  const [cards, setCards] = useState<Card[]>([]);

  // -------------------------------------------------- //
  // These two functions below should be called from a redux slice with createAsyncThunk
  // but since this is a demo app and i don't have time to do it properly
  // i will call them directly from here
  // -------------------------------------------------- //
  const fetchNewDeck = async () => {
    try {
      return await getNewDeck();
    } catch (err) {
      console.error("Errore fetch deck:", err);
    }
  };

  const fetchDeckCards = async (deckId: string, count: number) => {
    try {
      return await drawCards({deckId, count});
    } catch (err) {
      console.error("Errore fetch cards:", err);
    }
  };
  // -------------------------------------------------- //

  useEffect(() => {
    if(MOCK_DATA) return;
    
    fetchNewDeck().then((deckResponse) => {
      if (deckResponse) {
        fetchDeckCards(deckResponse.deck_id, 52).then((cardsResponse) => {
          if(cardsResponse) {
            setCards(cardsResponse.cards);
          }
        });
      }
    });
  }, []);

  if(MOCK_DATA) {
    return (
      <Showcase data={mock1} searchKeys={['id', 'name']} displayKey={'name'}></Showcase>
    );
  }
  
  return (
    <Showcase data={cards} searchKeys={['code', 'value', 'suit']} displayKey={'value'}></Showcase>
  );
}

export default App;
