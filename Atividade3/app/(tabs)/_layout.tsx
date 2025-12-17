import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          headerTitle: `Olá, ${user?.name || 'Usuário'}`,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
              <IconSymbol size={24} name="rectangle.portrait.and.arrow.right" color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: 'Posts',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Usuários',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
