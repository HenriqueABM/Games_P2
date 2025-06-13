import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, IconButton, Text, Button, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { checkStorage, clearGameData } from '../utils/storageDebug';

const STORAGE_KEY = '@GameCollection:savedGames';

export default function SavedGamesScreen({ navigation }) {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadSavedGames = async () => {
    try {
      setRefreshing(true);
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('Dados recuperados:', jsonValue);

      if (jsonValue !== null) {
        const parsed = JSON.parse(jsonValue);
       
        const sorted = parsed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setGames(sorted);
      } else {
        setGames([]);
      }
    } catch (error) {
      console.error('Falha ao carregar jogos:', error);
      alert('Erro ao carregar jogos: ' + error.message);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadSavedGames();
    }, [])
  );

  const handleDelete = async (id) => {
    try {
      const updated = games.filter(game => game.id !== id);
      setGames(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Erro ao deletar jogo:', error);
      alert('Erro ao deletar jogo: ' + error.message);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#7FDBFF" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botões de Debug */}
      <View style={styles.debugButtons}>
        <Button 
          mode="outlined" 
          onPress={checkStorage}
          style={styles.debugButton}
          icon="magnify"
        >
          Verificar Storage
        </Button>
        <Button 
          mode="outlined" 
          onPress={clearGameData}
          style={styles.debugButton}
          icon="delete"
        >
          Limpar Dados
        </Button>
      </View>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.gameTitle}>{item.name}</Title>
              <Paragraph>Gênero: {item.genre}</Paragraph>
              <Paragraph>Plataforma: {item.platform}</Paragraph>
              <Paragraph>Nota: {item.rating}/10</Paragraph>
              <Paragraph>Conclusão: {item.completion}%</Paragraph>
              {item.review && <Paragraph>Avaliação: {item.review}</Paragraph>}
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                onPress={() => navigation.navigate('Adicionar Jogo', { game: item })}
              />
              <IconButton
                icon="delete"
                onPress={() => handleDelete(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum jogo salvo. Adicione um novo jogo!</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadSavedGames}
            colors={['#7FDBFF']}
            tintColor="#7FDBFF"
          />
        }
        contentContainerStyle={games.length === 0 && styles.emptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001F3F',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#003366',
  },
  gameTitle: {
    color: '#7FDBFF',
  },
  emptyText: {
    color: '#7FDBFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  debugButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  debugButton: {
    marginHorizontal: 8,
    borderColor: '#7FDBFF',
  },
});
