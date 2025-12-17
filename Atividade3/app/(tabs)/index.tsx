import { useAuth } from '@/contexts/AuthContext';
import { postsAPI, usersAPI } from '@/services/api';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    myPosts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [postsResponse, usersResponse, myPostsResponse] = await Promise.all([
        postsAPI.getPosts(1, 1),
        usersAPI.getUsers(1, 1),
        postsAPI.getMyPosts(1, 1),
      ]);

      setStats({
        totalPosts: postsResponse?.total || 0,
        totalUsers: usersResponse?.total || 0,
        myPosts: myPostsResponse?.total || 0,
      });
    } catch (error) {
      setStats({
        totalPosts: 0,
        totalUsers: 0,
        myPosts: 0,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalPosts}</Text>
              <Text style={styles.statLabel}>Total de Posts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalUsers}</Text>
              <Text style={styles.statLabel}>Usuários</Text>
            </View>
            <View style={[styles.statCard, styles.statCardFull]}>
              <Text style={styles.statNumber}>{stats.myPosts}</Text>
              <Text style={styles.statLabel}>Meus Posts</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/create-post')}
          >
            <Text style={styles.actionButtonText}>+ Criar Novo Post</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => router.push('/(tabs)/posts')}
          >
            <Text style={styles.actionButtonTextSecondary}>Ver Todos os Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => router.push('/(tabs)/users')}
          >
            <Text style={styles.actionButtonTextSecondary}>Ver Usuários</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  welcomeSection: {
    backgroundColor: '#007AFF',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  emailText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    flex: 1,
    minWidth: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardFull: {
    minWidth: '100%',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionsSection: {
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonTextSecondary: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
