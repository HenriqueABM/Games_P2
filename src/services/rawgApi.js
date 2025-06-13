const API_KEY = '308369a9629441e082a1705aa6a40c8e';
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
