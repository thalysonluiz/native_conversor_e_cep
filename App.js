
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Keyboard } from 'react-native';

import { StatusBar, Text, Input, Box, Button, NativeBaseProvider, Center } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'

import { Converter } from "./src/pages/Converter";
import { Cep } from "./src/pages/Cep";

const Tab = createBottomTabNavigator();

const icons = {
  Converter: {
    name: 'logo-usd'
  },
  CEP: {
    name: 'mail-outline'
  }
}

export default function App() {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const { name } = icons[route.name];
              // You can return any component that you like here!
              return <Icon name={name} color={color} size={size} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Converter" component={Converter} />
          <Tab.Screen name="CEP" component={Cep} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
    </NativeBaseProvider>

  );
}
