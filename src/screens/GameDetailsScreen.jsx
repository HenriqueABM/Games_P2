
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = '308369a9629441e082a1705aa6a40c8e';

const GameDetailsScreen = ({ route }) => {
  const { gameId } = route.params;
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
          params: {
            key: API_KEY,
          },
        });
        setGame(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do jogo:', error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (!game) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {game.background_image && (
        <Image source={{ uri: game.background_image }} style={styles.image} />
      )}
      <Text style={styles.title}>{game.name}</Text>
      <Text style={styles.description}>{game.description_raw}</Text>
      <Text style={styles.rating}>Nota: {game.rating} / 5</Text>
      <Text style={styles.release}>Lançamento: {game.released}</Text>
      <Text style={styles.genres}>
        Gêneros: {game.genres.map(g => g.name).join(', ')}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 200, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  description: { marginTop: 10, fontSize: 14, color: '#333' },
  rating: { marginTop: 10, fontSize: 16, fontWeight: '500' },
  release: { marginTop: 5, fontSize: 14 },
  genres: { marginTop: 5, fontSize: 14, fontStyle: 'italic' },
});

export default GameDetailsScreen;
