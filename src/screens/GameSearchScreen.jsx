import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Appbar, Searchbar, Card, Text } from 'react-native-paper';
import { searchGames } from '../services/rawgApi';

export default function GameSearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    const games = await searchGames(query);
    setResults(games);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Buscar Jogos" />
      </Appbar.Header>

      <Searchbar
        placeholder="Digite o nome do jogo"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={{ margin: 16 }}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name} />
            {item.background_image && (
              <Image source={{ uri: item.background_image }} style={styles.image} />
            )}
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    height: 180,
    width: '100%',
  },
});
