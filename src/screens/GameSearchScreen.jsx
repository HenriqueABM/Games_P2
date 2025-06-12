import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { searchGames } from '../services/rawgApi';

export default function GameSearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const games = await searchGames(query);
    setResults(games);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Buscar jogo"
        value={query}
        onChangeText={setQuery}
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSearch} style={styles.button}>Buscar</Button>
      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>Nota: {item.rating}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
});

