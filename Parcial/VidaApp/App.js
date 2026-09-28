import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import MemoryGameScreen from './src/screens/MemoryGameScreen';
import TicTacToeScreen from './src/screens/TicTacToeScreen';
import BMICalculatorScreen from './src/screens/BMICalculatorScreen';
import CurrencyCalculatorScreen from './src/screens/CurrencyCalculatorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Memory" component={MemoryGameScreen} options={{ headerShown: true, title: 'Juego de Memoria' }} />
        <Stack.Screen name="TicTacToe" component={TicTacToeScreen} options={{ headerShown: true, title: 'Juego de Gato' }} />
        <Stack.Screen name="BMI" component={BMICalculatorScreen} options={{ headerShown: true, title: 'Calculadora IMC' }} />
        <Stack.Screen name="Currency" component={CurrencyCalculatorScreen} options={{ headerShown: true, title: 'Calculadora Divisas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
