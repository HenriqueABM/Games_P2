import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StatsScreen() {
  const [averageRating, setAverageRating] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stored = await AsyncStorage.getItem('@GameCollection:savedGames');
        const games = stored ? JSON.parse(stored) : [];

        if (games.length > 0) {
          const totalRating = games.reduce((acc, game) => acc + Number(game.rating), 0);
          setAverageRating((totalRating / games.length).toFixed(2));
          setTotalGames(games.length);
        } else {
          setAverageRating(0);
          setTotalGames(0);
        }
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>📊 Média das notas dos jogos: {averageRating}</Text>
      <Text style={styles.text}>🎮 Total de jogos cadastrados: {totalGames}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001F3F',  // Fundo azul escuro pra combinar com as outras telas
  },
  text: {
    fontSize: 18,
    color: '#7FDBFF',  // Azul claro pra combinar com o resto do app
    marginBottom: 10,
  },
});
