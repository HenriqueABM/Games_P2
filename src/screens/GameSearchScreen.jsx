import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '308369a9629441e082a1705aa6a40c8e';

const GameSearchScreen = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  const searchGames = async () => {
    try {
      const response = await axios.get(`https://api.rawg.io/api/games`, {
        params: {
          key: API_KEY,
          search: search,
        },
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    }
  };

  const handleGamePress = (game) => {
    navigation.navigate('GameDetails', { gameId: game.id });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar jogo"
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Buscar" onPress={searchGames} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleGamePress(item)} style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 16 },
});

export default GameSearchScreen;