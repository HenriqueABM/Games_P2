import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GameFormScreen from '../screens/GameFormScreen';
import SavedGamesScreen from '../screens/SavedGamesScreen';
import GameSearchScreen from '../screens/GameSearchScreen';
import StatsScreen from '../screens/StatsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Buscar Jogos" component={GameSearchScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Adicionar Jogo" component={GameFormScreen} />
      <Tab.Screen name="Meus Jogos" component={SavedGamesScreen} />
      <Tab.Screen name="Estatísticas" component={StatsScreen} />
    </Tab.Navigator>
  );
}
