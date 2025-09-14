import axios from 'axios';

const baseURL = "https://deckofcardsapi.com/api/deck";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;