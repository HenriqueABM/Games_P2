import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log('Chaves no AsyncStorage:', keys);
    
    const items = await AsyncStorage.multiGet(keys);
    console.log('Todos os itens no storage:');
    items.forEach(([key, value]) => {
      console.log(`Chave: ${key}`, 'Valor:', value);
    });
    alert('Storage verificado - veja os logs no console');
  } catch (error) {
    console.error('Erro ao verificar storage:', error);
    alert('Erro ao verificar storage: ' + error.message);
  }
};

export const clearGameData = async () => {
  try {
    await AsyncStorage.removeItem('@GameCollection:savedGames');
    console.log('Dados de jogos removidos!');
    alert('Dados de jogos foram removidos com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    alert('Erro ao limpar dados: ' + error.message);
  }
};