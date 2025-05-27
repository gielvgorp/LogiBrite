import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { colors } from '../../constants/theme';

export default function TabLayout() {
  return (
   <Tabs
      screenOptions={{
        headerShown: false,
        swipeEnabled: false, // 👈 Disable swipe between tabs
        tabBarStyle: {
          backgroundColor: colors.white,
          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 24 : 12,
          height: Platform.OS === 'ios' ? 88 : 70,
          borderTopColor: colors.divider,
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.secondary.main,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: 4,
        },
      }}
    >

      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"}  // ander icoon als geselecteerd
              size={size} 
              color={color} 
            />
          ),
        }}
      />

    <Tabs.Screen
      name="Routes"
      options={{
        title: 'Routes',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "map" : "map-outline"}
            size={size}
            color={color}
          />
        ),
      }}
    />

    <Tabs.Screen
      name="Profile"
      options={{
        title: 'Profiel',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "person" : "person-outline"}
            size={size}
            color={color}
          />
        ),
      }}
    />

    </Tabs>
  );
}