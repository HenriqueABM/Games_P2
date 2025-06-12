const API_KEY = 'b2cd8f0061e847498175cc5ab74c3580';
const BASE_URL = 'https://api.rawg.io/api';

export async function searchGames(query) {
  try {
    const response = await fetch(`${BASE_URL}/games?search=${query}&key=${API_KEY}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Erro na busca de jogos:', error);
    return [];
  }
}
