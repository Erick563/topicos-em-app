import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'https://simple-api-ngvw.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('@jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    imageId: string;
    authorId: number;
    author: {
        name: string;
        email: string;
    };
    createdAt: string;
}

export interface LoginResponse {
    jwt: string;
    user: User;
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export const authAPI = {
    register: async (name: string, email: string, password: string): Promise<User> => {
        const response = await api.post('/users', { name, email, password });
        return response.data;
    },

    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await api.post('/login', { email, password });
        return response.data;
    },
};

export const usersAPI = {
    getUsers: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> => {
        const response = await api.get('/users', { params: { page, limit } });
        return {
            data: response.data.users || [],
            page: response.data.page || page,
            limit: response.data.limit || limit,
            total: response.data.count || 0,
            totalPages: Math.ceil((response.data.count || 0) / limit),
        };
    },

    getUserById: async (id: string): Promise<User> => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },
};

export const postsAPI = {
    getPosts: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Post>> => {
        const response = await api.get('/posts', { params: { page, limit } });
        return {
            data: response.data.posts || [],
            page: response.data.page || page,
            limit: response.data.limit || limit,
            total: response.data.count || 0,
            totalPages: Math.ceil((response.data.count || 0) / limit),
        };
    },

    getMyPosts: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Post>> => {
        const response = await api.get('/my-posts', { params: { page, limit } });
        return {
            data: response.data.posts || [],
            page: response.data.page || page,
            limit: response.data.limit || limit,
            total: response.data.count || 0,
            totalPages: Math.ceil((response.data.count || 0) / limit),
        };
    },

    createPost: async (title: string, content: string, photo: any): Promise<Post> => {

        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('content', content.trim());

        const imageUri = photo.uri;
        const filename = imageUri.split('/').pop() || 'photo.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('photo', {
            uri: imageUri,
            name: filename,
            type,
        } as any);

        const response = await api.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deletePost: async (id: string): Promise<void> => {
        await api.delete(`/posts/${id}`);
    },
};

export const healthCheck = async (): Promise<boolean> => {
    try {
        const response = await api.get('/healthcheck');
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export default api;

