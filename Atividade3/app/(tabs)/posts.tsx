import { useAuth } from '@/contexts/AuthContext';
import { Post, postsAPI } from '@/services/api';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PostsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async (pageNum: number = 1) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await postsAPI.getPosts(pageNum, 10);
      
      const postsData = response.data || response || [];
      const totalPagesData = response.totalPages || 1;
      
      if (pageNum === 1) {
        setPosts(Array.isArray(postsData) ? postsData : []);
      } else {
        setPosts((prev) => [...prev, ...(Array.isArray(postsData) ? postsData : [])]);
      }
      
      setTotalPages(totalPagesData);
      setPage(pageNum);
    } catch (error: any) {
      Alert.alert('Erro', 'Erro ao carregar posts');
      if (pageNum === 1) {
        setPosts([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts(1);
  }, []);

  const loadMore = () => {
    if (!loadingMore && page < totalPages) {
      loadPosts(page + 1);
    }
  };

  const handleDeletePost = (postId: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este post?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await postsAPI.deletePost(postId);
              Alert.alert('Sucesso', 'Post excluído com sucesso');
              loadPosts(1);
            } catch (error: any) {
              Alert.alert('Erro', error.response?.data?.message || 'Erro ao excluir post');
            }
          },
        },
      ]
    );
  };

  const renderPost = ({ item }: { item: Post }) => {
    const isOwnPost = user?.id === item.authorId;

    return (
      <View style={styles.postCard}>
        {item.imageId && (
          <Image
            source={{ uri: item.imageId }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postText}>{item.content}</Text>
          <View style={styles.postFooter}>
            <View>
              <Text style={styles.postAuthor}>{item.author?.name || 'Anônimo'}</Text>
              <Text style={styles.postDate}>
                {new Date(item.createdAt).toLocaleDateString('pt-BR')}
              </Text>
            </View>
            {isOwnPost && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePost(item.id.toString())}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum post encontrado</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posts</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/create-post')}
        >
          <Text style={styles.createButtonText}>+ Criar Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item, index) => item?.id?.toString() || `post-${index}`}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  postContent: {
    padding: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

