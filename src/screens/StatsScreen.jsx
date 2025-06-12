import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StatsScreen() {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const stored = await AsyncStorage.getItem('@games');
      const games = stored ? JSON.parse(stored) : [];
      if (games.length > 0) {
        const total = games.reduce((acc, game) => acc + Number(game.rating), 0);
        setAverageRating((total / games.length).toFixed(2));
      }
    };
    fetchStats();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Média das notas dos jogos salvos: {averageRating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});