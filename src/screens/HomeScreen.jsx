import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Title>Bem-vindo ao Avaliador de Jogos</Title>
      <Button mode="contained" onPress={() => navigation.navigate('Buscar Jogos')}>Buscar Jogos</Button>
      <Button mode="contained" onPress={() => navigation.navigate('Meus Jogos')}>Meus Jogos</Button>
      <Button mode="contained" onPress={() => navigation.navigate('Adicionar Jogo')}>Adicionar Jogo</Button>
      <Button mode="contained" onPress={() => navigation.navigate('Estatísticas')}>Estatísticas</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
});