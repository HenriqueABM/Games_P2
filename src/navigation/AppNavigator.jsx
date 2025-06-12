import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import GameFormScreen from '../screens/GameFormScreen';
import SavedGamesScreen from '../screens/SavedGamesScreen';
import StatsScreen from '../screens/StatsScreen';
import GameSearchScreen from '../screens/GameSearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#7FDBFF' },
        headerTintColor: 'white',
        tabBarActiveTintColor: '#7FDBFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#001F3F' },
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Buscar Jogos"
        component={GameSearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Adicionar Jogo"
        component={GameFormScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Meus Jogos"
        component={SavedGamesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="folder" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Estatísticas"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-pie" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={MainTabs} />
    </Stack.Navigator>
  );
}

