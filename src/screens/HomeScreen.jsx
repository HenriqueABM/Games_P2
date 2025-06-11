import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Buscar Jogos" onPress={() => navigation.navigate('Buscar Jogos')} />
      <Button title="Meus Jogos" onPress={() => navigation.navigate('Meus Jogos')} />
      <Button title="Adicionar Jogo" onPress={() => navigation.navigate('Adicionar Jogo')} />
      <Button title="Estatísticas" onPress={() => navigation.navigate('Estatísticas')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
  },
});
