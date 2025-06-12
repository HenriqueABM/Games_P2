import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedGamesScreen() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem('games');
      setGames(stored ? JSON.parse(stored) : []);
    };
    load();
  }, []);

  const remove = async (index) => {
    const updated = games.filter((_, i) => i !== index);
    await AsyncStorage.setItem('games', JSON.stringify(updated));
    setGames(updated);
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      {games.map((game, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <Card.Title title={game.title} subtitle={game.genre} />
          <Card.Content>
            <Text>Nota: {game.rating}</Text>
            <Text>Plataforma: {game.platform}</Text>
            <Text>Lançamento: {game.release}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => remove(index)}>Excluir</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}