import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@meus_jogos';

export async function saveGame(game) {
  const games = await getGames();
  const updated = [...games, game];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function getGames() {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function updateGame(updatedGame) {
  const games = await getGames();
  const updated = games.map(g => g.id === updatedGame.id ? updatedGame : g);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteGame(id) {
  const games = await getGames();
  const updated = games.filter(g => g.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
