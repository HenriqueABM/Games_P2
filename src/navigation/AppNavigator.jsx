// src/navigation/AppNavigator.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GameFormScreen from '../screens/GameFormScreen';
import SavedGamesScreen from '../screens/SavedGamesScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import StatsScreen from '../screens/StatsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Início">
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Adicionar Jogo" component={GameFormScreen} />
      <Stack.Screen name="Meus Jogos" component={SavedGamesScreen} />
      <Stack.Screen name="Detalhes" component={GameDetailsScreen} />
      <Stack.Screen name="Estatísticas" component={StatsScreen} />
    </Stack.Navigator>
  );
}
