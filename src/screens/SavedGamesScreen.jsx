import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedGamesScreen() {
  const [games, setGames] = useState([]);

  const loadGames = async () => {
    const stored = await AsyncStorage.getItem('@games');
    const parsed = stored ? JSON.parse(stored) : [];
    setGames(parsed);
  };

  const deleteGame = async (index) => {
    const updated = games.filter((_, i) => i !== index);
    setGames(updated);
    await AsyncStorage.setItem('@games', JSON.stringify(updated));
  };

  useEffect(() => {
    const unsubscribe = loadGames();
    return () => unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>Gênero: {item.genre}</Paragraph>
              <Paragraph>Plataforma: {item.platform}</Paragraph>
              <Paragraph>Lançamento: {item.release}</Paragraph>
              <Paragraph>Nota: {item.rating}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="delete" onPress={() => deleteGame(index)} />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 10,
  },
});