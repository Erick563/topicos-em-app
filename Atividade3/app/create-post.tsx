import { postsAPI } from '@/services/api';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permissão Negada', 'É necessário permitir o acesso às fotos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.3,
      });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao selecionar imagem');
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permissão Negada', 'É necessário permitir o acesso à câmera');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.3,
      });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao tirar foto');
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Selecionar Foto',
      'Escolha uma opção',
      [
        {
          text: 'Câmera',
          onPress: takePhoto,
        },
        {
          text: 'Galeria',
          onPress: pickImage,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  const handleCreatePost = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Por favor, insira um título');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Erro', 'Por favor, insira o conteúdo');
      return;
    }

    if (!photo) {
      Alert.alert('Erro', 'Por favor, selecione uma foto');
      return;
    }

    setLoading(true);
    try {
      await postsAPI.createPost(title, content, photo);
      Alert.alert('Sucesso', 'Post criado com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || 'Erro ao criar post. Tente novamente.';
      
      Alert.alert('Erro ao Criar Post', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Novo Post</Text>
            <View style={{ width: 60 }} />
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o título do post"
                value={title}
                onChangeText={setTitle}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Conteúdo</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Digite o conteúdo do post"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Foto</Text>
              {photo ? (
                <View>
                  <Image source={{ uri: photo.uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.changePhotoButton}
                    onPress={showImageOptions}
                    disabled={loading}
                  >
                    <Text style={styles.changePhotoText}>Alterar Foto</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.selectPhotoButton}
                  onPress={showImageOptions}
                  disabled={loading}
                >
                  <Text style={styles.selectPhotoText}>+ Selecionar Foto</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleCreatePost}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Publicar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
  },
  selectPhotoButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectPhotoText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  changePhotoButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  changePhotoText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

