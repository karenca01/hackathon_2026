import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

// Importaciones de tus pantallas principales
import HomeScreen from '../screens/main/HomeScreen';
import IdeasScreen from '../screens/main/IdeasScreen';
import AddScreen from '../screens/main/AddScreen';
import CalendarScreen from '../screens/main/CalendarScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

// Importaciones de las pantallas secundarias
import DetalleIdeaScreen from '../screens/main/DetalleIdeaScreen';
import CrearPostScreen from '../screens/main/CrearPostScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import InformacionRegistro from '../screens/auth/InformacionRegistro';

import VistaPreviaScreen from '../screens/main/VistaPreviaScreen';
import NotificationScreen from '../screens/main/NotificationScreen';
import CargandoScreen from '../screens/main/CargandoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Simple icon placeholder
function TabIcon({ label, focused }) {
  const icons = {
    Inicio: '🏠',
    Ideas: '💡',
    Agregar: '➕',
    Calendario: '📅',
    Perfil: '👤',
  };
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.iconText, focused && styles.iconFocused]}>
        {icons[label]}
      </Text>
    </View>
  );
}

// Stack específico para la pestaña de Inicio
function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="DetalleIdeaScreen" component={DetalleIdeaScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="InformacionRegistro" component={InformacionRegistro} />
      <Stack.Screen name="VistaPreviaScreen" component={VistaPreviaScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="CrearPostScreen" component={CrearPostScreen} />
      <Stack.Screen name="CargandoScreen" component={CargandoScreen} />
    </Stack.Navigator>
  );
}

// Stack específico para la pestaña de Ideas
function IdeasStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IdeasMain" component={IdeasScreen} />
      <Stack.Screen name="DetalleIdeaScreen" component={DetalleIdeaScreen} />
      <Stack.Screen name="CrearPostScreen" component={CrearPostScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="InformacionRegistro" component={InformacionRegistro} />
      <Stack.Screen name="VistaPreviaScreen" component={VistaPreviaScreen} />
    </Stack.Navigator>
  );
}

// NUEVO: Stack específico para la pestaña de Perfil
function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}



export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 10,
          height: 100,
          paddingBottom: 15,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused }) => (
          <TabIcon label={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStackNavigator} />
      <Tab.Screen name="Ideas" component={IdeasStackNavigator} />
      <Tab.Screen name="Agregar" component={AddScreen} />
      <Tab.Screen name="Calendario" component={CalendarScreen} />
      <Tab.Screen name="Perfil" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
    opacity: 0.5,
  },
  iconFocused: {
    opacity: 1,
  },
});