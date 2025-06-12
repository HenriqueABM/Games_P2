import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container} accessibilityLabel="Tela inicial com navegação para buscar, adicionar, visualizar e estatísticas de jogos">
      <Title style={styles.title}>Bem-vindo ao Avaliador de Jogos</Title>
      <Button icon="home" mode="contained" onPress={() => navigation.navigate('Buscar Jogos')} accessibilityLabel="Botão para buscar jogos">Buscar Jogos</Button>
      <Button icon="folder" mode="contained" onPress={() => navigation.navigate('Meus Jogos')} accessibilityLabel="Botão para ver jogos salvos">Meus Jogos</Button>
      <Button icon="gamepad-variant" mode="contained" onPress={() => navigation.navigate('Adicionar Jogo')} accessibilityLabel="Botão para adicionar novo jogo">Adicionar Jogo</Button>
      <Button icon="chart-pie" mode="contained" onPress={() => navigation.navigate('Estatísticas')} accessibilityLabel="Botão para ver estatísticas dos jogos">Estatísticas</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#001F3F', // Azul escuro
  },
  title: {
    color: '#7FDBFF', // Azul claro
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});